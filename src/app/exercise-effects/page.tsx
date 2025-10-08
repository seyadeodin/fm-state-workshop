'use client';

import { useEffect, useReducer } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface Flight {
  id: string;
  price: number;
  airline: string;
  departureTime: string;
  arrivalTime: string;
}

interface Hotel {
  id: string;
  name: string;
  price: number;
  rating: number;
}

type SearchStatus = "idle" | "searchingHotels" | "searchingFlights" | "error";

interface TripSearchFields {
  destination: string;
  startDate: string;
  endDate: string;
}

interface TripSearchState {
  fields: TripSearchFields;
  status: SearchStatus;
  selectedFlight: Flight | null;
  selectedHotel: Hotel | null;
  error: string | null;
}

type TripSearchEvent =
  | {
    type: "updateFlight"
    payload: {
      selectedFlight: Flight;
    }
  }
  | {
    type: "updateHotel"
    payload: {
      selectedHotel: Hotel;
    }
  }
  | {
    type: "updateField",
    payload: Partial<TripSearchState["fields"]>
  }
  | {
    type: "showError",
    payload: { error: string }
  }


const initialState: TripSearchState = {
  fields: {
    destination: "",
    startDate: "",
    endDate: "",
  },
  status: "idle",
  selectedFlight: null,
  selectedHotel: null,
  error: null,
}


const reducer = (state: TripSearchState, event: TripSearchEvent): TripSearchState => {
  switch (event.type) {
    case ("updateField"):
      const fields: TripSearchFields = {
        ...state.fields,
        ...event.payload
      };
      const newStatus: SearchStatus = Object.values(fields).some(value => value == null || value == "") ? "idle" : "searchingFlights";
      return {
        ...state,
        fields,
        status: newStatus,
        selectedFlight: null,
        selectedHotel: null,
      }
    case ("updateFlight"):
      return {
        ...state,
        error: null,
        status: "searchingHotels",
        selectedFlight: event.payload.selectedFlight
      }

    case ("updateHotel"):
      return {
        ...state,
        status: "idle",
        selectedHotel: event.payload.selectedHotel,
      }
    case ("showError"):
      return {
        ...state,
        status: "error",
        error: event.payload.error,
      }
    default:
      return state;
  }
}

function useTripSearch() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function onStatusUpdate() {
    switch (state.status) {
      case "searchingFlights":
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));

          const flights: Flight[] = [
            {
              id: '1',
              price: 299,
              airline: 'Mock Airlines',
              departureTime: '10:00 AM',
              arrivalTime: '2:00 PM',
            },
            {
              id: '2',
              price: 399,
              airline: 'Demo Airways',
              departureTime: '2:00 PM',
              arrivalTime: '6:00 PM',
            },
          ];

          const bestFlight = flights.reduce((prev, current) =>
            prev.price < current.price ? prev : current
          );

          dispatch({ type: 'updateFlight', payload: { selectedFlight: bestFlight } })
        } catch {
          dispatch({ type: 'showError', payload: { error: "Failed to search flights" } })
        }
      case "searchingHotels":
        try {
          // Simulate API call
          await new Promise((resolve) => setTimeout(resolve, 1500));

          // Mock hotel data
          const hotels: Hotel[] = [
            {
              id: '1',
              name: 'Grand Hotel',
              price: 150,
              rating: 4.5,
            },
            {
              id: '2',
              name: 'Budget Inn',
              price: 80,
              rating: 3.8,
            },
          ];

          // Pick the best rated hotel
          const bestHotel = hotels.reduce((prev, current) =>
            prev.rating > current.rating ? prev : current
          );

          dispatch({ type: "updateHotel", payload: { selectedHotel: bestHotel } })
        } catch {
          dispatch({ type: 'showError', payload: { error: "Failed to search hotels" } })
        }
    }
  }

  useEffect(() => {
    onStatusUpdate();
  }, [state.status])

  return [state, dispatch] as const;
}

export default function TripSearch() {
  const [state, dispatch] = useTripSearch();


  const startDate = state.fields.startDate;
  const endDate = state.fields.endDate;

  const isSearchingFlights = state.status === 'searchingFlights';
  const isSearchingHotels = state.status === 'searchingHotels';

  const selectedFlight = state.selectedFlight;
  const selectedHotel = state.selectedHotel;
  const error = state.error;


  return (
    <div className="p-8 w-full max-w-2xl mx-auto space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Search Parameters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="destination">Destination</Label>
            <Input
              id="destination"
              onBlur={(e) => dispatch({
                type: "updateField",
                payload: {
                  destination: e.target.value.trim()
                }
              })}
              placeholder="Enter destination"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="startDate">Start Date</Label>
            <Input
              id="startDate"
              type="date"
              value={startDate}
              onChange={(e) => dispatch({
                type: "updateField",
                payload: {
                  startDate: e.target.value
                }
              })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="endDate">End Date</Label>
            <Input
              id="endDate"
              type="date"
              value={endDate}
              onChange={(e) => dispatch({
                type: "updateField",
                payload: {
                  endDate: e.target.value
                }
              })}
            />
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-md">
          {error}
        </div>
      )}

      <div className="space-y-6">
        <Card className={isSearchingFlights ? 'opacity-50' : ''}>
          <CardHeader>
            <CardTitle>Flight Search</CardTitle>
          </CardHeader>
          <CardContent>
            {isSearchingFlights ? (
              <p>Searching for flights...</p>
            ) : selectedFlight ? (
              <div className="space-y-2">
                <p className="font-medium">Selected Flight:</p>
                <p>Airline: {selectedFlight.airline}</p>
                <p>Price: ${selectedFlight.price}</p>
                <p>Departure: {selectedFlight.departureTime}</p>
                <p>Arrival: {selectedFlight.arrivalTime}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card
          className={
            isSearchingHotels || isSearchingFlights ? 'opacity-50' : ''
          }
        >
          <CardHeader>
            <CardTitle>Hotel Search</CardTitle>
          </CardHeader>
          <CardContent>
            {isSearchingHotels ? (
              <p>Searching for hotels...</p>
            ) : selectedHotel ? (
              <div className="space-y-2">
                <p className="font-medium">Selected Hotel:</p>
                <p>Name: {selectedHotel.name}</p>
                <p>Price: ${selectedHotel.price}/night</p>
                <p>Rating: {selectedHotel.rating}/5</p>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
