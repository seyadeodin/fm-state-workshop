'use client';

import * as React from 'react';
import { useActionState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Combobox } from '@/components/combobox';
import { locations } from '@/app/locations';
import { submitTravelData, type FormState } from './actions';
import { CheckCircle } from 'lucide-react';

const seatPreferences = [
  { value: 'window', label: 'Window' },
  { value: 'aisle', label: 'Aisle' },
  { value: 'middle', label: 'Middle' },
];

const initialState: FormState = {
  status: 'idle',
  errors: {},
  data: null,
};

export default function TravelFormPage() {
  const [state, submitAction, isPending] = useActionState(
    submitTravelData,
    initialState
  );

  if (state.status === 'success') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-800">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <CheckCircle className="h-16 w-16 text-green-600" />
              </div>
              <CardTitle className="text-green-800 dark:text-green-200">
                Travel Data Saved Successfully!
              </CardTitle>
              <CardDescription className="text-green-700 dark:text-green-300">
                Your travel information has been securely stored.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border">
                <h3 className="font-semibold mb-3 text-gray-900 dark:text-gray-100">
                  Submitted Information:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Name:
                    </span>{' '}
                    {state.data?.firstName} {state.data?.lastName}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Birth Date:
                    </span>{' '}
                    {state.data?.birthdate}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Passport:
                    </span>{' '}
                    {state.data?.passport}
                  </div>
                  <div>
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Origin:
                    </span>{' '}
                    {
                      locations.find(
                        (loc) => loc.value === state.data?.originCity
                      )?.label
                    }
                  </div>
                  <div className="md:col-span-2">
                    <span className="font-medium text-gray-600 dark:text-gray-400">
                      Seat Preference:
                    </span>{' '}
                    {
                      seatPreferences.find(
                        (seat) => seat.value === state.data?.seatPreference
                      )?.label
                    }
                  </div>
                </div>
              </div>
              <Button
                onClick={() => window.location.reload()}
                className="w-full"
                variant="outline"
              >
                Submit Another Form
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-6">
      <div className="max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Travel Information Form</CardTitle>
            <CardDescription>
              Please provide your travel details for booking confirmation.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={submitAction} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    type="text"
                    defaultValue={state.submittedData?.firstName || ''}
                    placeholder="Enter your first name"
                    aria-invalid={state.errors?.firstName ? 'true' : 'false'}
                    disabled={isPending}
                  />
                  {state.errors?.firstName && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {state.errors.firstName}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    name="lastName"
                    type="text"
                    defaultValue={state.submittedData?.lastName || ''}
                    placeholder="Enter your last name"
                    aria-invalid={state.errors?.lastName ? 'true' : 'false'}
                    disabled={isPending}
                  />
                  {state.errors?.lastName && (
                    <p className="text-sm text-red-600 dark:text-red-400">
                      {state.errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthdate">Birth Date *</Label>
                <Input
                  id="birthdate"
                  name="birthdate"
                  type="date"
                  defaultValue={state.submittedData?.birthdate || ''}
                  aria-invalid={state.errors?.birthdate ? 'true' : 'false'}
                  disabled={isPending}
                />
                {state.errors?.birthdate && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {state.errors.birthdate}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="passport">Passport Number *</Label>
                <Input
                  id="passport"
                  name="passport"
                  type="text"
                  defaultValue={state.submittedData?.passport || ''}
                  placeholder="Enter your passport number"
                  aria-invalid={state.errors?.passport ? 'true' : 'false'}
                  disabled={isPending}
                />
                {state.errors?.passport && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {state.errors.passport}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="originCity">Origin City *</Label>
                <Combobox
                  options={locations}
                  value={state.submittedData?.originCity || ''}
                  name="originCity"
                  placeholder="Select your departure city"
                />
                {state.errors?.originCity && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {state.errors.originCity}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="seatPreference">Seat Preference *</Label>
                <Combobox
                  options={seatPreferences}
                  value={state.submittedData?.seatPreference || ''}
                  name="seatPreference"
                  placeholder="Select your seat preference"
                />
                {state.errors?.seatPreference && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {state.errors.seatPreference}
                  </p>
                )}
              </div>

              {state.status === 'error' && state.errors?.general && (
                <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md">
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {state.errors.general}
                  </p>
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Submitting...
                  </>
                ) : (
                  'Submit Travel Information'
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
