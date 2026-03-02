"use client"
import React, { useState, useEffect } from 'react'

export default function Username({ params }) {
    const { username } = React.use(params);

    const [amount, setAmount] = useState("");
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [supporters, setSupporters] = useState([]);
    const [loading, setLoading] = useState(false);

    const [userData, setUserData] = useState(null);
    const [profileLoading, setProfileLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(`/api/user?username=${encodeURIComponent(username)}`);
                if (res.ok) setUserData(await res.json());
            } catch (err) {
                console.error("Error loading user profile:", err);
            } finally {
                setProfileLoading(false);
            }
        };
        fetchUser();
    }, [username]);

    useEffect(() => {
        const fetchSupporters = async () => {
            try {
                const res = await fetch(`/api/payment?username=${encodeURIComponent(username)}`);
                if (res.ok) setSupporters(await res.json());
            } catch (err) {
                console.error("Error loading supporters:", err);
            }
        };
        fetchSupporters();
    }, [username]);

    const loadRazorpayScript = () => new Promise((resolve) => {
        if (document.getElementById("razorpay-script")) { resolve(true); return; }
        const script = document.createElement("script");
        script.id = "razorpay-script";
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.onload = () => resolve(true);
        script.onerror = () => resolve(false);
        document.body.appendChild(script);
    });

    const handlePayment = async (payAmount) => {
        const finalAmount = payAmount || Number(amount);
        if (!finalAmount || finalAmount <= 0) { alert("Please enter a valid amount."); return; }
        if (!name.trim()) { alert("Please enter your name."); return; }

        setLoading(true);
        const loaded = await loadRazorpayScript();
        if (!loaded) { alert("Failed to load Razorpay. Check your connection."); setLoading(false); return; }

        const res = await fetch("/api/razorpay", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ amount: finalAmount }),
        });
        const order = await res.json();
        if (!order || order.error) { alert("Failed to create payment order. Please try again."); setLoading(false); return; }

        const donorName = name.trim();
        const donorMessage = message.trim();

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: "Get Me a Drink 🍺",
            description: donorMessage || `Donation by ${donorName}`,
            order_id: order.id,
            handler: async function (response) {
                try {
                    await fetch("/api/payment", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            toUsername: username,
                            name: donorName,
                            amount: finalAmount,
                            message: donorMessage,
                            razorpayOrderId: order.id,
                            razorpayPaymentId: response.razorpay_payment_id,
                        }),
                    });
                } catch (err) { console.error("Error saving payment:", err); }

                setSupporters((prev) => [{
                    name: donorName, amount: finalAmount,
                    message: donorMessage || "Keep it up! 🎉",
                    razorpayPaymentId: response.razorpay_payment_id,
                    createdAt: new Date().toISOString(),
                }, ...prev]);

                setAmount(""); setName(""); setMessage("");
                alert(`🎉 Thank you ${donorName}! Payment of ₹${finalAmount} successful!`);
            },
            prefill: { name: donorName },
            theme: { color: "#6D28D9" },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
        setLoading(false);
    };

    const displayName = userData?.name || username;
    const profilePic = userData?.profilePic ||
        "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2R5bW1iZ3BlaTBlN3RraTBmdGg4ZXZmazBrM3lpcXNsd3l4dzUwZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/UQ1EI1ML2ABQdbebup/giphy.gif";
    const coverPic = userData?.coverPic ||
        "https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3Ijo5NjAsIndlIjoxfQ%3D%3D/20.gif?token-hash=W5oXp7-eTHGeo5faGxH32REkRN1KtwJUsnymAC7z_kA%3D&token-time=1772582400";

    return (
        <>
            {/* Cover + Avatar */}
            <div className='cover w-full relative'>
                <img src={coverPic} alt="Cover" className='object-cover w-full h-48 sm:h-64 md:h-[350px]' />
                <div className="absolute bottom-0 translate-y-1/2 left-1/2 -translate-x-1/2">
                    <img src={profilePic} alt="Profile" className='w-16 h-16 sm:w-24 sm:h-24 rounded-full border-4 border-white object-cover' />
                </div>
            </div>

            {/* Profile Info */}
            <div className="info flex justify-center items-center mt-12 sm:mt-16 flex-col gap-2 px-4 text-center">
                {profileLoading ? (
                    <div className="text-slate-400 text-lg animate-pulse">Loading profile…</div>
                ) : (
                    <>
                        <div className='font-bold text-2xl sm:text-3xl'>@{username}</div>
                        <div className='text-slate-400 font-semibold text-base sm:text-lg'>{displayName}</div>
                        <div className='text-slate-500 font-bold text-sm'>
                            {supporters.length} supporter{supporters.length !== 1 ? 's' : ''}
                        </div>
                    </>
                )}

                {/* Payment Section — stacks on mobile, side-by-side on md+ */}
                <div className="payment flex flex-col md:flex-row gap-4 w-full max-w-4xl mt-6 mb-10">

                    {/* Supporters Panel */}
                    <div className="supporters bg-slate-900 w-full md:w-1/2 rounded-2xl p-4">
                        <h1 className='font-bold p-2 text-xl sm:text-2xl'>Supporters:-</h1>
                        {supporters.length === 0 ? (
                            <p className='text-slate-500 p-3 italic text-sm'>No supporters yet. Be the first! 🍺</p>
                        ) : (
                            <ul className='p-2 flex flex-col gap-3 max-h-96 overflow-y-auto'>
                                {supporters.map((s, i) => (
                                    <li key={s._id || i} className='flex items-start gap-2 bg-slate-800 rounded-xl p-3'>
                                        <img src="/avatar.gif" alt="Avatar" width={28} className="mt-1 rounded-full shrink-0" />
                                        <div className='text-sm'>
                                            <span className='font-bold text-white'>{s.name}</span>
                                            <span className='text-slate-300'> donated </span>
                                            <span className='font-bold text-green-400'>₹{s.amount}</span>
                                            {s.message && (
                                                <p className='text-slate-400 mt-1 italic text-xs'>&quot;{s.message}&quot;</p>
                                            )}
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Make a Payment Panel */}
                    <div className="makePayment bg-slate-900 w-full md:w-1/2 rounded-2xl p-4">
                        <h1 className='text-xl sm:text-2xl font-bold my-4'>Make a Payment</h1>
                        <div className="flex flex-col gap-3">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className='w-full rounded-lg bg-slate-800 placeholder:text-slate-400 p-3 text-white text-sm'
                                placeholder="Enter Amount (₹)"
                            />
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className='w-full rounded-lg bg-slate-800 placeholder:text-slate-400 p-3 text-white text-sm'
                                placeholder="Enter Your Name"
                            />
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className='w-full rounded-lg bg-slate-800 placeholder:text-slate-400 p-3 text-white text-sm'
                                placeholder="Enter a Message (optional)"
                            />
                            <button
                                onClick={() => handlePayment(null)}
                                disabled={loading}
                                className='bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-3 py-3 rounded-lg font-bold text-white text-sm'
                            >
                                {loading ? "Processing..." : "Donate 💸"}
                            </button>
                        </div>

                        {/* Quick Amount Buttons */}
                        <div className='mt-4 flex gap-2 flex-wrap'>
                            {[10, 20, 30].map((val) => (
                                <button
                                    key={val}
                                    onClick={() => { setAmount(val); handlePayment(val); }}
                                    className="bg-linear-to-br from-green-400 to-blue-600 text-white hover:opacity-90 p-3 rounded-lg font-semibold text-sm flex-1"
                                >
                                    Pay ₹{val}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
