export default function CarBookingPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#121416] dark:text-white">
          Book Cars
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
              Search Cars
            </h2>
            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="location"
                  className="text-sm font-medium text-[#121416] dark:text-white"
                >
                  Pick-up Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="px-4 py-2 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#121416] dark:text-white"
                  placeholder="Airport, City, or Address"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="pickupDate"
                  className="text-sm font-medium text-[#121416] dark:text-white"
                >
                  Pick-up Date
                </label>
                <input
                  type="date"
                  id="pickupDate"
                  className="px-4 py-2 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#121416] dark:text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="dropoffDate"
                  className="text-sm font-medium text-[#121416] dark:text-white"
                >
                  Drop-off Date
                </label>
                <input
                  type="date"
                  id="dropoffDate"
                  className="px-4 py-2 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#121416] dark:text-white"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="carType"
                  className="text-sm font-medium text-[#121416] dark:text-white"
                >
                  Car Type
                </label>
                <select
                  id="carType"
                  className="px-4 py-2 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800 text-[#121416] dark:text-white"
                >
                  <option value="economy">Economy</option>
                  <option value="compact">Compact</option>
                  <option value="midsize">Midsize</option>
                  <option value="suv">SUV</option>
                  <option value="luxury">Luxury</option>
                </select>
              </div>
              <button
                type="submit"
                className="mt-2 px-6 py-2 rounded-lg bg-[#121416] dark:bg-white text-white dark:text-[#121416] font-medium hover:opacity-90 transition-opacity"
              >
                Search Cars
              </button>
            </form>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="p-4 rounded-lg border border-[#f1f2f4] dark:border-gray-700 bg-white dark:bg-gray-800">
            <h2 className="text-lg font-semibold text-[#121416] dark:text-white mb-4">
              Available Cars
            </h2>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Search for cars to see results
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
