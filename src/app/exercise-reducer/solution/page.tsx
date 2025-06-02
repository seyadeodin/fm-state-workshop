'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { createContext, use, useReducer, ReactNode, useState } from 'react';
import { FlightOption, getFlightOptions } from '@/app/exerciseUtils';

type FormData = {
  destination: string;
  departure: string;
  arrival: string;
  passengers: number;
  isOneWay: boolean;
};

type State =
  | {
      status: 'idle';
      formData: FormData;
    }
  | {
      status: 'searching';
      formData: FormData;
    }
  | {
      status: 'error';
      formData: FormData;
      error: string;
    }
  | {
      status: 'results';
      formData: FormData;
      flightOptions: FlightOption[];
    };

type Action =
  | { type: 'SET_FORM_DATA'; payload: Partial<FormData> }
  | { type: 'START_SEARCH' }
  | { type: 'SEARCH_SUCCESS'; payload: FlightOption[] }
  | { type: 'SEARCH_ERROR'; payload: string }
  | { type: 'BACK_TO_SEARCH' };

const initialState: State = {
  status: 'idle',
  formData: {
    destination: '',
    departure: '',
    arrival: '',
    passengers: 1,
    isOneWay: false,
  },
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    case 'START_SEARCH':
      return {
        status: 'searching',
        formData: state.formData,
      };
    case 'SEARCH_SUCCESS':
      return {
        status: 'results',
        formData: state.formData,
        flightOptions: action.payload,
      };
    case 'SEARCH_ERROR':
      return {
        status: 'error',
        formData: state.formData,
        error: action.payload,
      };
    case 'BACK_TO_SEARCH':
      return {
        status: 'idle',
        formData: state.formData,
      };
    default:
      return state;
  }
}

const BookingContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | null>(null);

function BookingProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      {children}
    </BookingContext.Provider>
  );
}

function useBooking() {
  const context = use(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}

interface SearchResultsProps {
  onBack: () => void;
}

function SearchResults({ onBack }: SearchResultsProps) {
  const { state } = useBooking();
  const [selectedFlight, setSelectedFlight] = useState<FlightOption | null>(
    null
  );

  if (state.status !== 'results') {
    return null;
  }

  const totalPrice = selectedFlight
    ? selectedFlight.price * state.formData.passengers
    : 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <Button variant="outline" onClick={onBack}>
          Back to Search
        </Button>
      </div>

      <div className="space-y-4">
        {state.flightOptions.map((flight) => (
          <div
            key={flight.id}
            className={`p-4 border rounded hover:shadow-md ${
              selectedFlight?.id === flight.id
                ? 'border-blue-500 bg-blue-50'
                : ''
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{flight.airline}</h3>
                <p className="text-gray-600">Duration: {flight.duration}</p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${flight.price}</p>
                <Button
                  className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  onClick={() => setSelectedFlight(flight)}
                >
                  {selectedFlight?.id === flight.id ? 'Selected' : 'Select'}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedFlight && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
          <div className="space-y-2">
            <p>Flight: {selectedFlight.airline}</p>
            <p>Duration: {selectedFlight.duration}</p>
            <p>Passengers: {state.formData.passengers}</p>
            <p className="text-xl font-bold mt-4">Total: ${totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingForm() {
  const { state, dispatch } = useBooking();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'START_SEARCH' });

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const mockFlights = await getFlightOptions(state.formData);
      dispatch({ type: 'SEARCH_SUCCESS', payload: mockFlights });
    } catch (error) {
      dispatch({
        type: 'SEARCH_ERROR',
        payload:
          error instanceof Error
            ? error.message
            : 'An error occurred while searching for flights',
      });
    }
  };

  if (state.status === 'results') {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="one-way"
          checked={state.formData.isOneWay}
          onCheckedChange={(checked) =>
            dispatch({ type: 'SET_FORM_DATA', payload: { isOneWay: checked } })
          }
        />
        <Label htmlFor="one-way">One-way flight</Label>
      </div>

      <div>
        <Label htmlFor="destination" className="block mb-1">
          Destination
        </Label>
        <Input
          type="text"
          id="destination"
          value={state.formData.destination}
          onChange={(e) =>
            dispatch({
              type: 'SET_FORM_DATA',
              payload: { destination: e.target.value },
            })
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="departure" className="block mb-1">
          Departure Date
        </Label>
        <Input
          type="date"
          id="departure"
          value={state.formData.departure}
          onChange={(e) =>
            dispatch({
              type: 'SET_FORM_DATA',
              payload: { departure: e.target.value },
            })
          }
          required
        />
      </div>

      {!state.formData.isOneWay && (
        <div>
          <Label htmlFor="arrival" className="block mb-1">
            Return Date
          </Label>
          <Input
            type="date"
            id="arrival"
            value={state.formData.arrival}
            onChange={(e) =>
              dispatch({
                type: 'SET_FORM_DATA',
                payload: { arrival: e.target.value },
              })
            }
            required
          />
        </div>
      )}

      <div>
        <Label htmlFor="passengers" className="block mb-1">
          Number of Passengers
        </Label>
        <Input
          type="number"
          id="passengers"
          value={state.formData.passengers}
          onChange={(e) =>
            dispatch({
              type: 'SET_FORM_DATA',
              payload: { passengers: parseInt(e.target.value) },
            })
          }
          min="1"
          max="9"
          required
        />
      </div>

      <Button
        type="submit"
        disabled={state.status === 'searching'}
        className="w-full"
      >
        {state.status === 'searching' ? 'Searching...' : 'Search Flights'}
      </Button>
    </form>
  );
}

export default function Page() {
  return (
    <BookingProvider>
      <div className="w-full max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Flight Booking</h1>
        <BookingContent />
      </div>
    </BookingProvider>
  );
}

function BookingContent() {
  const { state, dispatch } = useBooking();

  return (
    <>
      {state.status === 'error' && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {state.error}
        </div>
      )}

      {state.status === 'results' ? (
        <SearchResults onBack={() => dispatch({ type: 'BACK_TO_SEARCH' })} />
      ) : (
        <BookingForm />
      )}
    </>
  );
}
