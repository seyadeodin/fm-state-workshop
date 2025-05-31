import { createDestination } from './actions';

export default function NewDestinationPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <form
      action={createDestination}
      className="flex flex-col gap-6 max-w-2xl mx-auto"
    >
      <input type="hidden" name="itineraryId" value={params.id} />
      <div className="layout-content-container flex flex-col w-[512px] max-w-[512px] py-5 max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-[#121416] dark:text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            New destination
          </p>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#121416] dark:text-white text-base font-medium leading-normal pb-2">
              Name
            </p>
            <input
              name="name"
              placeholder="Name"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] dark:bg-gray-800 focus:border-none h-14 placeholder:text-[#6a7681] dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#121416] dark:text-white text-base font-medium leading-normal pb-2">
              Location
            </p>
            <input
              name="location"
              placeholder="Location"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] dark:bg-gray-800 focus:border-none h-14 placeholder:text-[#6a7681] dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#121416] dark:text-white text-base font-medium leading-normal pb-2">
              Arrival Date
            </p>
            <input
              name="arrivalDate"
              type="date"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] dark:bg-gray-800 focus:border-none h-14 placeholder:text-[#6a7681] dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
            />
          </label>
        </div>
        <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
          <label className="flex flex-col min-w-40 flex-1">
            <p className="text-[#121416] dark:text-white text-base font-medium leading-normal pb-2">
              Departure Date
            </p>
            <input
              name="departureDate"
              type="date"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] dark:text-white focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] dark:bg-gray-800 focus:border-none h-14 placeholder:text-[#6a7681] dark:placeholder:text-gray-400 p-4 text-base font-normal leading-normal"
            />
          </label>
        </div>
        <div className="flex px-4 py-3 justify-end">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#dce8f3] dark:bg-gray-700 text-[#121416] dark:text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Create</span>
          </button>
        </div>
      </div>
    </form>
  );
}
