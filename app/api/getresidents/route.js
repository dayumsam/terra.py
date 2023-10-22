import { NextResponse } from 'next/server'

import { app, db } from '@/firebase/config';
import { collection, getDocs } from "firebase/firestore";

// Add resident
export async function GET(NextRequest) {
    const query = await getDocs(collection(db, "users"));
    let result = []

    query.forEach((doc) => {
        let user = doc.data()

        user['id'] = doc.id

        result.push(user)
    });

    return NextResponse.json({ result }, { status: 200 })
}