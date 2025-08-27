"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { getFlightOptions } from "@/app/exerciseUtils";

interface FlightOption {
  id: string;
  airline: string;
  price: number;
  duration: string;
}

interface BookingOptions {
  destination: string;
  departure: string;
  arrival: string;
  passengers: number;
}

type BookingState =
  | {
      status: "idle" | "submitting" | "error";
    }
  | {
      status: "success";
      flightOptions: FlightOption[];
    };

type FlightState =
  | (BookingOptions & {
      status: "idle" | "submitting" | "error" | "success";
      flightOptions?: FlightOption[] | null;
      error: string | null;
    })
  | {
      status: "success";
      flightOptions: FlightOption[];
    }
  | {
      status: "submitting";
      flightOptions: null;
    }
  | {
      status: "idle";
      flightOptions: null;
    }
  | {
      status: "error";
      flightOptions: null;
      message: string;
    };

function FlightBooking() {
  const [bookingState, setBookingState] = useState<BookingState>({
    status: "idle",
  });
  //const isSubmitting = bookingState.status === "submitting";

  const [isRoundtrip, setIsRoundtrip] = useState(false);
  const [bookingOptions, setBookingOptions] = useState<BookingOptions>({
    destination: "",
    departure: "",
    arrival: "",
    passengers: 1,
  });

  //const { arrival, departure, destination, passengers } = bookingOptions;

  const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null); //todo: Change to id
  const totalPrice =
    bookingState.status === "success" && selectedFlightId
      ? bookingState.flightOptions.find(
          (option) => option.id === selectedFlightId
        )!.price * bookingOptions.passengers
      : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setBookingState({ status: "submitting" });
    setSelectedFlightId(null);

    try {
      const flights = await getFlightOptions({
        destination: bookingOptions.destination,
        departure: bookingOptions.departure,
        arrival: bookingOptions.arrival,
        passengers: bookingOptions.passengers,
      });

      setBookingState({ status: "success", flightOptions: flights });
    } catch {
      setBookingState({ status: "error" });
    }
  };

  const handleFlightSelect = (flight: FlightOption) => {
    setSelectedFlightId(flight.id);
  };

  function handleBookingOptionsChange(
    field: keyof BookingOptions,
    value: string | number
  ) {
    setBookingOptions((prev) => ({ ...prev, [field]: value }));
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Flight Booking</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="roundtrip"
            checked={isRoundtrip}
            onCheckedChange={setIsRoundtrip}
          />
          <Label htmlFor="roundtrip">Roundtrip flight</Label>
        </div>

        <div>
          <Label htmlFor="destination" className="block mb-1">
            Destination
          </Label>
          <Input
            type="text"
            id="destination"
            value={bookingOptions.destination}
            onChange={(e) =>
              handleBookingOptionsChange("destination", e.target.value)
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
            value={bookingOptions.departure}
            onChange={(e) =>
              handleBookingOptionsChange("departure", e.target.value)
            }
            required
          />
        </div>

        {isRoundtrip && (
          <div>
            <Label htmlFor="arrival" className="block mb-1">
              Return Date
            </Label>
            <Input
              type="date"
              id="arrival"
              value={bookingOptions.arrival}
              onChange={(e) =>
                handleBookingOptionsChange("arrival", e.target.value)
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
            value={bookingOptions.passengers}
            onChange={
              (e) =>
                handleBookingOptionsChange("passengers", e.target.valueAsNumber) //there's also valueAsDate
            }
            min="1"
            max="9"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={bookingState.status === "submitting"}
          className="w-full"
        >
          {bookingState.status === "submitting"
            ? "Searching..."
            : "Search Flights"}
        </Button>
      </form>

      {bookingState.status === "error" && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          An error occurred while searching for flights. Please try again.
        </div>
      )}

      {bookingState.status === "success" &&
        bookingState.flightOptions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Available Flights</h2>
            <div className="space-y-4">
              {bookingState.flightOptions.map((flight) => (
                <div
                  key={flight.id}
                  className={`p-4 border rounded hover:shadow-md ${
                    selectedFlightId === flight.id
                      ? "border-blue-500 bg-blue-50"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-medium">{flight.airline}</h3>
                      <p className="text-gray-600">
                        Duration: {flight.duration}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xl font-bold">${flight.price}</p>
                      <Button
                        className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                        onClick={() => handleFlightSelect(flight)}
                      >
                        {selectedFlightId === flight.id ? "Selected" : "Select"}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {selectedFlightId && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
          <div className="space-y-2">
            <p>Flight: {selectedFlightId}</p>
            <p>Duration: {selectedFlightId}</p>
            <p>Passengers: {bookingOptions.passengers}</p>
            <p className="text-xl font-bold mt-4">Total: ${totalPrice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return <FlightBooking />;
}
