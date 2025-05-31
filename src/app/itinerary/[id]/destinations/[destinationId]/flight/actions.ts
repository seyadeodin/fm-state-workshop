'use server';

import { db } from '@/db';
import { flightBookings } from '@/db/schema';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function selectFlight(
  itineraryId: string,
  destinationId: string,
  flightData: {
    airline: string;
    price: number;
    departureTime: string;
    arrivalTime: string;
  }
) {
  await db.insert(flightBookings).values({
    id: crypto.randomUUID(),
    destinationId,
    airline: flightData.airline,
    price: flightData.price,
    departureTime: flightData.departureTime,
    arrivalTime: flightData.arrivalTime,
  });

  revalidatePath(
    `/itinerary/${itineraryId}/destinations/${destinationId}/flight`
  );
  redirect(`/itinerary/${itineraryId}/destinations/${destinationId}/hotel`);
}
