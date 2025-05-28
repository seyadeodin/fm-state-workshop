import { NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { generateId } from '@/db';

// POST /api/v1/booking/flights
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { flightNumber, passengerDetails, itineraryId } = body;

    if (!flightNumber || !passengerDetails || !itineraryId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create a booking record
    const newBooking = await db
      .insert(bookings)
      .values({
        id: generateId(),
        type: 'flight',
        referenceId: flightNumber,
        status: 'pending',
      })
      .returning();

    // TODO: Implement actual flight booking logic with external service
    // For now, we'll just return a success message
    return NextResponse.json(
      {
        message: 'Flight booked successfully',
        booking: newBooking[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error booking flight:', error);
    return NextResponse.json(
      { error: 'Failed to book flight' },
      { status: 500 }
    );
  }
}
