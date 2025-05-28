export default function HotelBookingPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#121416] dark:text-white">
          Book Hotels
        </h1>
        <a
          href={`/itinerary/${params.id}`}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          Back to Trip
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <div className="p-4 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-[#121416] dark:text-white mb-4">
              Search Hotels
            </h2>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="location"
                  className="text-sm font-medium text-[#121416] dark:text-white"
                >
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="px-4 py-2 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#121416] dark:text-white"
                  placeholder="City, Hotel, or Area"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="checkIn"
                  className="text-sm font-medium text-[#121416] dark:text-white"
                >
                  Check-in Date
                </label>
                <input
                  type="date"
                  id="checkIn"
                  className="px-4 py-2 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#121416] dark:text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="checkOut"
                  className="text-sm font-medium text-[#121416] dark:text-white"
                >
                  Check-out Date
                </label>
                <input
                  type="date"
                  id="checkOut"
                  className="px-4 py-2 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#121416] dark:text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="guests"
                  className="text-sm font-medium text-[#121416] dark:text-white"
                >
                  Guests
                </label>
                <select
                  id="guests"
                  className="px-4 py-2 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#121416] dark:text-white"
                >
                  <option value="1">1 Guest</option>
                  <option value="2">2 Guests</option>
                  <option value="3">3 Guests</option>
                  <option value="4">4 Guests</option>
                </select>
              </div>
              <button
                type="submit"
                className="mt-2 px-6 py-2 rounded-lg bg-[#121416] dark:bg-white text-white dark:text-[#121416] font-medium hover:opacity-90 transition-opacity"
              >
                Search Hotels
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="p-4 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-[#121416] dark:text-white mb-4">
              Available Hotels
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Search for hotels to see results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
