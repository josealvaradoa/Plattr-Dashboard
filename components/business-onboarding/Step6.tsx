"use client";

import { useFormContext } from "react-hook-form";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";

const Step6 = () => {
  const { getValues } = useFormContext();
  const values = getValues();

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col h-full">
      <Card className="w-full shadow-sm rounded-xl bg-white">
        <CardContent className="p-6 items-center">
          <div className="text-center mb-5">
            <p className="text-sm text-gray-600">
              Please review the details below. Once submitted, this information <span className="font-medium text-gray-800">cannot be modified</span>.
            </p>
          </div>

          <Tabs defaultValue="basic" className="w-full justify-center">
            <TabsList className="grid grid-cols-4 mb-4 justify-center items-center">
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="hours">Hours</TabsTrigger>
            </TabsList>

            {/* Basic Information Tab */}
            <TabsContent value="basic" className="mt-0">
              <ScrollArea className="h-[300px] rounded-md pr-3">
                <div className="space-y-4">
                  {/* Business Image */}
                  <div className="flex justify-center mb-6">
                    {values.images ? (
                      <motion.div 
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="relative"
                      >
                        <img 
                          src={URL.createObjectURL(values.images[0])} 
                          alt="Business Logo" 
                          className="h-36 w-36 object-cover rounded-lg shadow-sm" 
                        />
                        <div className="absolute -bottom-2 left-0 right-0 mx-auto text-center">
                          <span className="inline-block bg-white px-2 py-1 rounded-md shadow-sm text-xs font-medium text-gray-500">
                            Business Image
                          </span>
                        </div>
                      </motion.div>
                    ) : (
                      <div className="h-36 w-36 flex items-center justify-center border border-dashed border-gray-300 rounded-lg">
                        <span className="text-xs text-gray-500">No image uploaded</span>
                      </div>
                    )}
                  </div>

                  {/* Business Name */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-500">Business Name</div>
                      <div className="text-sm font-medium text-gray-900">{values.name || "Not provided"}</div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">Description</div>
                    <div className="text-sm text-gray-900">{values.description || "Not provided"}</div>
                  </div>

                  {/* Price Level */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-500">Price Level</div>
                      <div className="text-sm font-medium text-gray-900">{values.priceLevel || "Not provided"}</div>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Contact Tab */}
            <TabsContent value="contact" className="mt-0">
              <ScrollArea className="h-[300px] rounded-md pr-3">
                <div className="space-y-4">
                  {/* Phone */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-500">Phone</div>
                      <div className="text-sm font-medium text-gray-900">{values.phone || "Not provided"}</div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="text-sm font-medium text-gray-500">Email</div>
                      <div className="text-sm font-medium text-gray-900">{values.email || "Not provided"}</div>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">Address</div>
                    <div className="text-sm text-gray-900">{values.address || "Not provided"}</div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="mt-0">
              <ScrollArea className="h-[300px] rounded-md pr-3">
                <div className="space-y-4">
                  {/* Cuisines */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">Cuisines</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {values.cuisineTypes?.length ? (
                        values.cuisineTypes.map((cuisine: string, index: number) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {cuisine}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-700">Not provided</span>
                      )}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="text-sm font-medium text-gray-500 mb-1">Features</div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {values.tags?.length ? (
                        values.tags.map((tag: string, index: number) => (
                          <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {tag}
                          </span>
                        ))
                      ) : (
                        <span className="text-sm text-gray-700">Not provided</span>
                      )}
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            {/* Hours Tab */}
            <TabsContent value="hours" className="mt-0">
              <ScrollArea className="h-[300px] rounded-md pr-3">
                {Object.entries(values.hours || {}).length > 0 ? (
                  <div className="space-y-2">
                    {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => {
                      const dayData = values.hours?.[day];
                      return (
                        <div key={day} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex justify-between items-center">
                            <div className="text-sm font-medium text-gray-700">{day}</div>
                            {dayData ? (
                              <div className="text-sm text-gray-900">
                                {dayData.open} - {dayData.close}
                              </div>
                            ) : (
                              <div className="text-sm text-gray-500">Closed</div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-full">
                    <p className="text-sm text-gray-500">No operating hours provided</p>
                  </div>
                )}
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Step6;