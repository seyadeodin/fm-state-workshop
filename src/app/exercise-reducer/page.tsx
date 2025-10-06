'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { use, useReducer, useState, createContext } from 'react';
import { FlightOption, getFlightOptions } from '@/app/exerciseUtils';

type FormFields = {
  destination: string;
  departure: string;
  arrival: string;
  passengers: number;
  isOneWay: boolean;
}

type State = {
  flightOptions?: FlightOption[];
  error?: string;
  passengers?: number;
} & (
    |
    { status: "idle" } | { status: "error"; error: string } | { status: "submitting" } | { status: "complete"; flightOptions: FlightOption[]; passengers: number }
  )

type Action = {
  flightOptions?: FlightOption[];
  error?: string;
} & (| 
  {
    type: "getResults";
    flightOptions: FlightOption[];
    passengers: number;
  } | {
    type: "showError";
    error: string;
  } | {
    type: "submit" | "back";
  }
)


function flowReducer(state: State, action: Action): State {
  switch (action.type) {
    case "submit":
      return {
        ...state,
        status: "submitting"
      }
    case "getResults":
      return {
        ...state,
        passengers: action.passengers,
        flightOptions: action.flightOptions,
        status: "complete"
      }
    case "showError":
      return {
        ...state,
        error: action.error,
        status: "error"
      }
    case "back":
      return {
        status: "idle"
      }
  }

}

const FlightsContext = createContext<{
  state: State;
  dispatch: (action: Action) => void;
}>({} as {state: State; dispatch: (acion: Action) => void});

function FlightsProvider({ children }: { children: React.ReactNode }) {
  const  [state, dispatch] = useReducer(flowReducer, { status: "idle" })

  return (
    <FlightsContext.Provider value={{ state, dispatch }}>
      {children}
    </FlightsContext.Provider>
  )
}



function SearchResults({
} ) {
  const { dispatch, state } = use(FlightsContext);
  const [selectedFlight, setSelectedFlight] = useState<FlightOption | null>(
    null
  );

  if(state.status !== "complete") { return <div>Unexpected error</div>}

  const passengers = state.passengers ?? 0;
  const totalPrice = selectedFlight ? selectedFlight.price * passengers : 0;


  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Search Results</h2>
        <Button variant="outline" onClick={() => dispatch({type: "back"})}>
          Back to Search
        </Button>
      </div>

      <div className="space-y-4">
        {state.flightOptions.map((flight) => (
          <div
            key={flight.id}
            className={`p-4 border rounded hover:shadow-md ${selectedFlight?.id === flight.id
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
            <p>Passengers: {passengers}</p>
            <p className="text-xl font-bold mt-4">Total: ${totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function BookingForm() {
  const [isOneWay, setIsOneWay] = useState(false);
  const { dispatch, state } = use(FlightsContext)

  const isSubmitting = state.status === "submitting"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target)

    const formFields: FormFields = {
      arrival: formData.get("arrival")?.toString() ?? "",
      departure: formData.get("departure")?.toString() ?? "",
      destination: formData.get("destination")?.toString() ?? "",
      isOneWay: isOneWay,
      passengers:  Number(formData.get("passengers")),
    }

    dispatch({
      type: "submit",
    })

    //setSearchParams(formData);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const mockFlights = await getFlightOptions(formFields);
      dispatch({
        type: "getResults",
        passengers: formFields.passengers,
        flightOptions: mockFlights
      })
    } catch {
      dispatch({ type: "showError", error: "An error occurred while searching for flights. Please try again." });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Switch id="one-way" name="one-way" checked={isOneWay} onCheckedChange={setIsOneWay} />
        <Label htmlFor="one-way">One-way flight</Label>
      </div>

      <div>
        <Label htmlFor="destination" className="block mb-1">
          Destination
        </Label>
        <Input
          type="text"
          id="destination"
          name="destination"
          defaultValue={"Salvador"}
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
          name="departure"
          defaultValue={"2025-01-01"}
          required
        />
      </div>

      {!isOneWay && (
        <div>
          <Label htmlFor="arrival" className="block mb-1">
            Return Date
          </Label>
          <Input
            type="date"
            id="arrival"
            name="arrival"
            defaultValue={"2025-01-01"}
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
          name="passengers"
          min="1"
          max="9"
          required
        />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? 'Searching...' : 'Search Flights'}
      </Button>
    </form>
  );
}

export function FlightsContent() {
  const { state } = use(FlightsContext)

  const isSubmitting = state.status === "submitting";
  const isError = state.status === "error";
  const isComplete = state.status === "complete";
  const  isIdle = state.status === "idle";



  return(
    <div className="w-full max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Flight Booking</h1>

      {
        isIdle &&
          <BookingForm />
      }

      {isError && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          {state.error}
        </div>
      )}

      {
        isSubmitting && (
          <div>Carregando</div>
        )
      }

      {isComplete && (
          <SearchResults/>
      )}
    </div>
  )

}


export default function Page() {

  return (
    <FlightsProvider>
      <FlightsContent/>
    </FlightsProvider>
  );
}

