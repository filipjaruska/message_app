import React from "react";
import CustomSignInUp from "../../components/auth/CustomSignInUp";
import GoogleSign from "../../components/auth/GoogleSign";
import RedirectToMessages from "../../components/auth/RedirectToMessages";
import { Metadata } from 'next';
export const metadata: Metadata = {
    title: 'Message App',
}

export default function Auth() {
    return (
        <>
            <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
                <section className="flex w-[30rem] flex-col space-y-6">
                    <CustomSignInUp />
                    <GoogleSign />
                    <RedirectToMessages />
                </section>
            </main>
        </>
    );
}
