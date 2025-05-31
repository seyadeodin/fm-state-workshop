'use server';

import { db } from '@/db';
import { flightBookings } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type Flight = {
  id: string;
  airline: string;
  price: number;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  class: string;
};

export async function getFlights(): Promise<Flight[]> {
  // In a real app, this would fetch from an external API or database
  return [
    {
      id: '1',
      airline: 'United Airlines',
      price: 250,
      departureTime: '10:00 AM',
      arrivalTime: '1:00 PM',
      duration: '3h 0m',
      class: 'Economy',
    },
    {
      id: '2',
      airline: 'American Airlines',
      price: 275,
      departureTime: '11:00 AM',
      arrivalTime: '2:00 PM',
      duration: '3h 0m',
      class: 'Economy',
    },
    {
      id: '3',
      airline: 'Delta Airlines',
      price: 300,
      departureTime: '12:00 PM',
      arrivalTime: '3:00 PM',
      duration: '3h 0m',
      class: 'Economy',
    },
    {
      id: '4',
      airline: 'Southwest Airlines',
      price: 325,
      departureTime: '1:00 PM',
      arrivalTime: '4:00 PM',
      duration: '3h 0m',
      class: 'Economy',
    },
    {
      id: '5',
      airline: 'Alaska Airlines',
      price: 350,
      departureTime: '2:00 PM',
      arrivalTime: '5:00 PM',
      duration: '3h 0m',
      class: 'Economy',
    },
    {
      id: '6',
      airline: 'JetBlue Airways',
      price: 375,
      departureTime: '3:00 PM',
      arrivalTime: '6:00 PM',
      duration: '3h 0m',
      class: 'Economy',
    },
  ];
}

export async function selectFlight(
  itineraryId: string,
  destinationId: string,
  flightId: string
) {
  const flights = await getFlights();
  const selectedFlight = flights.find((f) => f.id === flightId);

  if (!selectedFlight) {
    throw new Error('Flight not found');
  }

  await db.insert(flightBookings).values({
    id: crypto.randomUUID(),
    destinationId,
    airline: selectedFlight.airline,
    price: selectedFlight.price,
    departureTime: selectedFlight.departureTime,
    arrivalTime: selectedFlight.arrivalTime,
  });

  revalidatePath(
    `/itinerary/${itineraryId}/destinations/${destinationId}/flight`
  );
  redirect(`/itinerary/${itineraryId}/destinations/${destinationId}/hotel`);
}
