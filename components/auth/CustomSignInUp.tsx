'use client';
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "@firebase/auth";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

function CustomSignInUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log(error);
        }
    }

    const signUp = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            setEmail('');
            setPassword('');
        } catch (error) {
            console.log(error);
        }
    }
    const [user] = useAuthState(FIREBASE_AUTH);
    return (
        <>
            {user ? null : <>
                <div className="text-center text-4xl font-medium">Authentication</div>
                <div
                    className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 space-y-6"
                >
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} // Set the value attribute to maintain state
                        className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                    />
                </div>
                <div
                    className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                >
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} // Set the value attribute to maintain state
                        placeholder="Password"
                        className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                    />
                </div>
                <button
                    className="w-full transform rounded-lg bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400 flex items-center justify-center"
                    type='button'
                    onClick={signIn}
                >
                    Sign In
                </button>
                <button
                    className="w-full transform rounded-lg bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400 flex items-center justify-center"
                    type='button'

                    onClick={signUp}
                >
                    Sign Up
                </button>
            </>}

        </>
    );
}

export default CustomSignInUp;