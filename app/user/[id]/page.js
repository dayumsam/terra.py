"use client"

import Sidebar from "@/app/components/sidebar";
import Navbar from "@/app/components/navbar";

import React, { useRef, useEffect, useState } from 'react';

import { db } from '@/firebase/config';
import { doc, getDoc } from "firebase/firestore";

export default function Page({ params }) {

    const [resident, setResident] = useState(null)
    const [healthEval, setHealthEval] = useState(null)

    useEffect(() => {
        fetch(`/api/getresident/?id=${params.id}`)
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setResident(json);
            });
    }, []);

    useEffect(() => {
        fetch("/api/healtheval/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ "id": params.id })
        }).then((response) => response.json())
            .then((json) => {
                console.log(json);
                setHealthEval(json);
            })
    }, [resident]);

    return (
        <>
            {
                !resident ? "loading..." :
                    <main className="min-h-[100dvh]">
                        <Navbar />
                        <div className="h-full grid grid-rows-1 grid-cols-[1fr_2fr_2fr] gap-4 px-8">
                            <Sidebar active={params.id} />
                            <div className="min-h-[750px]">
                                <p className="text-3xl font-bold capitalize">{`${resident.firstName} ${resident.lastName}`}</p>
                                <p className="mt-3">{`Room number: ${resident.room}`}</p>

                                <div>
                                    <div className="h-full grid grid-rows-2 grid-cols-2 gap-4 mt-5 mr-8">
                                        <div className="flex-col items-center justify-center text-center px-8 py-16 bg-pink-200 rounded-lg">
                                            <p className="text-2xl font-bold mb-3">Oxygen Saturation</p>
                                            <p className="text-xl">{resident.oxygen_data.saturation_samples[0].percentage.toFixed(2)}</p>
                                        </div>

                                        <div className="flex-col items-center justify-center text-center px-8 py-16 bg-blue-200 rounded-lg">
                                            <p className="text-2xl font-bold mb-3">Systolic BP</p>
                                            <p className="text-xl">{resident.blood_pressure_data.blood_pressure_samples[1].systolic_bp.toFixed(2)}</p>
                                        </div>

                                        <div className="flex-col items-center justify-center text-center px-8 py-16 bg-green-200 rounded-lg">
                                            <p className="text-2xl font-bold mb-3">Blood Glucose</p>
                                            <p className="text-xl">{resident.glucose_data.day_avg_blood_glucose_mg_per_dL.toFixed(2)}</p>
                                        </div>

                                        <div className="flex-col items-center justify-center text-center px-8 py-16 bg-yellow-200 rounded-lg">
                                            <p className="text-2xl font-bold mb-3">Temprature Data</p>
                                            <p className="text-xl">{resident.temperature_data.body_temperature_samples[0].temperature_celsius.toFixed(2)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-gray-300 rounded-lg p-6 overflow-y-auto">
                                <p className="text-2xl font-bold pb-3">Health Evaluvation</p>
                            </div>
                        </div>
                    </main>
            }
        </>
    )
}