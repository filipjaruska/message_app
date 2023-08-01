"use client";
import Image from 'next/image';
import { useAuthState } from 'react-firebase-hooks/auth';
import { FIREBASE_AUTH } from "@/lib/firebase"
import Link from 'next/link';
export default function Home() {

  const [user] = useAuthState(FIREBASE_AUTH);
  return (
    <div>
      {user ? <h1>Loged in!</h1> : <Link href={'/auth'}>sadfasdkfjasdhfkasd</Link>}
    </div>
  )
}
