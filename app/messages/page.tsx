'use client';
import React, { useEffect, useRef, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { FIRESTORE_COL, FIREBASE_AUTH } from "../../lib/firebase"
import { query, orderBy, limit, addDoc } from "firebase/firestore";
import '../globals.css';

export default function Messages() {
    const q = query(FIRESTORE_COL, orderBy("createAt"), limit(25));
    const [messages] = useCollectionData(q)
    //submiting a message
    const [formValue, setFormValue] = useState('');

    const autoScroll = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const addMessageForm = document.querySelector('.add');

        const handleSubmit = (e: any) => {
            e.preventDefault();
            let uid = FIREBASE_AUTH.currentUser?.uid;
            let photoURL = FIREBASE_AUTH.currentUser?.photoURL;
            let emailUser = FIREBASE_AUTH.currentUser?.email;
            let username = emailUser?.split('@')!;

            if (uid === undefined) { //delete
                uid = "temporary";
            }
            if (photoURL === undefined || photoURL === null) { //delete or reimplement
                photoURL = "https://static.vecteezy.com/system/resources/previews/008/442/086/original/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg"
            }
            addDoc(FIRESTORE_COL, {
                createAt: serverTimestamp(),
                photoURL: photoURL,
                text: formValue,
                uid: uid,
                username: username[0],
            }).then(() => {
                setFormValue('')
                autoScroll.current?.scrollIntoView({ behavior: "smooth" });
            })
        };

        addMessageForm?.addEventListener('submit', handleSubmit);

        return () => {
            addMessageForm?.removeEventListener('submit', handleSubmit);
        };
    }, [formValue]);



    return (
        <main>
            <div className="text-white">
                {messages && messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}
            </div>
            <div ref={autoScroll} className="invisible pt-8 mb-3">to fix a bug and </div>
            <div className="fixed bottom-0 left-0 w-full p-4 bg-gray-800">
                <form className="add">
                    <div className="flex justify-between items-center">
                        <input
                            type="text"
                            className="px-4 py-2 rounded-lg bg-white text-black w-3/4"
                            placeholder="Enter your message"
                            value={formValue}
                            onChange={(e) => setFormValue(e.target.value)}
                        />
                        <button className="px-4 py-2 rounded-lg bg-blue-500 text-white" type="submit">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}
function ChatMessage(props: any) {
    const { text, uid, photoURL, id, username } = props.message;

    const messageClass = uid === FIREBASE_AUTH.currentUser?.uid;
    return (
        <div>
            {messageClass ?
                <div className="flex items-center justify-end">
                    <div>
                        <p className="font-bold text-lg">{username}</p>
                        <p>{text}</p>
                    </div>
                    <div className="ml-4">
                        <img src={photoURL} alt="Your Profile" className="w-24 h-24 rounded-full" />
                    </div>
                </div>
                :
                <div className="flex items-center">
                    <div className="mr-4">
                        <img src={photoURL} alt="User Profile" className="w-24 h-24 rounded-full" />
                    </div>
                    <div>
                        <p className="font-bold text-lg">{username}</p>
                        <p>{text}</p>
                    </div>
                </div>}
        </div>
    );
}