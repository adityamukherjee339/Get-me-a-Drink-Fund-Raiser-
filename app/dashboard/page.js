"use client"
import React from 'react'
import { useSession, signOut, signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
    const { data: session } = useSession();
        if (!session) {
            const router = useRouter();
            router.push("/login");
        }
  return (
    <div>
      This user is logged in and can see this dashboard page. This page is protected and can only be accessed by authenticated users.
    </div>
  )
}

export default Dashboard
