import { FIREBASE_AUTH } from "../../lib/firebase";
import { DocumentData } from 'firebase/firestore';
import React from 'react';
// NOTE:
// It's a good practice to define a TypeScript interface for component's props to provide better type safety and improve code readability.
// interface ChatMessageProps {
//     message: {
//         text: string;
//         uid: string;
//         photoURL: string;
//         username: string;
//     };
// }
// EDIT:
// DON'T MAKE AN INTERFACE WHEN YOU'RE NOT SUPPOSED TO!

//CODE:
//... ChatMessage(props: ChatMessageProps) {
//... { ... } = props.message;
//NOTE:
//Instead of destructuring the props.message inside the component, 
//it can be destructure  in the function parameter itself to make the code more concise.
export default function ChatMessage({ message }: DocumentData) {
    const { text, uid, photoURL, username } = message;
    const isCurrentUser = uid === FIREBASE_AUTH.currentUser?.uid;

    //CODE:
    //{isCurrentUser ? ... : ...}
    //NOTE:
    //This code has some duplication when rendering the message. 
    //Which can be optimize  by using a ternary operator for the class name and swapping the positions of the elements based on the condition.
    return (
        <div className={`flex items-center pt-2 ${isCurrentUser ? 'justify-end' : ''}`}>
            {!isCurrentUser && (
                <div className="mr-4">
                    <img src={photoURL} alt="User Profile" className="w-24 h-24 rounded-full" />
                </div>
            )}
            <div>
                <p className="font-bold text-lg">{username}</p>
                <p>{text}</p>
            </div>
            {isCurrentUser && (
                <div className="ml-4">
                    <img src={photoURL} alt="Your Profile" className="w-24 h-24 rounded-full" />
                </div>
            )}
        </div>
    );
}
