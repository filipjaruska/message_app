import React from "react";
import SignoutButton from "../../components/dashboard/SignoutButton";

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