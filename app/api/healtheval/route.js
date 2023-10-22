import { NextResponse } from 'next/server'
import OpenAI from "openai";

import { db } from '@/firebase/config';
import { doc, getDoc } from "firebase/firestore";

export async function POST(NextRequest) {

    const body = await NextRequest.json()
    console.log(body)

    const docRef = doc(db, "users", body.id);
    const docSnap = await getDoc(docRef);

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
    });

    const chatCompletion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            { "role": "system", "content": "You are an app that provides users with a preliminary health diagnosis based on json data provided, you have to provide concise bullet points that summarize the current health conditions of the user and action points to improve their condition or staying healthy." },
            { "role": "user", "content": `${JSON.stringify(...docSnap.data())}` }
        ]
    });

    return NextResponse.json({ chatCompletion }, { status: 200 })
}