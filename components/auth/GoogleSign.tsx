'use client';
import React from "react";
import { FIREBASE_AUTH } from "../../lib/firebase";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

export default function GoogleSign() {
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(FIREBASE_AUTH, provider);
    }
    const [user] = useAuthState(FIREBASE_AUTH);
    return (
        <>
            {user ? null :
                <>
                    <div className="sm:px-0 w-full space-y-6">
                        <p className="flex items-center justify-center text-gray-400">--or--</p>
                        <button onClick={signInWithGoogle} type="button" className="text-white w-full duration-300 bg-indigo-600 hover:bg-indigo-400 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-bold rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center justify-between dark:focus:ring-[#4285F4]/55">
                            <svg className="mr-2 -ml-1 w-4 h-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
                                <path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z">
                                </path></svg>Sign with Google<div></div></button>
                    </div>
                </>}
        </>
    )
}