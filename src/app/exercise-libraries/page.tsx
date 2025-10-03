"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { createStore } from "@xstate/store";
import { useSelector } from "@xstate/store/react";

// Types
const enum Step {
  FlightSearch = "FlightSearch",
  FlightResults = "FlightResults",
  HotelSearch = "HotelSearch",
  HotelResults = "HotelResults",
  Review = "Review",
  Confirmation = "Confirmation",
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

interface FlightSearch {
  destination: string;
  departure: string;
  arrival: string;
  passengers: number;
  isOneWay: boolean;
}

interface HotelSearch {
  checkIn: string;
  checkOut: string;
  guests: number;
  roomType: string;
}

interface BookingState {
  currentStep: Step;
  flightSearch: FlightSearch;
  selectedFlight: FlightOption | null;
  hotelSearch: HotelSearch;
  selectedHotel: HotelOption | null;
}

const initialState: BookingState = {
  currentStep: Step.FlightSearch,
  flightSearch: {
    destination: "",
    departure: "",
    arrival: "",
    passengers: 1,
    isOneWay: false,
  },
  selectedFlight: null,
  hotelSearch: {
    checkIn: "",
    checkOut: "",
    guests: 1,
    roomType: "standard",
  },
  selectedHotel: null,
};
// Action types

export const store = createStore({
  context: initialState,
  on: {
    flightSearchUpdated: (context, e: { flightSearch: FlightSearch }) => ({
      ...context,
      flightSearch: { ...context.flightSearch, ...e.flightSearch },
    }),
    searchFlights: (context) => ({
      ...context,
      currentStep: Step.FlightResults,
    }),
    flightSelected: (context, e: { selectedFlight: FlightOption }) => ({
      ...context,
      currentStep: Step.HotelSearch,
      selectedFlight: e.selectedFlight,
    }),
    changeFlight: (context) => ({
      ...context,
      currentStep: Step.FlightSearch,
    }),
    hotelSearchUpdated: (context, e: { hotelSearch: HotelSearch }) => ({
      ...context,
      hotelSearch: e.hotelSearch,
    }),
    searchHotels: (context) => ({
      ...context,
      currentStep: Step.HotelResults,
    }),
    hotelSelected: (context, e: { hotel: HotelOption }) => ({
      ...context,
      currentStep: Step.Review,
      selectedHotel: e.hotel,
    }),
    changeHotel: (context) => ({
      ...context,
      currentStep: Step.HotelSearch,
    }),
    book: (context) => ({
      ...context,
      currentStep: Step.Confirmation,
    }),
    back: (context) => {
      switch (context.currentStep) {
        case Step.FlightResults:
          return {
            ...context,
            currentStep: Step.FlightSearch,
          };
        case Step.HotelSearch:
          return {
            ...context,
            currentStep: Step.FlightResults,
          };
        case Step.HotelResults:
          return {
            ...context,
            currentStep: Step.HotelSearch,
          };
        case Step.Review:
          return {
            ...context,
            currentStep: Step.HotelResults,
          };
        default:
          return context;
      }
    },
  },
});

function FlightBookingForm() {
  const flightSearch = useSelector(
    store,
    (value) => value.context.flightSearch
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    store.trigger.searchFlights();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Switch
          id="one-way"
          checked={flightSearch.isOneWay}
          onCheckedChange={(checked) =>
            store.trigger.flightSearchUpdated({
              flightSearch: { ...flightSearch, isOneWay: checked },
            })
          }
        />
        <Label htmlFor="one-way">One-way flight</Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor="destination">Destination</Label>
        <Input
          type="text"
          id="destination"
          value={flightSearch.destination}
          onChange={(e) =>
            store.trigger.flightSearchUpdated({
              flightSearch: { ...flightSearch, destination: e.target.value },
            })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="departure">Departure Date</Label>
        <Input
          type="date"
          id="departure"
          value={flightSearch.departure}
          onChange={(e) =>
            store.trigger.flightSearchUpdated({
              flightSearch: { ...flightSearch, departure: e.target.value },
            })
          }
          required
        />
      </div>

      {!flightSearch.isOneWay && (
        <div className="space-y-2">
          <Label htmlFor="arrival">Return Date</Label>
          <Input
            type="date"
            id="arrival"
            value={flightSearch.arrival}
            onChange={(e) =>
              store.trigger.flightSearchUpdated({
                flightSearch: { ...flightSearch, arrival: e.target.value },
              })
            }
            required
          />
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="passengers">Number of Passengers</Label>
        <Input
          type="number"
          id="passengers"
          value={flightSearch.passengers}
          onChange={(e) =>
            store.trigger.flightSearchUpdated({
              flightSearch: {
                ...flightSearch,
                passengers: parseInt(e.target.value),
              },
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
  const selectedFlight = useSelector(
    store,
    ({ context }) => context.selectedFlight
  );

  const mockFlights: FlightOption[] = [
    { id: "1", airline: "Sky Airways", price: 299, duration: "2h 30m" },
    { id: "2", airline: "Ocean Air", price: 349, duration: "2h 45m" },
    { id: "3", airline: "Mountain Express", price: 279, duration: "3h 15m" },
  ];

  const handleSelectFlight = (flight: FlightOption) => {
    store.trigger.flightSelected({ selectedFlight: flight });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Available Flights</h2>
        <Button
          variant="outline"
          onClick={() => {
            store.trigger.back();
          }}
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
                ? "border-blue-500 bg-blue-50"
                : ""
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
  const hotelSearch = useSelector(store, ({ context }) => context.hotelSearch);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.trigger.searchHotels();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Hotel Search</h2>
        <Button
          variant="outline"
          onClick={() => {
            store.trigger.back();
          }}
        >
          Back to Flights
        </Button>
      </div>
      <div className="space-y-2">
        <Label htmlFor="checkIn">Check-in Date</Label>
        <Input
          type="date"
          id="checkIn"
          value={hotelSearch.checkIn}
          onChange={(e) =>
            store.trigger.hotelSearchUpdated({
              hotelSearch: { ...hotelSearch, checkIn: e.target.value },
            })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="checkOut">Check-out Date</Label>
        <Input
          type="date"
          id="checkOut"
          value={hotelSearch.checkOut}
          onChange={(e) =>
            store.trigger.hotelSearchUpdated({
              hotelSearch: { ...hotelSearch, checkOut: e.target.value },
            })
          }
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="guests">Number of Guests</Label>
        <Input
          type="number"
          id="guests"
          value={hotelSearch.guests}
          onChange={(e) =>
            store.trigger.hotelSearchUpdated({
              hotelSearch: { ...hotelSearch, guests: parseInt(e.target.value) },
            })
          }
          min="1"
          max="4"
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="roomType">Room Type</Label>
        <select
          id="roomType"
          value={hotelSearch.roomType}
          onChange={(e) =>
            store.trigger.hotelSearchUpdated({
              hotelSearch: { ...hotelSearch, roomType: e.target.value },
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
  const selectedHotel = useSelector(
    store,
    ({ context }) => context.selectedHotel
  );

  const mockHotels: HotelOption[] = [
    {
      id: "1",
      name: "Grand Hotel",
      price: 199,
      rating: 4.5,
      amenities: ["Pool", "Spa", "Restaurant"],
    },
    {
      id: "2",
      name: "Seaside Resort",
      price: 249,
      rating: 4.8,
      amenities: ["Beach Access", "Pool", "Bar"],
    },
    {
      id: "3",
      name: "City Center Hotel",
      price: 179,
      rating: 4.2,
      amenities: ["Gym", "Restaurant", "Business Center"],
    },
  ];

  const handleSelectHotel = (hotel: HotelOption) => {
    store.trigger.hotelSelected({ hotel });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Available Hotels</h2>
        <Button
          variant="outline"
          onClick={() => {
            store.trigger.back();
          }}
        >
          Back to Search
        </Button>
      </div>

      <div className="space-y-4">
        {mockHotels.map((hotel) => (
          <div
            key={hotel.id}
            className={`p-4 border rounded hover:shadow-md ${
              selectedHotel?.id === hotel.id ? "border-blue-500 bg-blue-50" : ""
            }`}
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">{hotel.name}</h3>
                <p className="text-gray-600">Rating: {hotel.rating}/5</p>
                <p className="text-sm text-gray-500">
                  {hotel.amenities.join(", ")}
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
  const selectedFlight = useSelector(
    store,
    ({ context }) => context.selectedFlight
  );
  const selectedHotel = useSelector(
    store,
    ({ context }) => context.selectedHotel
  );
  const flightSearch = useSelector(
    store,
    ({ context }) => context.flightSearch
  );
  const hotelSearch = useSelector(store, ({ context }) => context.hotelSearch);

  const handleConfirm = () => {
    store.trigger.book();
  };

  const handleBack = () => {
    store.trigger.back();
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
              store.trigger.changeFlight();
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
            onClick={() => {
              store.trigger.changeHotel();
            }}
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
  const selectedFlight = useSelector(
    store,
    ({ context }) => context.selectedFlight
  );
  const selectedHotel = useSelector(
    store,
    ({ context }) => context.selectedHotel
  );

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
function BookingApp() {
  const step = useSelector(store, ({ context }) => context.currentStep);

  const renderStep = () => {
    switch (step) {
      case Step.FlightSearch:
        return <FlightBookingForm />;
      case Step.FlightResults:
        return <FlightSearchResults />;
      case Step.HotelSearch:
        return <HotelBookingForm />;
      case Step.HotelResults:
        return <HotelSearchResults />;
      case Step.Review:
        return <BookingReview />;
      case Step.Confirmation:
        return <BookingConfirmation />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Flight & Hotel Booking</h1>
      {renderStep()}
    </div>
  );
}

export default function Exercise8() {
  return <BookingApp />;
}
