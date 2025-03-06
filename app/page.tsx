'use client'
import { useRouter } from 'next/navigation';
import  { useEffect } from 'react'

export default function Mainpage() {

    const router = useRouter();
    useEffect(() => {
        router.push('/sign-in');
    }, [router]);

    return null;
  
}
