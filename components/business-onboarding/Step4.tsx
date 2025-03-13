"use client";

import { useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { useEffect, useRef } from "react";
import { Clock } from "lucide-react";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select";
import { 
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

// Group days for better organization
const dayGroups = {
    weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    weekend: ["Saturday", "Sunday"]
};

// Time options for select
const timeOptions = [
    "12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM", "03:00 AM", "03:30 AM",
    "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM",
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
    "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",
];

// Preset hour templates (in 24-hour format)
const hourPresets = {
    standard: { open: "09:00", close: "17:00" },
    extended: { open: "08:00", close: "22:00" },
    late: { open: "11:00", close: "23:00" },
    earlyBird: { open: "06:00", close: "15:00" }
};

// Define types for hours
interface TimeRange {
    open: string;
    close: string;
}

interface BusinessHours {
    [day: string]: TimeRange | null;
}

// Convert 12-hour format to 24-hour format for storage
const convertTo24Hour = (time12h: string) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');

    if (hours === '12') {
        hours = modifier === 'AM' ? '00' : '12';
    } else if (modifier === 'PM') {
        hours = String(parseInt(hours, 10) + 12);
    }

    return `${hours.padStart(2, '0')}:${minutes}`;
};

// Convert 24-hour format to 12-hour format for display
const convertTo12Hour = (time24h: string) => {
    if (!time24h) return "09:00 AM";

    const [hours, minutes] = time24h.split(':');
    const hour = parseInt(hours, 10);

    if (hour === 0) {
        return `12:${minutes} AM`;
    } else if (hour < 12) {
        return `${hour.toString().padStart(2, '0')}:${minutes} AM`;
    } else if (hour === 12) {
        return `12:${minutes} PM`;
    } else {
        return `${(hour - 12).toString().padStart(2, '0')}:${minutes} PM`;
    }
};

const Step4 = () => {
    const { setValue, watch, getValues, trigger } = useFormContext();
    const hours = watch("hours") as BusinessHours || {};
    const cleanupDoneRef = useRef(false);

    // Initialize hours with default values if empty
    useEffect(() => {
        if (Object.keys(hours).length === 0) {
            const defaultHours: BusinessHours = {};
            daysOfWeek.forEach(day => {
                defaultHours[day] = null; // All days closed by default
            });
            setValue("hours", defaultHours);
        }
    }, [hours, setValue]);

    // Clean up hours object to remove null values for validation
    useEffect(() => {
        if (cleanupDoneRef.current) return;

        const cleanupHours = () => {
            const currentHours = getValues("hours") as BusinessHours;
            
            if (!currentHours) return;
            
            const cleanedHours: Record<string, TimeRange> = {};
            
            Object.entries(currentHours).forEach(([day, timeRange]) => {
                if (timeRange !== null) {
                    cleanedHours[day] = timeRange;
                }
            });
            
            if (Object.keys(cleanedHours).length > 0) {
                setValue("hours", cleanedHours, { shouldValidate: true });
                cleanupDoneRef.current = true;
            }
        };
        
        // Run cleanup before form submission
        const handleBeforeSubmit = () => {
            cleanupHours();
            trigger("hours");
        };
        
        // Add event listener for form submission
        document.addEventListener('submit', handleBeforeSubmit);
        
        return () => {
            document.removeEventListener('submit', handleBeforeSubmit);
        };
    }, [getValues, setValue, trigger]);

    const handleTimeChange = (day: string, type: 'open' | 'close', value: string) => {
        // Convert from 12-hour format to 24-hour format for storage
        const time24h = convertTo24Hour(value);
        setValue(`hours.${day}.${type}`, time24h, { shouldValidate: true });
    };

    const getDisplayTime = (day: string, type: 'open' | 'close') => {
        if (!hours[day]) return type === 'open' ? "09:00 AM" : "10:00 PM";
        return convertTo12Hour(hours[day]?.[type] || '');
    };

    // Handle all days toggle
    const handleAllDaysToggle = (checked: boolean) => {
        const updatedHours = { ...hours };
        
        daysOfWeek.forEach(day => {
            updatedHours[day] = checked 
                ? { open: "09:00", close: "17:00" } 
                : null;
        });
        
        setValue("hours", updatedHours, { shouldValidate: true });
    };

    // Check if all days are enabled
    const areAllDaysEnabled = () => {
        return daysOfWeek.every(day => hours[day] !== null);
    };

    // Toggle a specific day
    const toggleDay = (day: string, checked: boolean) => {
        setValue(`hours.${day}`, checked ? { open: "09:00", close: "17:00" } : null, { shouldValidate: true });
    };

    return (     
        <Card className="border shadow-sm">
            <CardContent className="p-6">
                <div className="text-center mb-6">
                    <p className="text-gray-500 text-lg">Set your business hours</p>
                    <div className="flex justify-center items-center mt-4">
                        <Label className="mr-3 text-base font-medium">All days</Label>
                        <Switch
                            checked={areAllDaysEnabled()}
                            onCheckedChange={handleAllDaysToggle}
                            className="data-[state=checked]:bg-blue-600/80 data-[state=unchecked]:bg-gray-200/80"
                        />
                    </div>
                </div>
                
                <Tabs defaultValue="weekdays" className="w-full">
                    <TabsList className="grid grid-cols-2 mb-4">
                        <TabsTrigger value="weekdays">Weekdays</TabsTrigger>
                        <TabsTrigger value="weekend">Weekend</TabsTrigger>
                    </TabsList>
                    
                    {/* Weekdays Tab */}
                    <TabsContent value="weekdays" className="space-y-4">
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                            {dayGroups.weekdays.map((day) => (
                                <div key={day} className="border border-gray-200 rounded-md px-4 py-2.5">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-base font-medium">{day}</span>
                                            <span className="text-gray-500">
                                                {hours[day] ? `${getDisplayTime(day, 'open')} - ${getDisplayTime(day, 'close')}` : 'Closed'}
                                            </span>
                                        </div>
                                        <Switch
                                            checked={!!hours[day]}
                                            onCheckedChange={(checked) => toggleDay(day, checked)}
                                            className="data-[state=checked]:bg-blue-600/80 data-[state=unchecked]:bg-gray-200/80"
                                        />
                                    </div>
                                    
                                    {hours[day] && (
                                        <div className="grid grid-cols-2 gap-3 mt-3">
                                            <div className="flex items-center">
                                                <Label className="w-14 text-gray-500">Open:</Label>
                                                <Select
                                                    value={getDisplayTime(day, 'open')}
                                                    onValueChange={(value) => handleTimeChange(day, 'open', value)}
                                                >
                                                    <SelectTrigger className="w-full h-10 pl-2 pr-2 border border-gray-200 rounded-lg">
                                                        <div className="flex items-center">
                                                            <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                                            <SelectValue placeholder="Select time" />
                                                        </div>
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-[200px]">
                                                        {timeOptions.map(time => (
                                                            <SelectItem key={`${day}-open-${time}`} value={time}>
                                                                {time}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="flex items-center">
                                                <Label className="w-14 text-gray-500">Close:</Label>
                                                <Select
                                                    value={getDisplayTime(day, 'close')}
                                                    onValueChange={(value) => handleTimeChange(day, 'close', value)}
                                                >
                                                    <SelectTrigger className="w-full h-10 pl-2 pr-2 border border-gray-200 rounded-lg">
                                                        <div className="flex items-center">
                                                            <Clock className="h-3.5 w-3.5 mr-1.5 text-gray-400" />
                                                            <SelectValue placeholder="Select time" />
                                                        </div>
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-[200px]">
                                                        {timeOptions.map(time => (
                                                            <SelectItem key={`${day}-close-${time}`} value={time}>
                                                                {time}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                    
                    {/* Weekend Tab */}
                    <TabsContent value="weekend" className="space-y-4">
                        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
                            {dayGroups.weekend.map((day) => (
                                <div key={day} className="border border-gray-200 rounded-md px-4 py-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center space-x-4">
                                            <span className="text-base font-medium">{day}</span>
                                            <span className="text-sm text-gray-500">
                                                {hours[day] ? `${getDisplayTime(day, 'open')} - ${getDisplayTime(day, 'close')}` : 'Closed'}
                                            </span>
                                        </div>
                                        <Switch
                                            checked={!!hours[day]}
                                            onCheckedChange={(checked) => toggleDay(day, checked)}
                                            className="data-[state=checked]:bg-blue-600/80 data-[state=unchecked]:bg-gray-200/80"
                                        />
                                    </div>
                                    
                                    {hours[day] && (
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="flex items-center space-x-2">
                                                <Label className="w-16 text-base text-gray-500">Open:</Label>
                                                <Select
                                                    value={getDisplayTime(day, 'open')}
                                                    onValueChange={(value) => handleTimeChange(day, 'open', value)}
                                                >
                                                    <SelectTrigger className="w-full h-12 pl-2 pr-2 border border-gray-200 rounded-lg">
                                                        <div className="flex items-center">
                                                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                                            <SelectValue placeholder="Select time" className="text-base" />
                                                        </div>
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-[200px]">
                                                        {timeOptions.map(time => (
                                                            <SelectItem key={`${day}-open-${time}`} value={time}>
                                                                {time}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Label className="w-16 text-base text-gray-500">Close:</Label>
                                                <Select
                                                    value={getDisplayTime(day, 'close')}
                                                    onValueChange={(value) => handleTimeChange(day, 'close', value)}
                                                >
                                                    <SelectTrigger className="w-full h-12 pl-2 pr-2 border border-gray-200 rounded-lg">
                                                        <div className="flex items-center">
                                                            <Clock className="h-4 w-4 mr-2 text-gray-400" />
                                                            <SelectValue placeholder="Select time" className="text-base" />
                                                        </div>
                                                    </SelectTrigger>
                                                    <SelectContent className="max-h-[200px]">
                                                        {timeOptions.map(time => (
                                                            <SelectItem key={`${day}-close-${time}`} value={time}>
                                                                {time}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </CardContent>
        </Card>
    );
};

export default Step4;