'use client';
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../lib/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "@firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function CustomSignInUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const auth = FIREBASE_AUTH;

    const handleSignInUp = async (action: 'signin' | 'signup') => {
        try {
            if (action === 'signin') {
                await signInWithEmailAndPassword(auth, email, password);
            } else {
                await createUserWithEmailAndPassword(auth, email, password);
            }
            setEmail('');
            setPassword('');
        } catch (error: any) {
            setError(error.message);
        }
    }

    if (error === 'Firebase: Error (auth/invalid-email).') {
        setError('Nesprávné jméno nebo heslo!');
    }
    const [user] = useAuthState(FIREBASE_AUTH);
    return (
        <>
            {user ? null : <>
                <div className="text-center text-4xl font-medium">Přihlásit</div>
                <div
                    className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 space-y-6"
                >
                    <input
                        type="text"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                    />
                </div>
                <div
                    className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500"
                >
                    <input
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        placeholder="Heslo"
                        className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                    />
                </div>
                {error && <div className="text-red-500 py-2 font-bold flex items-center justify-center">{error}</div>}
                <button
                    className="w-full transform rounded-lg bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400 flex items-center justify-center"
                    type='button'
                    onClick={() => handleSignInUp('signin')}
                >
                    Přihlásit se
                </button>
                <button
                    className="w-full transform rounded-lg bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400 flex items-center justify-center"
                    type='button'

                    onClick={() => handleSignInUp('signup')}
                >
                    Zaregistrovat se
                </button>
            </>}

        </>
    );
}

export default CustomSignInUp;