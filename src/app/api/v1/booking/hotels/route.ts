import { NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { generateId } from '@/db';

// POST /api/v1/booking/hotels
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { hotelId, checkIn, checkOut, guestDetails, itineraryId } = body;

    if (!hotelId || !checkIn || !checkOut || !guestDetails || !itineraryId) {
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
        type: 'hotel',
        referenceId: hotelId,
        status: 'pending',
      })
      .returning();

    // TODO: Implement actual hotel booking logic with external service
    // For now, we'll just return a success message
    return NextResponse.json(
      {
        message: 'Hotel booked successfully',
        booking: newBooking[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error booking hotel:', error);
    return NextResponse.json(
      { error: 'Failed to book hotel' },
      { status: 500 }
    );
  }
}
