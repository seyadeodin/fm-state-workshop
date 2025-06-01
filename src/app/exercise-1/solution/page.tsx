'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { getFlightOptions } from '../getFlightOptions';

export interface FlightOption {
  id: string;
  airline: string;
  price: number;
  duration: string;
}

const enum FormState {
  IDLE = 'IDLE',
  SUBMITTING = 'SUBMITTING',
  ERROR = 'ERROR',
  SUCCESS = 'SUCCESS',
}

function FlightBooking() {
  const [destination, setDestination] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [formState, setFormState] = useState<FormState>(FormState.IDLE);
  const [flightOptions, setFlightOptions] = useState<FlightOption[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState(FormState.SUBMITTING);

    try {
      const flights = await getFlightOptions({
        destination,
        departure,
        arrival,
        passengers,
      });

      setFlightOptions(flights);
      setFormState(FormState.SUCCESS);
    } catch (error) {
      setFormState(FormState.ERROR);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Flight Booking</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="destination" className="block mb-1">
            Destination
          </Label>
          <Input
            type="text"
            id="destination"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
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
            value={departure}
            onChange={(e) => setDeparture(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <Label htmlFor="arrival" className="block mb-1">
            Arrival Date
          </Label>
          <Input
            type="date"
            id="arrival"
            value={arrival}
            onChange={(e) => setArrival(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div>
          <Label htmlFor="passengers" className="block mb-1">
            Number of Passengers
          </Label>
          <Input
            type="number"
            id="passengers"
            value={passengers}
            onChange={(e) => setPassengers(parseInt(e.target.value))}
            min="1"
            max="9"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={formState === FormState.SUBMITTING}
          className="w-full"
        >
          {formState === FormState.SUBMITTING
            ? 'Searching...'
            : 'Search Flights'}
        </Button>
      </form>

      {formState === FormState.ERROR && (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          An error occurred while searching for flights. Please try again.
        </div>
      )}

      {flightOptions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Available Flights</h2>
          <div className="space-y-4">
            {flightOptions.map((flight) => (
              <div
                key={flight.id}
                className="p-4 border rounded hover:shadow-md"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{flight.airline}</h3>
                    <p className="text-gray-600">Duration: {flight.duration}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold">${flight.price}</p>
                    <Button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600">
                      Select
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return <FlightBooking />;
}
