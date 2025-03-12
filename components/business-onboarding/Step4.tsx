"use client";

import { useFormContext } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { useEffect } from "react";
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
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const daysOfWeek = [
    "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
];

// Time options for select
const timeOptions = [
    "12:00 AM", "12:30 AM", "01:00 AM", "01:30 AM", "02:00 AM", "02:30 AM", "03:00 AM", "03:30 AM",
    "04:00 AM", "04:30 AM", "05:00 AM", "05:30 AM", "06:00 AM", "06:30 AM", "07:00 AM", "07:30 AM",
    "08:00 AM", "08:30 AM", "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM", "06:00 PM", "06:30 PM", "07:00 PM", "07:30 PM",
    "08:00 PM", "08:30 PM", "09:00 PM", "09:30 PM", "10:00 PM", "10:30 PM", "11:00 PM", "11:30 PM",
];

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
        hours = '00';
    }

    if (modifier === 'PM') {
        hours = String(parseInt(hours, 10) + 12);
    }

    return `${hours}:${minutes}`;
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
    const { setValue, watch } = useFormContext();
    const hours = watch("hours") as BusinessHours || {};

    // Initialize hours with default values if empty
    useEffect(() => {
        if (Object.keys(hours).length === 0) {
            const defaultHours: BusinessHours = {};
            daysOfWeek.forEach(day => {
                if (["Monday", "Tuesday", "Saturday", "Sunday"].includes(day)) {
                    defaultHours[day] = { open: "09:00", close: "22:00" };
                } else {
                    defaultHours[day] = null;
                }
            });
            setValue("hours", defaultHours);
        }
    }, [hours, setValue]);

    const handleTimeChange = (day: string, type: 'open' | 'close', value: string) => {
        // Convert from 12-hour format to 24-hour format for storage
        const time24h = convertTo24Hour(value);
        setValue(`hours.${day}.${type}`, time24h);
    };

    const getDisplayTime = (day: string, type: 'open' | 'close') => {
        if (!hours[day]) return type === 'open' ? "09:00 AM" : "10:00 PM";
        return convertTo12Hour(hours[day]?.[type] || '');
    };

    return (     
            <Card className="border shadow-sm">
                <CardContent className="p-6">
                    {daysOfWeek.map((day) => (
                        <div key={day} className="py-4 border-b border-gray-200 last:border-b-0">
                            <div className="flex items-center justify-between mb-2">
                                <Label className="text-lg font-medium">
                                    {day}
                                </Label>

                                <Switch
                                    checked={!!hours[day]}
                                    onCheckedChange={(checked: boolean) => {
                                        setValue(`hours.${day}`, checked ? { open: "09:00", close: "22:00" } : null);
                                    }}
                                    className="data-[state=checked]:bg-blue-600/80 data-[state=unchecked]:bg-gray-200/80"
                                />
                            </div>

                            {hours[day] && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                                    <div className="flex items-center">
                                        <Label className="w-16 text-sm text-gray-500">Open:</Label>
                                        <Select
                                            value={getDisplayTime(day, 'open')}
                                            onValueChange={(value) => handleTimeChange(day, 'open', value)}
                                        >
                                            <SelectTrigger className="w-full max-w-[180px]flex justify-between">
                                                <SelectValue placeholder="Select time" />
                                                <Clock className=" text-gray-400" />
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
                                        <Label className="w-16 text-sm text-gray-500">Close:</Label>
                                        <Select
                                            value={getDisplayTime(day, 'close')}
                                            onValueChange={(value) => handleTimeChange(day, 'close', value)}
                                        >
                                            <SelectTrigger className="w-full max-w-[180px]">
                                                <SelectValue placeholder="Select time" />
                                                <Clock className="h-4 w-4 text-gray-400 ml-2" />
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
                </CardContent>
            </Card>
    );
};

export default Step4;
