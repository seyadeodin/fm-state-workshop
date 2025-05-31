import { db } from '@/db';
import { destinations, itineraries } from '@/db/schema';
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
          {itinerary.name}
        </h1>
        <button className="px-4 py-2 rounded-lg border border-[#f1f2f4] dark:border-gray-700 text-[#121416] dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
          Edit Trip
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-[#121416] dark:text-white mb-2">
            Destinations
          </h2>
          <div className="flex flex-col gap-2">
            <a
              href={`/itinerary/${params.id}/destinations/new`}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Manage Destinations
            </a>
          </div>
          {await db.query.destinations
            .findMany({
              where: eq(destinations.itineraryId, params.id),
              orderBy: (destinations, { asc }) => [
                asc(destinations.arrivalDate),
              ],
            })
            .then((destinations) => (
              <div className="mt-4 flex flex-col gap-3">
                {destinations.map((destination) => (
                  <div
                    key={destination.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="text-[#121416] dark:text-white font-medium">
                        {destination.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {destination.location}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(destination.arrivalDate).toLocaleDateString()}{' '}
                        -{' '}
                        {new Date(
                          destination.departureDate
                        ).toLocaleDateString()}
                      </p>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        destination.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : destination.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : destination.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {destination.status}
                    </span>
                  </div>
                ))}
                {destinations.length === 0 && (
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    No destinations added yet
                  </p>
                )}
              </div>
            ))}
        </div>

        <div className="p-4 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800">
          <h2 className="text-lg font-semibold text-[#121416] dark:text-white mb-2">
            Trip Info
          </h2>
          <div className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-300">
            <p>Trip ID: {itinerary.id}</p>
            {itinerary.description && (
              <p className="mt-2">{itinerary.description}</p>
            )}
            <p>People: {itinerary.people}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
