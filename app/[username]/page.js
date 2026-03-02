"use client"
import React, { useState } from 'react'

export default function Username({ params }) {
    const { username } = React.use(params);

    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [supporters, setSupporters] = useState([
        {
            name: "Anurag",
            amount: 30,
            message: "I support you bro. Lots of ❤️",
        },
    ]);
    const [loading, setLoading] = useState(false);

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            if (document.getElementById("razorpay-script")) {
                resolve(true);
                return;
            }
            const script = document.createElement("script");
            script.id = "razorpay-script";
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async (payAmount) => {
        const finalAmount = payAmount || Number(amount);

        if (!finalAmount || finalAmount <= 0) {
            alert("Please enter a valid amount.");
            return;
        }
        if (!name.trim()) {
            alert("Please enter your name.");
            return;
        }

        setLoading(true);

        const loaded = await loadRazorpayScript();
        if (!loaded) {
            alert("Failed to load Razorpay. Check your connection.");
            setLoading(false);
            return;
        }

        // Create order on backend
        const res = await fetch("/api/razorpay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: finalAmount }),
        });

        const order = await res.json();
        if (!order || order.error) {
            alert("Failed to create payment order. Please try again.");
            setLoading(false);
            return;
        }

        const donorName = name.trim();
        const donorMessage = message.trim();

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Get Me a Drink 🍺",
            description: donorMessage || `Donation by ${donorName}`,
            order_id: order.id,
            handler: function (response) {
                // Payment successful — add to supporters list
                setSupporters((prev) => [
                    {
                        name: donorName,
                        amount: finalAmount,
                        message: donorMessage || "Keep it up! 🎉",
                        paymentId: response.razorpay_payment_id,
                    },
                    ...prev,
                ]);
                setAmount("");
                setName("");
                setMessage("");
                alert(`🎉 Thank you ${donorName}! Payment of ₹${finalAmount} successful!`);
            },
            prefill: {
                name: donorName,
            },
            theme: {
                color: "#6D28D9",
            },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
    };

    return (
        <>
            {/* Cover + Avatar */}
            <div className='cover w-full relative'>
                <img
                    src="https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3Ijo5NjAsIndlIjoxfQ%3D%3D/20.gif?token-hash=W5oXp7-eTHGeo5faGxH32REkRN1KtwJUsnymAC7z_kA%3D&token-time=1772582400"
                    alt="Cover"
                    className='object-cover w-full h-[350px]'
                />
                <div className="absolute top-[80%] left-[47%]">
                    <img
                        src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2R5bW1iZ3BlaTBlN3RraTBmdGg4ZXZmazBrM3lpcXNsd3l4dzUwZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/UQ1EI1ML2ABQdbebup/giphy.gif"
                        alt="Profile"
                        className='w-24'
                    />
                </div>
            </div>

            {/* Profile Info */}
            <div className="info flex justify-center items-center mt-5 flex-col gap-2">
                <div className='font-bold text-3xl'>@{username}</div>
                <div className='text-slate-600 font-bold'>Creating Animated art for VTT&apos;s</div>
                <div className='text-slate-600 font-bold'>
                    {supporters.length} supporters | $18,340/release
                </div>

                {/* Payment Section */}
                <div className="payment flex gap-3 w-[80%] mt-4">

                    {/* Supporters Panel */}
                    <div className="supporters bg-slate-900 w-1/2 rounded-2xl p-3">
                        <h1 className='font-bold p-3 text-2xl'>Supporters:-</h1>
                        <ul className='p-2 flex flex-col gap-3'>
                            {supporters.map((s, i) => (
                                <li key={i} className='flex items-start gap-2 bg-slate-800 rounded-xl p-2'>
                                    <img src="/avatar.gif" alt="Avatar" width={30} className="mt-1 rounded-full shrink-0" />
                                    <div className='text-sm'>
                                        <span className='font-bold text-white'>{s.name}</span>
                                        <span className='text-slate-300'> donated </span>
                                        <span className='font-bold text-green-400'>₹{s.amount}</span>
                                        {s.message && (
                                            <p className='text-slate-400 mt-1 italic'>&quot;{s.message}&quot;</p>
                                        )}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Make a Payment Panel */}
                    <div className="makePayment bg-slate-900 w-1/2 rounded-2xl p-3">
                        <h1 className='text-2xl font-bold my-5'>Make a Payment</h1>
                        <div className="flex flex-col gap-2">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className='w-full rounded-lg bg-slate-800 placeholder:text-slate-400 p-2 text-white'
                                placeholder="Enter Amount (₹)"
                            />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full rounded-lg bg-slate-800 placeholder:text-slate-400 p-2 text-white'
                                placeholder="Enter Your Name"
                            />
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className='w-full rounded-lg bg-slate-800 placeholder:text-slate-400 p-2 text-white'
                                placeholder="Enter a Message (optional)"
                            />
                            <button
                                onClick={() => handlePayment(null)}
                                disabled={loading}
                                className='bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-2 py-2 rounded-lg font-bold text-white'
                            >
                                {loading ? "Processing..." : "Donate 💸"}
                            </button>
                        </div>

                        {/* Quick Amount Buttons */}
                        <div className='mt-3 flex gap-3'>
                            <button
                                onClick={() => { setAmount(10); handlePayment(10); }}
                                className="bg-linear-to-br from-green-400 to-blue-600 text-white hover:bg-linear-to-bl p-3 rounded-lg font-semibold"
                            >
                                Pay ₹10
                            </button>
                            <button
                                onClick={() => { setAmount(20); handlePayment(20); }}
                                className="bg-linear-to-br from-green-400 to-blue-600 text-white hover:bg-linear-to-bl p-3 rounded-lg font-semibold"
                            >
                                Pay ₹20
                            </button>
                            <button
                                onClick={() => { setAmount(30); handlePayment(30); }}
                                className="bg-linear-to-br from-green-400 to-blue-600 text-white hover:bg-linear-to-bl p-3 rounded-lg font-semibold"
                            >
                                Pay ₹30
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
