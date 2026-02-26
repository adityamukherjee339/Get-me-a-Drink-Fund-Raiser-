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
                        <ul className='p-2 flex flex-col gap-1.5'>
                            <li>Anurag donated $30 with a message ""</li>
                            <li>Anurag donated $30 with a message ""</li>
                            <li>Anurag donated $30 with a message ""</li>
                            <li>Anurag donated $30 with a message ""</li>
                        </ul>

                    </div>
                    <div className="makePayment  bg-slate-900 w-1/2 rounded-2xl p-3">
<button>Pay $10</button>

                    </div>
                </div>
            </div>

        </>
    )
}

export default username
