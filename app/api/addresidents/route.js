import { NextResponse } from 'next/server'

import { app, db } from '@/firebase/config';
import { doc, collection, addDoc, setDoc } from 'firebase/firestore';

// Add resident
export async function POST(NextRequest) {
    const body = await NextRequest.json()

    await addDoc(collection(db, "users"),
        {
            firstName: body.fname,
            lastName: body.lname,
            room: body.room
        });

    return NextResponse.json({ status: 200 })
}