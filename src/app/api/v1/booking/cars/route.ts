import { NextResponse } from 'next/server';
import { db } from '@/db';
import { bookings } from '@/db/schema';
import { generateId } from '@/db';

// POST /api/v1/booking/cars
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { carId, pickupDate, returnDate, driverDetails, itineraryId } = body;

    if (
      !carId ||
      !pickupDate ||
      !returnDate ||
      !driverDetails ||
      !itineraryId
    ) {
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
        type: 'car',
        referenceId: carId,
        status: 'pending',
      })
      .returning();

    // TODO: Implement actual car booking logic with external service
    // For now, we'll just return a success message
    return NextResponse.json(
      {
        message: 'Car booked successfully',
        booking: newBooking[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error booking car:', error);
    return NextResponse.json({ error: 'Failed to book car' }, { status: 500 });
  }
}
