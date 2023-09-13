'use client';
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { FIREBASE_AUTH } from "../../lib/firebase";
import Link from "next/link";

export default function SignInButton() {

    const [user] = useAuthState(FIREBASE_AUTH);
    var photoURL = FIREBASE_AUTH.currentUser?.photoURL;
    if (photoURL === undefined || photoURL === null) {
        photoURL = "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
    }
    return (
        <>
            {user
                ?
                <Link href="/dashboard">
                    <img className="rounded-full w-8 h-8 mr-2" src={photoURL} alt="User Avatar" />
                </Link>

                :
                <Link href="/auth">
                    <p className="inline-block border border-indigo-800 rounded py-2 px-4 bg-indigo-700 hover:border-indigo-500 hover:bg-indigo-300 text-white">
                        Přihlásit se
                    </p>
                </Link>
            }
        </>
    )
}