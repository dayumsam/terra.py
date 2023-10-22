"use client"

import React, { useRef, useEffect, useState } from 'react';

export default function Sidebar(active) {

    const [residents, setResidents] = useState(null)

    useEffect(() => {
        fetch('/api/getresidents')
            .then((response) => response.json())
            .then((json) => {
                setResidents(json.result);
            });
    }, []);

    return (
        <div>
            <p className='text-3xl font-bold mb-4 px-2'>Residents</p>
            {
                residents ?
                    residents.map((resident) => <a href={`/user/${resident.id}`} className={`block py-5 px-4 text-lg cursor-pointer rounded-md capitalize ${resident.id == active ? "bg-gray-300" : "hover:bg-gray-300"} `}>{`${resident.firstName} ${resident.lastName}`}</a>)
                    : <p className='py-5 px-4 text-lg cursor-pointer rounded-md'>loading....</p>
            }
        </div>
    )
}
