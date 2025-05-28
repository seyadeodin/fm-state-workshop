import { db } from '@/db';
import { itineraries } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export default async function ItineraryPage({
  params,
}: {
  params: { id: string };
}) {
  const itinerary = await db.query.itineraries.findFirst({
    where: eq(itineraries.id, params.id),
  });

  if (!itinerary) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#121416] dark:text-white">
          {itinerary.title}
        </h1>
        <button className="px-4 py-2 rounded-lg border border-[#f1f2f4] dark:border-gray-700 text-[#121416] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          Edit Trip
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-[#121416] dark:text-white mb-2">
            Bookings
          </h2>
          <div className="flex flex-col gap-2">
            <a
              href={`/itinerary/${params.id}/book/flights`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Book Flights
            </a>
            <a
              href={`/itinerary/${params.id}/book/hotels`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Book Hotels
            </a>
            <a
              href={`/itinerary/${params.id}/book/cars`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Book Cars
            </a>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-[#121416] dark:text-white mb-2">
            Destinations
          </h2>
          <div className="flex flex-col gap-2">
            <a
              href={`/itinerary/${params.id}/destinations`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Manage Destinations
            </a>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-[#121416] dark:text-white mb-2">
            Trip Info
          </h2>
          <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <p>Trip ID: {itinerary.id}</p>
            <p>Start Date: {itinerary.startDate}</p>
            <p>End Date: {itinerary.endDate}</p>
            {itinerary.description && (
              <p className="mt-2">{itinerary.description}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
