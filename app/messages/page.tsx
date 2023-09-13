import React from "react";
import Messages from "@/components/messages/messages";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Message App',
}
export default function App() {
    return (
        <div>
            <Messages />
        </div>
    );
}
