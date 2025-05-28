export default function NewItineraryPage() {
  return (
    <div className="flex flex-col gap-6 max-w-2xl mx-auto">
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-gray-900 dark:text-gray-100 tracking-light text-[32px] font-bold leading-tight min-w-72">
          Create a new trip
        </p>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-gray-900 dark:text-gray-100 text-base font-medium leading-normal pb-2">
            Trip name
          </p>
          <input
            placeholder="Name your trip"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-gray-100 focus:outline-0 focus:ring-0 border-none bg-gray-100 dark:bg-gray-800 focus:border-none h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
            value=""
          />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-gray-900 dark:text-gray-100 text-base font-medium leading-normal pb-2">
            Destination
          </p>
          <input
            placeholder="Where are you going?"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-gray-100 focus:outline-0 focus:ring-0 border-none bg-gray-100 dark:bg-gray-800 focus:border-none h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
            value=""
          />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-gray-900 dark:text-gray-100 text-base font-medium leading-normal pb-2">
            Start date
          </p>
          <input
            placeholder="Select date"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-gray-100 focus:outline-0 focus:ring-0 border-none bg-gray-100 dark:bg-gray-800 focus:border-none h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
            value=""
          />
        </label>
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-gray-900 dark:text-gray-100 text-base font-medium leading-normal pb-2">
            End date
          </p>
          <input
            placeholder="Select date"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-gray-100 focus:outline-0 focus:ring-0 border-none bg-gray-100 dark:bg-gray-800 focus:border-none h-14 placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
            value=""
          />
        </label>
      </div>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <p className="text-gray-900 dark:text-gray-100 text-base font-medium leading-normal pb-2">
            Purpose of travel
          </p>
          <select className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-gray-900 dark:text-gray-100 focus:outline-0 focus:ring-0 border-none bg-gray-100 dark:bg-gray-800 focus:border-none h-14 bg-[image:--select-button-svg] placeholder:text-gray-500 dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal">
            <option value="one"></option>
            <option value="two">two</option>
            <option value="three">three</option>
          </select>
        </label>
      </div>
      <div className="flex px-4 py-3">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="truncate">Create trip</span>
        </button>
      </div>
    </div>
  );
}
