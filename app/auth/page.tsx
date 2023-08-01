'use client';
import React, { useState } from "react";
import { FIREBASE_AUTH } from "../../lib/firebase"
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "@firebase/auth";







export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = FIREBASE_AUTH;
    const signIn = async () => {
        try {
            const response = await signInWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error)
        }
    }
    const signUp = async () => {
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <form>
            <input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@gmail.com"
            />
            <input
                onChange={(e) => setPassword(e.target.value)}
                placeholder="*********"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='button' onClick={signIn}>Sign In</button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" type='button' onClick={signUp}>Sign Up</button>
        </form>
    );
}