import { db } from '@/db';
import { destinations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { confirmBooking } from './actions';

type Flight = {
  airline: string;
  departureTime: string;
  arrivalTime: string;
};

type Hotel = {
  name: string;
  checkIn: string;
  checkOut: string;
};

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ id: string; destinationId: string }>;
}) {
  const { id, destinationId } = await params;
  const destination = await db.query.destinations.findFirst({
    where: eq(destinations.id, destinationId),
    with: {
      flightBookings: true,
      hotelBookings: true,
    },
  });

  if (!destination) {
    notFound();
  }

  console.log({ destination });

  const flight = destination.flightBookings[0] as Flight | undefined;
  const hotel = destination.hotelBookings[0] as Hotel | undefined;

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="flex flex-wrap gap-2 p-4">
        <a
          className="text-[#60768a] dark:text-[#8b9bab] text-base font-medium leading-normal"
          href={`/itinerary/${id}`}
        >
          Your trip
        </a>
        <span className="text-[#60768a] dark:text-[#8b9bab] text-base font-medium leading-normal">
          /
        </span>
        <span className="text-[#111518] dark:text-white text-base font-medium leading-normal">
          Review and book
        </span>
      </div>
      <div className="flex flex-wrap justify-between gap-3 p-4">
        <p className="text-[#111518] dark:text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
          Review and book
        </p>
      </div>
      <h2 className="text-[#111518] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Flights
      </h2>
      <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-xl">
          <div className="flex flex-col gap-1 flex-[2_2_0px]">
            <p className="text-[#60768a] dark:text-[#8b9bab] text-sm font-normal leading-normal">
              Round trip
            </p>
            <p className="text-[#111518] dark:text-white text-base font-bold leading-tight">
              {flight?.airline || 'No flight selected'}
            </p>
            <p className="text-[#60768a] dark:text-[#8b9bab] text-sm font-normal leading-normal">
              {flight
                ? `${flight.departureTime} - ${flight.arrivalTime}`
                : 'No flight details'}
            </p>
          </div>
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD77Czg7MXp6v4I117l-gqSOAYTOdKYHoVhKLxUm_NbGA3L9LspJ-qPthIEOh413-Vvozo7yuZ_i1hi3U5KzvK7QNvsTRjnX9XnpZnu46qzmx4UrGyM0qlTM8HxvLRFxQoN6xx7WnamimurLyzsUWXI4gfJJPgtj6UaDtsqkXx07nQne5ThuM9Ree6BZ76OSLu2ukhRb2OmBmqK9iHOW4ANFAhH1aF2-5A61RWSNPrvnC-9Kqk0paqBrg3liSDEI59T9miAnRecyIM")',
            }}
          ></div>
        </div>
      </div>
      <h2 className="text-[#111518] dark:text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Hotel
      </h2>
      <div className="p-4">
        <div className="flex items-stretch justify-between gap-4 rounded-xl">
          <div className="flex flex-col gap-1 flex-[2_2_0px]">
            <p className="text-[#111518] dark:text-white text-base font-bold leading-tight">
              {hotel?.name || 'No hotel selected'}
            </p>
            <p className="text-[#60768a] dark:text-[#8b9bab] text-sm font-normal leading-normal">
              {hotel
                ? `${hotel.checkIn} - ${hotel.checkOut}`
                : 'No hotel details'}
            </p>
          </div>
          <div
            className="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBrhcQ-yN96Hu15JT83oXSe9vKUCgUaC-9qRdvMNIka0ve69aU9GS14L0dgkxX9bheVA6qOjSSQ7CDFPXGXbUa-ulS09JNCkSrxhRvTeSLYUeV31qNBawWwsnT-qYzlXKanSh-FfPpc1AztlTGBnEjkIjXwDTYcFoyXCgG3Q8CAMKxjMTIzfcQmQORx1kkwRgpxk8TZnd-gWh7DZiLenE7uRjw9qFuQwrB-uTfWG6vJFJUfIR9CieEPMYxyAzgJQ-3egFhTk0_y6p4")',
            }}
          ></div>
        </div>
      </div>
      <form
        action={async () => {
          'use server';
          await confirmBooking(destinationId, id);
        }}
        className="flex px-4 py-3 justify-end"
      >
        <button
          type="submit"
          className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#0b80ee] text-white text-base font-bold leading-normal tracking-[0.015em]"
        >
          <span className="truncate">Book</span>
        </button>
      </form>
    </div>
  );
}
