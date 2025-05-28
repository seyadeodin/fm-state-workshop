export default function FlightBookingPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#121416] dark:text-white">
          Book Flights
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
              Search Flights
            </h2>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="from"
                  className="text-sm font-medium text-[#121416] dark:text-white"
                >
                  From
                </label>
                <input
                  type="text"
                  id="from"
                  className="px-4 py-2 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#121416] dark:text-white"
                  placeholder="Airport or City"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="to"
                  className="text-sm font-medium text-[#121416] dark:text-white"
                >
                  To
                </label>
                <input
                  type="text"
                  id="to"
                  className="px-4 py-2 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#121416] dark:text-white"
                  placeholder="Airport or City"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="date"
                  className="text-sm font-medium text-[#121416] dark:text-white"
                >
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="px-4 py-2 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#121416] dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="mt-2 px-6 py-2 rounded-lg bg-[#121416] dark:bg-white text-white dark:text-[#121416] font-medium hover:opacity-90 transition-opacity"
              >
                Search Flights
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="p-4 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-[#121416] dark:text-white mb-4">
              Available Flights
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Search for flights to see results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
