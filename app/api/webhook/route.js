import { NextResponse } from 'next/server'

import { db } from '@/firebase/config';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Add resident
export async function POST(NextRequest) {
    const body = await NextRequest.json()

    if (body.type == "body") {
        const docRef = doc(db, "users", body.user.user_id);
        const docSnap = await getDoc(docRef);

        console.log(body.user.user_id)

        const data = {
            "blood_pressure_data": body.data[0]["blood_pressure_data"],
            "glucose_data": body.data[0]["glucose_data"],
            "temperature_data": body.data[0]["temperature_data"],
            "oxygen_data": body.data[0]["oxygen_data"]
        }

        await updateDoc(docSnap.ref, data);
    }

    return NextResponse.json({ status: 200 })
}