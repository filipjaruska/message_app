'use client';
import React from 'react';
import { deleteUser, getAuth, signOut } from "firebase/auth";
import { FIREBASE_AUTH } from "../../lib/firebase";
import Link from "next/link";
import { useAuthState } from 'react-firebase-hooks/auth';

export default function SignoutButton() {
    const [user] = useAuthState(FIREBASE_AUTH);
    const handleSignOut = async () => {
        signOut(FIREBASE_AUTH).then(() => {
            console.log("Signed out successfully")
        }).catch((error) => {
            console.log(error)
        });
    }
    const handleDeleteUser = async () => {
        const auth = getAuth();
        const userCurent = auth.currentUser!;
        deleteUser(userCurent).then(() => {
            console.log("Deleted!")  //EROR FIX FOR RECENT SIGN IN 
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <>
            {user
                ?
                <div className='space-y-6'>
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