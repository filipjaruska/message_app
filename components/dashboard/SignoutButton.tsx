'use client';
import React, { useState } from 'react';
import { deleteUser, getAuth, signOut, updateProfile } from "firebase/auth";
import { FIREBASE_AUTH } from "../../lib/firebase";
import Link from "next/link";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function SignoutButton() {
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState('');
    const [user] = useAuthState(FIREBASE_AUTH);
    const handleSignOut = async () => {
        signOut(FIREBASE_AUTH).then(() => {
            console.log("Signed out successfully")
        }).catch((error) => {
            setError(error.message);
        });
    }
    const handleDeleteUser = async () => {
        const auth = getAuth();
        const userCurent = auth.currentUser!;
        deleteUser(userCurent).then(() => {
            console.log("Deleted!")  //EROR FIX FOR RECENT SIGN IN 
        }).catch((error) => {
            setError(error.message);
        });
    }
    const handlePicureUpdate = async () => {
        if (!isValidURL(url)) {
            setError('Neplatn9 URL!');
            setTimeout(() => setError(''), 3000)
            return;
        }
        updateProfile(FIREBASE_AUTH.currentUser!, {
            photoURL: url,
            //"https://mymodernmet.com/wp/wp-content/uploads/archive/SuJWHboczNeMaX9Sch2M_rcHughJorgens.jpg"
        }).then(() => {
            setError('Obnovte Webovou str8nku!');
            setTimeout(() => setError(''), 3000)
        }).catch((error) => {
            setError(error.message);
            setTimeout(() => setError(''), 3000)
        });
    }
    if (error === 'Firebase: Error (auth/requires-recent-login).') {
        setError('Pro overeni vasi identitu se prosim odhlaste a znovu prihlaste a pak znovu kilknete na odstraneni uctu.');
    }
    return (
        <>
            {user
                ?
                <div className='space-y-6'>
                    <div
                        className="w-full transform border-b-2 bg-transparent text-lg duration-300 focus-within:border-indigo-500 space-y-6"
                    >
                        <input
                            type="text"
                            placeholder="URL"
                            onChange={(e) => setUrl(e.target.value)}
                            value={url}
                            className="w-full border-none bg-transparent outline-none placeholder:italic focus:outline-none"
                        />
                    </div>
                    <div />
                    <button
                        className="w-full transform rounded-lg bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400 flex items-center justify-center"
                        type='button'
                        onClick={handlePicureUpdate}
                    >
                        Update Picture
                    </button>
                    {error && <div className="text-red-500 py-2 font-bold flex items-center justify-center">{error}</div>}
                    <div className="invisible pt-4 mb-2">space </div>
                    <button
                        className="w-full transform rounded-lg bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400 flex items-center justify-center"
                        type='button'
                        onClick={handleSignOut}
                    >
                        Sign Out
                    </button>
                    <button
                        className="w-full transform rounded-lg bg-indigo-600 py-2 font-bold duration-300 hover:bg-indigo-400 flex items-center justify-center"
                        type='button'
                        onClick={handleDeleteUser}
                    >
                        Delete Account
                    </button>
                    {error && <div className="text-red-500 py-2 font-bold flex items-center justify-center">{error}</div>}
                </div>

                :
                <Link href="/auth">
                    <p className="border border-indigo-800 rounded py-2 px-4 bg-indigo-700 hover:border-indigo-500 hover:bg-indigo-300 text-white flex items-center justify-center">
                        Sign In
                    </p>
                </Link>
            }
        </>
    )
}

function isValidURL(url: string) {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlPattern.test(url);
}