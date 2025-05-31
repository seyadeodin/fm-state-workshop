import { db } from '@/db';
import { destinations } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { selectFlight } from './actions';

export default async function FlightBookingPage({
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

  const flights = [
    {
      airline: 'United Airlines',
      price: 250,
      departureTime: '10:00 AM',
      arrivalTime: '1:00 PM',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB87V0vd_hWKBOig2cwShQvyW5qXJc7MhZrpjxSZ5ibN9vlqiZCRBnRrQx3DEgojB2vENE7eXzJ6NWa4Ar8lnj4GXePrdHV5eFKvjT0TA0lUsiEs9aBUBtiiqbX3_buzFhJ0B6mzRo5R_Ai7YtQbiS4MGXrLRHKim8xzjQVBIEg4jWLWmJDWwvfrWuh6qyqd4inl6KSkc5gmHZHRDIiQzeBTraecvsJf0__H-_gdfE-Pu4a3V3JDgHMUB2CMTxKW3hn7EdBW8GHRyo',
    },
    {
      airline: 'American Airlines',
      price: 275,
      departureTime: '11:00 AM',
      arrivalTime: '2:00 PM',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBxXxWWDIwvJeozHSllF_X0iqbqPWP2XR-ZZuXiN723eynXfg3H7WtCKNf_PnYGpLSftKm4CdSImxYy1od4xDOK9nNRoNxZ4lCHXCYMGsjhVKuuOOx-UqJ1gdSKd1DJ1PCpn8Opim9kCFnslivqQfnr-CcIHdHUmqxX0Ix36j8Vmj9cRg-k9UaWKQehIyzBQ-WzxW8gVddSIeG1kw7yFJDX_d7VgI43Ed91AB_QeAKEt1PprH7xmY5jU0uXBTDZ77Dd9LiP9XdulgM',
    },
    {
      airline: 'Delta Airlines',
      price: 300,
      departureTime: '12:00 PM',
      arrivalTime: '3:00 PM',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAsAYd9_EZMa1HcWbT3JSw5IK27MvfsMaJNU0JOVv_xKwbP21eZpzh5k_5m2IIcxjxCjaUKxZOlBHdgH0rj54H0E5zji_yac4TmgiY7j2E3LolhHItVjwjRwWD2p_7aad6z-4uzPy-27dxtfa97SKdRDVOlg_v7lGoy2vhvXycb5jDQ3xSXcwe4kERhOsDGIZW2mUABS9qBD7zVw3GPjgYCyUvYnyHrthpEsdnUsryxXmufeU9eiTEXpnAXwG4I5KeGHuIbyJc2SFE',
    },
    {
      airline: 'Southwest Airlines',
      price: 325,
      departureTime: '1:00 PM',
      arrivalTime: '4:00 PM',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuC7KTcNv9fX5o9LyEFk_CY6Zjn9eI43AULEwAJQquQRUKan1UOUq2RtZBw1O-_q6rmYPZ4onARsDqe76xgsx22etlkKA_cM4oi1BF6VOKRIJJzGOJ2PfRHy_BEE30IFRMUbkLdG1xzuQCHg4AOfx9eu28N0w4M1EXIPSc0z-PuE6NGHpt3AT7T_Ro-Ulrn9AiJkewKhblNohBC0WP0pf2mxeuAWYcvjaMpUHwJJ6Hg1djjAszOxTmviVGBzHtpzbEqOhZaf_xZ6Hfc',
    },
    {
      airline: 'Alaska Airlines',
      price: 350,
      departureTime: '2:00 PM',
      arrivalTime: '5:00 PM',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuAdaPb7yLOEiaWgHx21sg2DKkgfDNpISXBhP1CBKlHXPOcZLCsqS5oaWUTYpnd-sZ8xsi0UoqbN1xrJKI6Td5ExlGSUEzcjMr1xMtS4-Pk3UOCO1Fv4mT-JYhCmV6gid7nPvHYB2dCY8bl56xTDZbZouLC49ZgYMSSBS8waapAMsVC3CdFAtBDUYqIGdEiGG0a7alR2vsAkMQ9Wxzyp51mbFhVM3_klPboUYA2B_XTkZkJ8V931TlEZqSiEBiRKWchQocPUuOQlL_U',
    },
    {
      airline: 'JetBlue Airways',
      price: 375,
      departureTime: '3:00 PM',
      arrivalTime: '6:00 PM',
      image:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDwUlYstn8Vy3I1OIGDUKI1O6J0ZGnJ9Qs0ckHIGUXCvXu-9pzlTwm13Shyiw0FVoXA83ES88-DTD1Ho2DUmL2n6cbtPFNbOCHfg6cnDaB-yaYHPotAFxs4LvjqtKzu1zv-0gxWEF7ZqbJNMyaqEO9-5ml97xMvodl2jJMkCC2pDgIJpkokoKkph0yDyC7I5ZMSlk5R8FZBWJYNFTSqFJ-aOPJgyx0Tk6h_M7U9F594BcimueaPsBttfK1L78m3HZJmepzQDCLy8do',
    },
  ];

  return (
    <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
      <div className="px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#6a7681] flex border-none bg-[#f1f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] focus:border-none h-full placeholder:text-[#6a7681] px-4 rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              placeholder="From"
            />
            <div className="flex items-center justify-center rounded-r-xl border-l-0 border-none bg-[#f1f2f4] pr-2 pr-4">
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-[#121416] gap-2 text-base font-bold leading-normal tracking-[0.015em] h-auto min-w-0 px-0">
                <div className="text-[#6a7681]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </label>
      </div>

      <div className="px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#6a7681] flex border-none bg-[#f1f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] focus:border-none h-full placeholder:text-[#6a7681] px-4 rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              placeholder="To"
              defaultValue={destination.location}
            />
            <div className="flex items-center justify-center rounded-r-xl border-l-0 border-none bg-[#f1f2f4] pr-2 pr-4">
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-[#121416] gap-2 text-base font-bold leading-normal tracking-[0.015em] h-auto min-w-0 px-0">
                <div className="text-[#6a7681]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </label>
      </div>

      <div className="px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#6a7681] flex border-none bg-[#f1f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              type="date"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] focus:border-none h-full placeholder:text-[#6a7681] px-4 rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              defaultValue={destination.arrivalDate}
            />
            <div className="flex items-center justify-center rounded-r-xl border-l-0 border-none bg-[#f1f2f4] pr-2 pr-4">
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-[#121416] gap-2 text-base font-bold leading-normal tracking-[0.015em] h-auto min-w-0 px-0">
                <div className="text-[#6a7681]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </label>
      </div>

      <div className="px-4 py-3">
        <label className="flex flex-col min-w-40 h-12 w-full">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#6a7681] flex border-none bg-[#f1f2f4] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#121416] focus:outline-0 focus:ring-0 border-none bg-[#f1f2f4] focus:border-none h-full placeholder:text-[#6a7681] px-4 rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
              placeholder="1 adult"
            />
            <div className="flex items-center justify-center rounded-r-xl border-l-0 border-none bg-[#f1f2f4] pr-2 pr-4">
              <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full bg-transparent text-[#121416] gap-2 text-base font-bold leading-normal tracking-[0.015em] h-auto min-w-0 px-0">
                <div className="text-[#6a7681]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24px"
                    height="24px"
                    fill="currentColor"
                    viewBox="0 0 256 256"
                  >
                    <path d="M165.66,101.66,139.31,128l26.35,26.34a8,8,0,0,1-11.32,11.32L128,139.31l-26.34,26.35a8,8,0,0,1-11.32-11.32L116.69,128,90.34,101.66a8,8,0,0,1,11.32-11.32L128,116.69l26.34-26.35a8,8,0,0,1,11.32,11.32ZM232,128A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </label>
      </div>

      <div className="flex px-4 py-3 justify-end">
        <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-4 bg-[#dce8f3] text-[#121416] text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="truncate">Search</span>
        </button>
      </div>

      <h2 className="text-[#121416] text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">
        Best flights
      </h2>

      {flights.map((flight) => (
        <form
          key={flight.airline}
          action={async () => {
            'use server';
            await selectFlight(params.id, params.destinationId, {
              airline: flight.airline,
              price: flight.price,
              departureTime: flight.departureTime,
              arrivalTime: flight.arrivalTime,
            });
          }}
        >
          <button className="w-full">
            <div className="flex items-center gap-4 bg-white px-4 min-h-[72px] py-2 justify-between hover:bg-gray-50">
              <div className="flex items-center gap-4">
                <div
                  className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-14"
                  style={{ backgroundImage: `url("${flight.image}")` }}
                ></div>
                <div className="flex flex-col justify-center">
                  <p className="text-[#121416] text-base font-medium leading-normal line-clamp-1">
                    {flight.airline}
                  </p>
                  <p className="text-[#6a7681] text-sm font-normal leading-normal line-clamp-2">
                    {flight.departureTime} - {flight.arrivalTime}
                  </p>
                </div>
              </div>
              <div className="shrink-0">
                <p className="text-[#121416] text-base font-normal leading-normal">
                  ${flight.price}
                </p>
              </div>
            </div>
          </button>
        </form>
      ))}
    </div>
  );
}
