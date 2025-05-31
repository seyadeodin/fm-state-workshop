'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface FlightOption {
  id: string;
  airline: string;
  price: number;
  duration: string;
}

export default function Exercise1() {
  const [destination, setDestination] = useState('');
  const [departure, setDeparture] = useState('');
  const [arrival, setArrival] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isError, setIsError] = useState(false);
  const [flightOptions, setFlightOptions] = useState<FlightOption[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Mock flight options
      const mockFlights: FlightOption[] = [
        { id: '1', airline: 'Sky Airways', price: 299, duration: '2h 30m' },
        { id: '2', airline: 'Ocean Air', price: 349, duration: '2h 45m' },
        {
          id: '3',
          airline: 'Mountain Express',
          price: 279,
          duration: '3h 15m',
        },
      ];

      setFlightOptions(mockFlights);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsSubmitting(false);
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

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Searching...' : 'Search Flights'}
        </Button>
      </form>

      {isError && (
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
                    <Button className="mt-2 bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600">
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
