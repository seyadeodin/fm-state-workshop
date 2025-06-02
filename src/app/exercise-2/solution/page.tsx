'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';
import { getFlightOptions } from '@/app/exerciseUtils';

const enum FormStatus {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
  SELECTED = 'SELECTED',
}

interface FlightOption {
  id: string;
  airline: string;
  price: number;
  duration: string;
}

interface FormData {
  destination: string;
  departure: string;
  arrival: string;
  passengers: number;
  isRoundtrip: boolean;
}

interface FlightState {
  flightOptions: FlightOption[];
  selectedFlightId: string | null;
}

const initialFormData: FormData = {
  destination: '',
  departure: '',
  arrival: '',
  passengers: 1,
  isRoundtrip: false,
};

const initialFlightState: FlightState = {
  flightOptions: [],
  selectedFlightId: null,
};

function FlightBooking() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [flightState, setFlightState] =
    useState<FlightState>(initialFlightState);
  const [status, setStatus] = useState<FormStatus>(FormStatus.IDLE);

  // Derived state
  const selectedFlight = flightState.flightOptions.find(
    (flight) => flight.id === flightState.selectedFlightId
  );
  const totalPrice = selectedFlight
    ? selectedFlight.price * formData.passengers
    : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus(FormStatus.SUBMITTING);
    setFlightState((prev) => ({ ...prev, selectedFlightId: null }));

    try {
      const flights = await getFlightOptions({
        destination: formData.destination,
        departure: formData.departure,
        arrival: formData.arrival,
        passengers: formData.passengers,
      });

      setFlightState((prev) => ({ ...prev, flightOptions: flights }));
      setStatus(FormStatus.SUCCESS);
    } catch {
      setStatus(FormStatus.ERROR);
    }
  };

  const handleFlightSelect = (flight: FlightOption) => {
    setFlightState((prev) => ({ ...prev, selectedFlightId: flight.id }));
    setStatus(FormStatus.SELECTED);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Flight Booking</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2 mb-4">
          <Switch
            id="roundtrip"
            checked={formData.isRoundtrip}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, isRoundtrip: checked }))
            }
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
            value={formData.destination}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, destination: e.target.value }))
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
            value={formData.departure}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, departure: e.target.value }))
            }
            required
          />
        </div>

        {formData.isRoundtrip && (
          <div>
            <Label htmlFor="arrival" className="block mb-1">
              Return Date
            </Label>
            <Input
              type="date"
              id="arrival"
              value={formData.arrival}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, arrival: e.target.value }))
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
            value={formData.passengers}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                passengers: parseInt(e.target.value),
              }))
            }
            min="1"
            max="9"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={status === FormStatus.SUBMITTING}
          className="w-full"
        >
          {status === FormStatus.SUBMITTING ? 'Searching...' : 'Search Flights'}
        </Button>
      </form>

      {status === FormStatus.ERROR && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          An error occurred while searching for flights. Please try again.
        </div>
      )}

      {status === FormStatus.SUCCESS &&
        flightState.flightOptions.length > 0 && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Available Flights</h2>
            <div className="space-y-4">
              {flightState.flightOptions.map((flight) => (
                <div
                  key={flight.id}
                  className={`p-4 border rounded hover:shadow-md ${
                    flightState.selectedFlightId === flight.id
                      ? 'border-blue-500 bg-blue-50'
                      : ''
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
                        {flightState.selectedFlightId === flight.id
                          ? 'Selected'
                          : 'Select'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {status === FormStatus.SELECTED && flightState.selectedFlightId && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Booking Summary</h3>
          <div className="space-y-2">
            <p>Flight: {selectedFlight?.airline}</p>
            <p>Duration: {selectedFlight?.duration}</p>
            <p>Passengers: {formData.passengers}</p>
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
