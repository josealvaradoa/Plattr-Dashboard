import Link from "next/link";
import AppLogoIcon from "@/components/app-logo-icon";
import React from "react";

export default function AuthCardLayout({children}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <Link href="/" className="flex items-center gap-2 self-center font-medium ">
                    <div className="flex h-12 w-12 items-center justify-center bg-gray-200 rounded-md">
                        <AppLogoIcon />
                    </div>
                </Link>

                <div className="flex flex-col gap-6">
                    {children}
                </div>
            </div>
        </div>
    );
}