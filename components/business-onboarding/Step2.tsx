"use client";

import { useEffect, useState, useCallback } from "react";
import { useFormContext, Controller } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Autocomplete, useLoadScript, Libraries } from "@react-google-maps/api";
import { Label } from "@/components/ui/label";

// Add type declaration for window.google
declare global {
  interface Window {
    google?: {
      maps?: any;
    };
  }
}

// Define libraries with the correct type
const libraries: Libraries = ['places'];

const Step2 = () => {
  const { control, setValue, register, watch } = useFormContext();
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [useManualInput, setUseManualInput] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  
  // Use the useLoadScript hook instead of LoadScript component
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  // Monitor for runtime errors with the Places API
  useEffect(() => {
    const handleApiError = (event: ErrorEvent) => {
      if (event.message && (
        event.message.includes("Google Maps API") || 
        event.message.includes("google is not defined") ||
        event.message.includes("ApiTargetBlockedMapError")
      )) {
        console.error("Google Maps runtime error:", event.message);
        setApiError(event.message);
        setUseManualInput(true);
      }
    };

    window.addEventListener('error', handleApiError);
    
    return () => {
      window.removeEventListener('error', handleApiError);
    };
  }, []);

  // Configure autocomplete when it's loaded
  const onAutocompleteLoad = useCallback((autocomplete: google.maps.places.Autocomplete) => {
    setAutocomplete(autocomplete);
    
    // Set options to prevent early prediction while typing
    if (autocomplete) {
      // Only start predictions after 4 characters
      autocomplete.setOptions({
        types: ['address'],
        fields: ['formatted_address', 'geometry.location']
      });
    }
  }, []);

  const handlePlaceSelect = () => {
    try {
      if (autocomplete) {
        const place = autocomplete.getPlace();
        if (place && place.formatted_address) {
          setValue("address", place.formatted_address);
          setValue("latitude", place.geometry?.location?.lat() || 0);
          setValue("longitude", place.geometry?.location?.lng() || 0);
        }
      }
    } catch (error) {
      console.error("Error selecting place:", error);
      setApiError(error instanceof Error ? error.message : "Unknown error");
      setUseManualInput(true);
    }
  };

  const handleManualAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue("address", e.target.value);
    // Set default coordinates for manual input
    setValue("latitude", 0);
    setValue("longitude", 0);
  };

  // Debounce input to prevent API errors during typing
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, onChange: (...event: any[]) => void) => {
    setIsTyping(true);
    onChange(e);
    
    // Clear the typing state after a delay
    setTimeout(() => {
      setIsTyping(false);
    }, 500);
  };

  // Show manual input if there's an error or user chooses to use manual input
  if (loadError || apiError || useManualInput) {
    return (
      <div className="space-y-6">
        {(loadError || apiError) && (
          <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            <p className="font-medium">Error with Google Maps API:</p>
            <p>{loadError?.message || apiError}</p>
            <p className="mt-2">
              Using manual address input instead. Please enter your business address below.
            </p>
          </div>
        )}
        
        <Label className="block text-lg font-semibold">Address</Label>
        <div className="space-y-4">
          <Label>Street Address</Label>
          <Input {...register("streetAddress")} placeholder="Enter street address" />
        </div>
        <Label>Apartment, Suite, etc. (optional)</Label>
        <Input {...register("unit")} placeholder="Apartment, suite, etc." />
        
        <Label>City</Label>
        <Input {...register("city")} placeholder="City" />
        
        <Label>State</Label>
        <select {...register("state")} className="border rounded p-2">
          <option value="">Select State</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        
        <Label>ZIP / Postal Code</Label>
        <Input {...register("postalCode")} placeholder="ZIP / Postal code" />
        
        <Label>Country</Label>
        <Input {...register("country")} placeholder="United States" disabled />
      </div>
    );
  }

  if (!isLoaded) {
    return <div>Loading Google Maps...</div>;
  }

  return (
    <div className="space-y-6">
      <Label>Business Address</Label>
      <Autocomplete 
        onLoad={onAutocompleteLoad} 
        onPlaceChanged={handlePlaceSelect}
        options={{
          types: ['address'],
          fields: ['formatted_address', 'geometry.location']
        }}
      >
        <Controller
          name="address"
          control={control}
          render={({ field }) => (
            <Input 
              {...field} 
              placeholder="Search for your business address" 
              onChange={(e) => handleInputChange(e, field.onChange)}
              autoComplete="off"
            />
          )}
        />
      </Autocomplete>
      
      <button
        type="button"
        onClick={() => setUseManualInput(true)}
        className="text-sm text-blue-600 hover:text-blue-800 mt-2"
      >
        Having trouble? Switch to manual input
      </button>
    </div>
  );
};

export default Step2;