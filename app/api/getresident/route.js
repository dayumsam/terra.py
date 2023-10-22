import { NextResponse } from 'next/server'

import { db } from '@/firebase/config';
import { doc, getDoc } from "firebase/firestore";

// Add resident
export async function GET(NextRequest) {

    const identifier = NextRequest.nextUrl.searchParams.get("id")

    const docRef = doc(db, "users", identifier);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        return NextResponse.json({ ...docSnap.data() }, { status: 200 })
    } else {
        console.log("No such document!");
        return NextResponse.json({ result: docSnap.data() }, { status: 400 })
    }
}