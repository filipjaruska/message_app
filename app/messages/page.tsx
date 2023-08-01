'use client';
import React from "react";
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { onSnapshot } from 'firebase/firestore';
import { FIRESTORE_COL } from "../../lib/firebase"
import { query, orderBy, limit } from "firebase/firestore";

export default function Messages() {
    let messagesss: any[] = []
    /*
    getDocs(FIRESTORE_COL).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
            messages.push({ ...doc.data(), id: doc.id })
        })
        console.log(messages)
    }).catch(err => {
        console.log(err.message)
    })
*/
    onSnapshot(FIRESTORE_COL, (snapshot) => {
        snapshot.docs.forEach((doc) => {
            messagesss.push({ ...doc.data(), id: doc.id })
        })
        console.log(messagesss)
    })

    const q = query(FIRESTORE_COL, orderBy("createdAt"), limit(25));
    const [messages] = useCollectionData(q)
    return (
        <div className="	
        text-red-400">
            {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
        </div>
    );
}
function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    return <p>{text}</p>;
}