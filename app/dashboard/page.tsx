import React from "react";
import SignoutButton from "../../components/dashboard/SignoutButton";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Message App',
}

export default function Auth() {
    return (
        <>
            <main className="mx-auto flex min-h-screen w-full items-center justify-center bg-gray-900 text-white">
                <section className="flex w-[30rem] flex-col space-y-6">
                    <SignoutButton />
                </section>
            </main>
        </>
    );
}