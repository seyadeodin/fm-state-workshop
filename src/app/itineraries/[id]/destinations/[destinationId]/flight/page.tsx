import { db } from '@/db';
import { destinations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { selectFlight, getFlights } from './actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Plane, Clock, DollarSign, Search } from 'lucide-react';

export default async function FlightBookingPage(
  props: {
    params: Promise<{ id: string; destinationId: string }>;
  }
) {
  const params = await props.params;
  const destination = await db.query.destinations.findFirst({
    where: eq(destinations.id, params.destinationId),
  });

  if (!destination) {
    notFound();
  }

  const flights = await getFlights();

  async function handleFlightSelection(formData: FormData) {
    'use server';
    const flightId = formData.get('flightId') as string;
    await selectFlight(params.id, params.destinationId, flightId);
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center gap-3 mb-8">
        <Plane className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">Book Flight</h1>
          <p className="text-muted-foreground">
            Find flights to {destination.name}
          </p>
        </div>
      </div>

      {/* Search Form */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Flights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="from">From</Label>
              <Input id="from" placeholder="Departure city" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="to">To</Label>
              <Input id="to" defaultValue={destination.location} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="departure">Departure</Label>
              <Input
                id="departure"
                type="date"
                defaultValue={destination.arrivalDate}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="passengers">Passengers</Label>
              <Input id="passengers" type="number" defaultValue="1" min="1" />
            </div>
          </div>
          <div className="flex justify-end mt-4">
            <Button>
              <Search className="h-4 w-4" />
              Search Flights
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Flight Results */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-4">Available Flights</h2>
        {flights.map((flight) => (
          <Card key={flight.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-3">
                    <Plane className="h-6 w-6 text-primary" />
                    <div>
                      <h3 className="font-semibold">{flight.airline}</h3>
                      <Badge variant="secondary">{flight.class}</Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <p className="text-lg font-semibold">
                        {flight.departureTime}
                      </p>
                      <p className="text-sm text-muted-foreground">Departure</p>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{flight.duration}</span>
                    </div>

                    <div className="text-center">
                      <p className="text-lg font-semibold">
                        {flight.arrivalTime}
                      </p>
                      <p className="text-sm text-muted-foreground">Arrival</p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="h-4 w-4 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                      ${flight.price}
                    </span>
                  </div>
                  <form action={handleFlightSelection}>
                    <input type="hidden" name="flightId" value={flight.id} />
                    <Button type="submit">Select Flight</Button>
                  </form>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
