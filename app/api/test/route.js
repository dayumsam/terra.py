import { NextResponse } from 'next/server'

import { app, db } from '@/firebase/config';
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export async function POST(NextRequest) {

    // const axios = require("axios");
    // const body = await NextRequest.json()

     await setDoc(doc(db, "users", "12345"),
            {
                user: "jaymin"
            });

    return NextResponse.json({ status: 200 })
}