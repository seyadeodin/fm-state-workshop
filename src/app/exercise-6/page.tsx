'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { createContext, useContext, useReducer } from 'react';

// Types
enum Step {
  FLIGHT_SEARCH = 'FLIGHT_SEARCH',
  FLIGHT_RESULTS = 'FLIGHT_RESULTS',
  HOTEL_SEARCH = 'HOTEL_SEARCH',
  HOTEL_RESULTS = 'HOTEL_RESULTS',
  REVIEW = 'REVIEW',
  CONFIRMATION = 'CONFIRMATION',
}

interface FlightOption {
  id: string;
  airline: string;
  price: number;
  duration: string;
}

interface HotelOption {
  id: string;
  name: string;
  price: number;
  rating: number;
  amenities: string[];
}

interface BookingState {
  currentStep: Step;
  flightSearch: {
    destination: string;
    departure: string;
    arrival: string;
    passengers: number;
    isOneWay: boolean;
  };
  selectedFlight: FlightOption | null;
  hotelSearch: {
    checkIn: string;
    checkOut: string;
    guests: number;
    roomType: string;
  };
  selectedHotel: HotelOption | null;
}

type BookingAction =
  | { type: 'SET_STEP'; payload: Step }
  | {
      type: 'SET_FLIGHT_SEARCH';
      payload: Partial<BookingState['flightSearch']>;
    }
  | { type: 'SET_SELECTED_FLIGHT'; payload: FlightOption | null }
  | { type: 'SET_HOTEL_SEARCH'; payload: Partial<BookingState['hotelSearch']> }
  | { type: 'SET_SELECTED_HOTEL'; payload: HotelOption | null }
  | { type: 'RESET_HOTEL' };

// Context
const BookingContext = createContext<{
  state: BookingState;
  dispatch: React.Dispatch<BookingAction>;
} | null>(null);

// Reducer
function bookingReducer(
  state: BookingState,
  action: BookingAction
): BookingState {
  switch (action.type) {
    case 'SET_STEP':
      return { ...state, currentStep: action.payload };
    case 'SET_FLIGHT_SEARCH':
      return {
        ...state,
        flightSearch: { ...state.flightSearch, ...action.payload },
      };
    case 'SET_SELECTED_FLIGHT':
      return { ...state, selectedFlight: action.payload };
    case 'SET_HOTEL_SEARCH':
      return {
        ...state,
        hotelSearch: { ...state.hotelSearch, ...action.payload },
      };
    case 'SET_SELECTED_HOTEL':
      return { ...state, selectedHotel: action.payload };
    case 'RESET_HOTEL':
      return {
        ...state,
        selectedHotel: null,
        hotelSearch: {
          checkIn: '',
          checkOut: '',
          guests: 1,
          roomType: 'standard',
        },
      };
    default:
      return state;
  }
}

// Components
function FlightBookingForm() {
  const { state, dispatch } = useContext(BookingContext)!;
  const { flightSearch } = state;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_STEP', payload: Step.FLIGHT_RESULTS });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="one-way"
          checked={flightSearch.isOneWay}
          onCheckedChange={(checked) =>
            dispatch({
              type: 'SET_FLIGHT_SEARCH',
              payload: { isOneWay: checked },
            })
          }
        />
        <Label htmlFor="one-way">One-way flight</Label>
      </div>

      <div>
        <Label htmlFor="destination">Destination</Label>
        <Input
          type="text"
          id="destination"
          value={flightSearch.destination}
          onChange={(e) =>
            dispatch({
              type: 'SET_FLIGHT_SEARCH',
              payload: { destination: e.target.value },
            })
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="departure">Departure Date</Label>
        <Input
          type="date"
          id="departure"
          value={flightSearch.departure}
          onChange={(e) =>
            dispatch({
              type: 'SET_FLIGHT_SEARCH',
              payload: { departure: e.target.value },
            })
          }
          required
        />
      </div>

      {!flightSearch.isOneWay && (
        <div>
          <Label htmlFor="arrival">Return Date</Label>
          <Input
            type="date"
            id="arrival"
            value={flightSearch.arrival}
            onChange={(e) =>
              dispatch({
                type: 'SET_FLIGHT_SEARCH',
                payload: { arrival: e.target.value },
              })
            }
            required
          />
        </div>
      )}

      <div>
        <Label htmlFor="passengers">Number of Passengers</Label>
        <Input
          type="number"
          id="passengers"
          value={flightSearch.passengers}
          onChange={(e) =>
            dispatch({
              type: 'SET_FLIGHT_SEARCH',
              payload: { passengers: parseInt(e.target.value) },
            })
          }
          min="1"
          max="9"
          required
        />
      </div>

      <Button type="submit" className="w-full">
        Search Flights
      </Button>
    </form>
  );
}

function FlightSearchResults() {
  const { state, dispatch } = useContext(BookingContext)!;
  const { selectedFlight } = state;

  const mockFlights: FlightOption[] = [
    { id: '1', airline: 'Sky Airways', price: 299, duration: '2h 30m' },
    { id: '2', airline: 'Ocean Air', price: 349, duration: '2h 45m' },
    { id: '3', airline: 'Mountain Express', price: 279, duration: '3h 15m' },
  ];

  const handleSelectFlight = (flight: FlightOption) => {
    dispatch({ type: 'SET_SELECTED_FLIGHT', payload: flight });
    dispatch({ type: 'SET_STEP', payload: Step.HOTEL_SEARCH });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Available Flights</h2>
        <Button
          variant="outline"
          onClick={() =>
            dispatch({ type: 'SET_STEP', payload: Step.FLIGHT_SEARCH })
          }
        >
          Back to Search
        </Button>
      </div>

      <div className="space-y-4">
        {mockFlights.map((flight) => (
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
                  className="mt-2"
                  onClick={() => handleSelectFlight(flight)}
                >
                  Select
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function HotelBookingForm() {
  const { state, dispatch } = useContext(BookingContext)!;
  const { hotelSearch } = state;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: 'SET_STEP', payload: Step.HOTEL_RESULTS });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="checkIn">Check-in Date</Label>
        <Input
          type="date"
          id="checkIn"
          value={hotelSearch.checkIn}
          onChange={(e) =>
            dispatch({
              type: 'SET_HOTEL_SEARCH',
              payload: { checkIn: e.target.value },
            })
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="checkOut">Check-out Date</Label>
        <Input
          type="date"
          id="checkOut"
          value={hotelSearch.checkOut}
          onChange={(e) =>
            dispatch({
              type: 'SET_HOTEL_SEARCH',
              payload: { checkOut: e.target.value },
            })
          }
          required
        />
      </div>

      <div>
        <Label htmlFor="guests">Number of Guests</Label>
        <Input
          type="number"
          id="guests"
          value={hotelSearch.guests}
          onChange={(e) =>
            dispatch({
              type: 'SET_HOTEL_SEARCH',
              payload: { guests: parseInt(e.target.value) },
            })
          }
          min="1"
          max="4"
          required
        />
      </div>

      <div>
        <Label htmlFor="roomType">Room Type</Label>
        <select
          id="roomType"
          value={hotelSearch.roomType}
          onChange={(e) =>
            dispatch({
              type: 'SET_HOTEL_SEARCH',
              payload: { roomType: e.target.value },
            })
          }
          className="w-full p-2 border rounded"
          required
        >
          <option value="standard">Standard</option>
          <option value="deluxe">Deluxe</option>
          <option value="suite">Suite</option>
        </select>
      </div>

      <Button type="submit" className="w-full">
        Search Hotels
      </Button>
    </form>
  );
}

function HotelSearchResults() {
  const { state, dispatch } = useContext(BookingContext)!;
  const { selectedHotel } = state;

  const mockHotels: HotelOption[] = [
    {
      id: '1',
      name: 'Grand Hotel',
      price: 199,
      rating: 4.5,
      amenities: ['Pool', 'Spa', 'Restaurant'],
    },
    {
      id: '2',
      name: 'Seaside Resort',
      price: 249,
      rating: 4.8,
      amenities: ['Beach Access', 'Pool', 'Bar'],
    },
    {
      id: '3',
      name: 'City Center Hotel',
      price: 179,
      rating: 4.2,
      amenities: ['Gym', 'Restaurant', 'Business Center'],
    },
  ];

  const handleSelectHotel = (hotel: HotelOption) => {
    dispatch({ type: 'SET_SELECTED_HOTEL', payload: hotel });
    dispatch({ type: 'SET_STEP', payload: Step.REVIEW });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Available Hotels</h2>
        <Button
          variant="outline"
          onClick={() =>
            dispatch({ type: 'SET_STEP', payload: Step.HOTEL_SEARCH })
          }
        >
          Back to Search
        </Button>
      </div>

      <div className="space-y-4">
        {mockHotels.map((hotel) => (
          <div
            key={hotel.id}
            className={`p-4 border rounded hover:shadow-md ${
              selectedHotel?.id === hotel.id ? 'border-blue-500 bg-blue-50' : ''
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{hotel.name}</h3>
                <p className="text-gray-600">Rating: {hotel.rating}/5</p>
                <p className="text-sm text-gray-500">
                  {hotel.amenities.join(', ')}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold">${hotel.price}/night</p>
                <Button
                  className="mt-2"
                  onClick={() => handleSelectHotel(hotel)}
                >
                  Select
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function BookingReview() {
  const { state, dispatch } = useContext(BookingContext)!;
  const { selectedFlight, selectedHotel, flightSearch, hotelSearch } = state;

  const handleConfirm = () => {
    dispatch({ type: 'SET_STEP', payload: Step.CONFIRMATION });
  };

  const handleBack = () => {
    dispatch({ type: 'SET_STEP', payload: Step.HOTEL_RESULTS });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Review Your Booking</h2>

      <div className="space-y-4">
        <div className="p-4 border rounded">
          <h3 className="font-bold mb-2">Flight Details</h3>
          <p>Airline: {selectedFlight?.airline}</p>
          <p>Duration: {selectedFlight?.duration}</p>
          <p>Price: ${selectedFlight?.price}</p>
          <p>Passengers: {flightSearch.passengers}</p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() => {
              dispatch({ type: 'SET_STEP', payload: Step.FLIGHT_SEARCH });
              dispatch({ type: 'RESET_HOTEL' });
            }}
          >
            Change Flight
          </Button>
        </div>

        <div className="p-4 border rounded">
          <h3 className="font-bold mb-2">Hotel Details</h3>
          <p>Hotel: {selectedHotel?.name}</p>
          <p>Rating: {selectedHotel?.rating}/5</p>
          <p>Price: ${selectedHotel?.price}/night</p>
          <p>Room Type: {hotelSearch.roomType}</p>
          <p>Guests: {hotelSearch.guests}</p>
          <Button
            variant="outline"
            className="mt-2"
            onClick={() =>
              dispatch({ type: 'SET_STEP', payload: Step.HOTEL_SEARCH })
            }
          >
            Change Hotel
          </Button>
        </div>

        <div className="p-4 bg-gray-50 rounded">
          <h3 className="font-bold mb-2">Total Cost</h3>
          <p className="text-xl">
            ${(selectedFlight?.price || 0) + (selectedHotel?.price || 0)}
          </p>
        </div>

        <div className="flex space-x-4">
          <Button variant="outline" onClick={handleBack}>
            Back
          </Button>
          <Button onClick={handleConfirm}>Confirm Booking</Button>
        </div>
      </div>
    </div>
  );
}

function BookingConfirmation() {
  const { state } = useContext(BookingContext)!;
  const { selectedFlight, selectedHotel } = state;

  return (
    <div className="text-center space-y-6">
      <div className="text-6xl">🎉</div>
      <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
      <p className="text-gray-600">
        Thank you for booking with us. Your confirmation details have been sent
        to your email.
      </p>
      <div className="p-4 border rounded inline-block text-left">
        <h3 className="font-bold mb-2">Booking Reference</h3>
        <p>Flight: {selectedFlight?.airline}</p>
        <p>Hotel: {selectedHotel?.name}</p>
      </div>
    </div>
  );
}

// Main Component
export default function Exercise6() {
  const initialState: BookingState = {
    currentStep: Step.FLIGHT_SEARCH,
    flightSearch: {
      destination: '',
      departure: '',
      arrival: '',
      passengers: 1,
      isOneWay: false,
    },
    selectedFlight: null,
    hotelSearch: {
      checkIn: '',
      checkOut: '',
      guests: 1,
      roomType: 'standard',
    },
    selectedHotel: null,
  };

  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const renderStep = () => {
    switch (state.currentStep) {
      case Step.FLIGHT_SEARCH:
        return <FlightBookingForm />;
      case Step.FLIGHT_RESULTS:
        return <FlightSearchResults />;
      case Step.HOTEL_SEARCH:
        return <HotelBookingForm />;
      case Step.HOTEL_RESULTS:
        return <HotelSearchResults />;
      case Step.REVIEW:
        return <BookingReview />;
      case Step.CONFIRMATION:
        return <BookingConfirmation />;
      default:
        return null;
    }
  };

  return (
    <BookingContext.Provider value={{ state, dispatch }}>
      <div className="w-full max-w-2xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Flight & Hotel Booking</h1>
        {renderStep()}
      </div>
    </BookingContext.Provider>
  );
}
