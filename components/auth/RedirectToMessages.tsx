'use client';
import { FIREBASE_AUTH } from "@/lib/firebase";
import Link from "next/link";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";

export default function RedirectToMessages() {
    const [user] = useAuthState(FIREBASE_AUTH);
    return (
        <>
            {user ?
                <>
                    <div className="text-center text-4xl font-medium">Continue to Messages!</div>
                    <Link href={"/messages"}>
                        <button
                            type="button"
                            className="w-full transform rounded-lg bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400 flex items-center justify-center"
                        >
                            Messages
                        </button>
                    </Link>
                </>
                : null
            }
        </>
    )
}