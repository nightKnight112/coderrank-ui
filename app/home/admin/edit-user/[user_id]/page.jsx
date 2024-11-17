"use client";
import { useParams } from 'next/navigation';
import React from 'react'

const page = () => {
    const params = useParams();

    const user_id = params.user_id;
    return (
        <>
            {user_id}
        </>
    )
}

export default page