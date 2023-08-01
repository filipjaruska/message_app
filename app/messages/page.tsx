'use client';
import React, { useEffect, useState } from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { FIRESTORE_COL, FIREBASE_AUTH } from "../../lib/firebase"
import { query, orderBy, limit, addDoc } from "firebase/firestore";

import firebase from "firebase/compat/app";

export default function Messages() {
    /*
    let messagesss: any[] = []

    getDocs(FIRESTORE_COL).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id })
        })
        console.log(messages)
    }).catch(err => {
        console.log(err.message)
    })

    onSnapshot(FIRESTORE_COL, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            messagesss.push({ ...doc.data(), id: doc.id })
        })
        console.log(messagesss)
    })
*/
    const q = query(FIRESTORE_COL, orderBy("createAt"), limit(25));
    const [messages] = useCollectionData(q)
    //submiting a message
    const [formValue, setFormValue] = useState('');

    // const addMessage = document.querySelector('.add');
    // addMessage?.addEventListener('submit', (e) => {
    //     e.preventDefault();
    //     let uid = FIREBASE_AUTH.currentUser?.uid;
    //     let photoURL = FIREBASE_AUTH.currentUser?.photoURL;

    //     if (uid === undefined) { //delete
    //         uid = "temporary";
    //     }
    //     if (photoURL === undefined || photoURL === null) { //delete or reimplement
    //         photoURL = "https://cdn-img1.imgworlds.com/assets/9558de9d-1e49-437e-aa7b-b8bd4d999b00.jpg?key=home-gallery"
    //     }
    //     addDoc(FIRESTORE_COL, {
    //         createAt: serverTimestamp(),
    //         photoURL: photoURL,
    //         text: formValue,
    //         uid: uid,
    //     }).then(() => setFormValue(''))
    // })

    useEffect(() => {
        const addMessageForm = document.querySelector('.add');

        const handleSubmit = (e: any) => {
            e.preventDefault();
            let uid = FIREBASE_AUTH.currentUser?.uid;
            let photoURL = FIREBASE_AUTH.currentUser?.photoURL;

            if (uid === undefined) { //delete
                uid = "temporary";
            }
            if (photoURL === undefined || photoURL === null) { //delete or reimplement
                photoURL = "https://cdn-img1.imgworlds.com/assets/9558de9d-1e49-437e-aa7b-b8bd4d999b00.jpg?key=home-gallery"
            }
            addDoc(FIRESTORE_COL, {
                createAt: serverTimestamp(),
                photoURL: photoURL,
                text: formValue,
                uid: uid,
            }).then(() => setFormValue(''))
        };

        addMessageForm?.addEventListener('submit', handleSubmit);

        return () => {
            addMessageForm?.removeEventListener('submit', handleSubmit);
        };
    }, [formValue]);

    return (
        <>
            <div className="text-red-400">
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            </div>
            <form className="add">
                <input
                    type="text"
                    placeholder="Enter your message"
                    value={formValue}
                    onChange={(e) => setFormValue(e.target.value)}
                />
                <button type="submit">Add Message</button>
            </form>
        </>
    );
}
function ChatMessage(props: any) {
    const { text, uid, photoURL, id } = props.message;


    const messageClass = uid === FIREBASE_AUTH.currentUser?.uid;
    return (
        <div key={id}>
            <img className="rounded-full w-16 h-16" src={photoURL} alt="User Avatar" />
            {messageClass ? <p >Your msg: {text}</p> : <p>Incomming msg: {text}</p>}
        </div>
    );
}