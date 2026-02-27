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
    <div className='min-h-[80vh] flex justify-center items-center flex-col gap-3'>
      <div className='gap-3 flex flex-col'>
        <h1 className='font-bold'>Name</h1>
        <input type="text" className='w-3xl rounded-lg bg-slate-800 placeholder:text-slate-400 p-2 ' placeholder="Enter Name" />
      </div>
      <div className='gap-3 flex flex-col'>
        <h1 className='font-bold'>Email</h1>
        <input type="text" className='w-3xl rounded-lg bg-slate-800 placeholder:text-slate-400 p-2' placeholder="Enter Email" />
      </div>
      <div className='gap-3 flex flex-col'>
        <h1 className='font-bold'>Username</h1>
        <input type="text" className='w-3xl rounded-lg bg-slate-800 placeholder:text-slate-400 p-2' placeholder="Enter Username" />
      </div>
      <div className='gap-3 flex flex-col'>
        <h1 className='font-bold'>Profile Picture</h1>
        <input type="text" className='w-3xl rounded-lg bg-slate-800 placeholder:text-slate-400 p-2' placeholder="Enter Profile Picture" />
      </div>
      <div className='gap-3 flex flex-col'>
        <h1 className='font-bold'>Cover Picture</h1>
        <input type="text" className='w-3xl rounded-lg bg-slate-800 placeholder:text-slate-400 p-2' placeholder="Enter Cover Picture" />
      </div>
      <div className='gap-3 flex flex-col'>
        <h1 className='font-bold'>Razerpay Credentials</h1>
        <input type="text" className='w-3xl rounded-lg bg-slate-800 placeholder:text-slate-400 p-2' placeholder="Enter Razerpay Credentials" />
      </div>
      <div className='gap-3 flex flex-col'>

      <button className='bg-green-500 px-2 py-2 rounded-lg font-bold w-3xl'>Save</button>
      </div>
      
    </div>
  )
}

export default Dashboard
