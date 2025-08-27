"use client";

import * as React from "react";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Combobox } from "@/components/combobox";
import { locations } from "@/app/locations";
import {
  FormState,
  submitTravelData,
  submitTravelDataBasic,
  type TravelData,
} from "./actions";
import { CheckCircle } from "lucide-react";

const seatPreferences = [
  { value: "window", label: "Window" },
  { value: "aisle", label: "Aisle" },
  { value: "middle", label: "Middle" },
];

type TravelFormData = {
  firstName: string;
  lastName: string;
  birthdate: string;
  passport: string;
  originCity: string;
  seatPreference: string;
};

// type State =
//   | {
//       status: "idle" | "submitting";
//       data: null;
//       errors: {};
//     }
//   | {
//       status: "success";
//       data: TravelData | null;
//     }
//   | {
//       status: "error";
//       errors: Record<string, string>;
//     };

const initialState: FormState = {
  status: "idle",
  data: null,
  errors: {},
};

export default function TravelFormPage() {
  const [state, submitAction, isPending] = React.useActionState(
    submitTravelData,
    initialState
  );
  //const [state, setState] = useState<State>();

  const isSubmitting = isPending;
  const isSuccess = state?.status === "success";

  const errors = state?.status === "error" ? state.errors : {};
  //const [successData, setSuccessData] = useState<TravelData | null>(null);

  // const updateFormField = (field: keyof TravelFormData, value: string) => {
  //   if (state?.status !== "error") return;
  //   //setFormData((prev) => ({ ...prev, [field]: value }));
  //   if (errors[field]) {
  //     setState((prev) => ({
  //       ...prev,
  //       errors: { ...prev.errors, [field]: "" },
  //     }));
  //   }
  // };

  // Handle form submission
  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   const formData = new FormData(e.target);

  //   setState({ status: "submitting" });

  //   try {
  //     // Call simplified server action directly with form data
  //     const result = await submitTravelDataBasic({
  //       firstName: formData.get("firstName")?.toString() ?? "",
  //       lastName: formData.get("lastName")?.toString() ?? "",
  //       birthdate: formData.get("birthDate")?.toString() ?? "",
  //       originCity: formData.get("originCity")?.toString() ?? "",
  //       passport: formData.get("passaport")?.toString() ?? "",
  //       seatPreference: formData.get("seatPreference")?.toString() ?? "",
  //     });
  //     console.log("🚀 ~ handleSubmit ~ result:", result);

  //     if (result.status === "success") {
  //       setState({ status: "success", data: result.data });
  //     } else if (result.status === "error") {
  //       setState({
  //         status: "error",
  //         errors: {},
  //       });
  //     }
  //   } catch {
  //     setState({
  //       status: "error",
  //       errors: { general: "An unexpected error occurred. Please try again." },
  //     });
  //   }
  // };

  // Reset form

  // Success screen
  if (isSuccess && state.data) {
    return (
      <div className="max-w-2xl w-full mx-auto min-h-screen p-6">
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
                  <Label>Name:</Label>
                  {state.data.firstName} {state.data.lastName}
                </div>
                <div>
                  <Label>Birth Date:</Label>
                  {state.data.birthdate}
                </div>
                <div>
                  <Label>Passport:</Label>
                  {state.data.passport}
                </div>
                <div>
                  <Label>Origin:</Label>
                  {
                    locations.find(
                      (loc) => loc.value === state.data?.originCity
                    )?.label
                  }
                </div>
                <div className="md:col-span-2">
                  <Label>Seat Preference:</Label>
                  {
                    seatPreferences.find(
                      (seat) => seat.value === state.data?.seatPreference
                    )?.label
                  }
                </div>
              </div>
            </div>
            <Button type="reset" className="w-full" variant="outline">
              Submit Another Form
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-2xl w-full mx-auto min-h-screen p-6">
      <Card>
        <CardHeader>
          <CardTitle>Travel Information Form</CardTitle>
          <CardDescription>
            Please provide your travel details for booking confirmation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            //onSubmit={handleSubmit}
            action={submitAction}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  placeholder="Enter your first name"
                  aria-invalid={errors.firstName ? "true" : "false"}
                  disabled={isSubmitting}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  placeholder="Enter your last name"
                  aria-invalid={errors.lastName ? "true" : "false"}
                  disabled={isSubmitting}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-600 dark:text-red-400">
                    {errors.lastName}
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
                aria-invalid={errors.birthdate ? "true" : "false"}
                disabled={isSubmitting}
              />
              {errors.birthdate && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.birthdate}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="passport">Passport Number *</Label>
              <Input
                id="passport"
                name="passport"
                type="text"
                placeholder="Enter your passport number"
                aria-invalid={errors.passport ? "true" : "false"}
                disabled={isSubmitting}
              />
              {errors.passport && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.passport}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="originCity">Origin City *</Label>
              <Combobox
                options={locations}
                name="originCity"
                placeholder="Select your departure city"
              />
              {errors.originCity && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.originCity}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="seatPreference">Seat Preference *</Label>
              <Combobox
                options={seatPreferences}
                name="seatPreference"
                placeholder="Select your seat preference"
              />
              {errors.seatPreference && (
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.seatPreference}
                </p>
              )}
            </div>

            {errors.general && (
              <div className="p-4 bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-800 rounded-md">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {errors.general}
                </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
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
                "Submit Travel Information"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
