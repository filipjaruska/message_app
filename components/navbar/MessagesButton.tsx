'use client';
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FIREBASE_AUTH } from "../../lib/firebase";
import Link from "next/link";

export default function MessagesButton() {

    const [user] = useAuthState(FIREBASE_AUTH);
    return (
        <>
            {user
                ?
                <>
                    <Link href={"/messages"}>
                        <p className="inline-block rounded hover:border-indigo-500  hover:bg-indigo-200 py-2 px-4">
                            Zprávy
                        </p>
                    </Link>
                </>
                :
                <p className="inline-block py-2 px-4 text-gray-400 cursor-not-allowed">
                    Zprávy
                </p>
            }
        </>
    )
}