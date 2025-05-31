import { db } from '@/db';
import { destinations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';

export default async function DestinationPage({
  params,
}: {
  params: { id: string; destinationId: string };
}) {
  const destination = await db.query.destinations.findFirst({
    where: eq(destinations.id, params.destinationId),
  });

  if (!destination) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#121416] dark:text-white">
          {destination.name}
        </h1>
        <button className="px-4 py-2 rounded-lg border border-[#f1f2f4] dark:border-gray-700 text-[#121416] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          Edit Destination
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-[#121416] dark:text-white mb-2">
            Location
          </h2>
          <p className="text-[#121416] dark:text-white">
            {destination.location}
          </p>
        </div>

        <div className="p-4 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-[#121416] dark:text-white mb-2">
            Dates
          </h2>
          <p className="text-[#121416] dark:text-white">
            Arrival: {new Date(destination.arrivalDate).toLocaleDateString()}
          </p>
          <p className="text-[#121416] dark:text-white">
            Departure:{' '}
            {new Date(destination.departureDate).toLocaleDateString()}
          </p>
        </div>

        <div className="p-4 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-[#121416] dark:text-white mb-2">
            Bookings
          </h2>
          <div className="flex flex-col gap-2">
            <a
              href={`/itinerary/${params.id}/destinations/${params.destinationId}/flight`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Book Flight
            </a>
            <a
              href={`/itinerary/${params.id}/destinations/${params.destinationId}/hotel`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Book Hotel
            </a>
            <a
              href={`/itinerary/${params.id}/destinations/${params.destinationId}/car`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Book Car
            </a>
          </div>
        </div>

        <div className="p-4 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-[#121416] dark:text-white mb-2">
            Reviews
          </h2>
          <a
            href={`/itinerary/${params.id}/destinations/${params.destinationId}/review`}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Reviews
          </a>
        </div>
      </div>
    </div>
  );
}
