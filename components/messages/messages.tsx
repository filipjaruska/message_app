'use client'
//NOTE:
//Organize import statements in a more consistent and readable way. 
//Group related imports together and separate third-party imports from local ones.
import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { query, orderBy, limit, addDoc } from "firebase/firestore";
import { FIRESTORE_COL, FIREBASE_AUTH } from "../../lib/firebase";
import ChatMessage from "./ChatMessage";

import '@/app/globals.css';

//
export default function Messages() {
    //
    const [limitValue, setLimitValue] = useState(25)
    const q = query(FIRESTORE_COL, orderBy("createAt"), limit(limitValue));
    const [messages] = useCollectionData(q);
    const [formValue, setFormValue] = useState('');
    const [error, setError] = useState<string | null>(null);

    //
    const autoScroll = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (autoScroll.current) {
            autoScroll.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);
    //
    useEffect(() => {
        const addMessageForm = document.querySelector('.add');

        const handleSubmit = (e: any) => {
            e.preventDefault();

            if (formValue.length < 4) {
                setError('Zpráva je moc krátká.');
                setTimeout(() => setError(''), 3000);
                return;
            }
            if (formValue.length > 140) {
                setError('Zpráva je moc dlouhá.');
                setTimeout(() => setError(''), 3000)
                return;
            }

            //CODE:
            // let x = FIREBASE_AUTH.currentUser?.x;
            //NOTE:
            //
            const { currentUser } = FIREBASE_AUTH;
            let { uid, photoURL, email } = currentUser || {};
            const username = email?.split('@')[0];

            //NOTE:
            //
            if (!photoURL) {
                photoURL = "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg";
            }
            addDoc(FIRESTORE_COL, {
                createAt: serverTimestamp(),
                photoURL: photoURL,
                text: formValue,
                uid: uid,
                username: username,
            }).then(() => {
                setFormValue('')
            }).catch(error => {
                setError(error.message);
            })
        };

        addMessageForm?.addEventListener('submit', handleSubmit);

        return () => {
            addMessageForm?.removeEventListener('submit', handleSubmit);
        };
    }, [formValue]);

    const handleLimit = () => {
        setLimitValue(limitValue + 25);
    }

    return (
        <main>
            <div className="text-white">
                {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
            </div>
            <div ref={autoScroll} className="invisible pt-8 mb-3">to fix a bug and </div>
            <div className="fixed bottom-0 left-0 w-full p-4 bg-gray-800">
                <form className="add">
                    {error && <div className="text-red-500 py-2 font-bold flex items-center justify-center">{error}</div>}
                    <div className="flex justify-between items-center">
                        <input
                            type="text"
                            className="px-4 py-2 rounded-lg bg-white text-black w-3/4"
                            placeholder="Zadejte zprávu."
                            value={formValue}
                            onChange={(e) => setFormValue(e.target.value)}
                        />
                        <div className="flex space-x-2">
                            <button className="px-4 py-2 rounded-lg bg-indigo-500 text-white" type="button" onClick={() => handleLimit()}>
                                ⟳
                            </button>
                            <button className="px-2 py-2 rounded-lg bg-indigo-500 text-white" type="submit">
                                Poslat!
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    );
}
