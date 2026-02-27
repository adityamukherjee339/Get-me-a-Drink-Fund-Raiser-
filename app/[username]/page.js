import React from 'react'

const username = async ({ params }) => {
    const { username } = await params;
    return (
        <>
            <div className='cover w-full relative'>
                <img src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3Ijo5NjAsIndlIjoxfQ%3D%3D/20.gif?token-hash=W5oXp7-eTHGeo5faGxH32REkRN1KtwJUsnymAC7z_kA%3D&token-time=1772582400" alt="" srcset="" className='object-cover w-full h-[350]' />
                <div className="absolute top-[80%] left-[47%]">
                    <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2R5bW1iZ3BlaTBlN3RraTBmdGg4ZXZmazBrM3lpcXNsd3l4dzUwZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/UQ1EI1ML2ABQdbebup/giphy.gif" alt="" srcset="" className='w-25' />
                </div>
            </div>

            <div className="info flex justify-center items-center mt-5 flex-col gap-2">
                <div className='font-bold text-3xl'>

                    @{username}
                </div>
                <div className='text-slate-600 font-bold'>
                    Creating Animated art for VTT's
                </div>
                <div className='text-slate-600 font-bold'>
                    23,197 members | 107 Posts | $18,340/release
                </div>

                <div className="payment flex gap-3 w-[80%]">

                    <div className="supporters bg-slate-900 w-1/2 rounded-2xl p-3">
                        <h1 className='font-bold p-3 text-2xl'>Supporters:-</h1>
                        <ul className='p-2 flex gap-1.5'>
                            <li className=' flex items-center'>
                                <img src="avatar.gif" alt="" width={30} /><span>Anurag donated</span> <span className='font-bold'>&nbsp;$30 </span>&nbsp; with a message "I support you bro. Lots of ❤️"
                            </li>

                        </ul>

                    </div>
                    <div className="makePayment  bg-slate-900 w-1/2 rounded-2xl p-3">
                        <h1 className='text-2xl font-bold my-5'>Make a Payment</h1>
                        <div className="flex flex-col gap-2">

                            <input type="text" className='w-full rounded-lg bg-slate-800 placeholder:text-slate-400 p-2' placeholder="Enter Amount" />

                            <input type="text" className='w-full rounded-lg bg-slate-800 placeholder:text-slate-400 p-2' placeholder="Enter Name" />
                            <input type="text" className='w-full rounded-lg bg-slate-800 placeholder:text-slate-400 p-2' placeholder="Enter Message" />

                            <button className='bg-green-500 px-2 py-2 rounded-lg font-bold'>Donate</button>
                        </div>

                        <div className='mt-3 flex gap-3'>
                            {/* Or choose from these amounts */}

                            <button className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800 p-3 rounded-lg">Pay $10</button>
                            <button className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800 p-3 rounded-lg">Pay $20</button>
                            <button className="bg-gradient-to-br from-green-400 to-blue-600 text-white hover:bg-gradient-to-bl focus:ring-green-200 dark:focus:ring-green-800 p-3 rounded-lg">Pay $30</button>


                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

export default username
