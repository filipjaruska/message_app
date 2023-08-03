import Link from "next/link";
import React from "react";
import MessagesButton from '@/components/navbar/MessagesButton';
import SignInButton from "@/components/navbar/SignInButton"

export default function Navbar() {
    return (
        <>
            <ul className="flex bg-gray-700 text-white justify-between items-center">
                <li className="mr-3">
                    <Link href={"/"}>
                        <p className="inline-block rounded hover:border-indigo-500  hover:bg-indigo-300 py-2 px-4">
                            Home
                        </p>
                    </Link>
                </li>
                <li className="mr-3">
                    <MessagesButton />
                </li>
                <li className="ml-auto">
                    <SignInButton />
                </li>
            </ul>
        </>
    )
}