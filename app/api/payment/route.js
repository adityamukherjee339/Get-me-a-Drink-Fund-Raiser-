import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Payment from '@/models/Payment';

// GET: fetch all supporters for a given username
// e.g. GET /api/payment?username=aditya123
export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const username = searchParams.get('username');

        if (!username) {
            return NextResponse.json({ error: 'Username is required' }, { status: 400 });
        }

        const payments = await Payment.find({ toUsername: username })
            .sort({ createdAt: -1 }); // newest first

        return NextResponse.json(payments);
    } catch (error) {
        console.error('Error fetching payments:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// POST: save a new payment/donation
// Body: { toUsername, name, amount, message, razorpayOrderId, razorpayPaymentId }
export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const { toUsername, name, amount, message, razorpayOrderId, razorpayPaymentId } = body;

        if (!toUsername || !name || !amount) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        const payment = await Payment.create({
            toUsername,
            name,
            amount,
            message: message || '',
            razorpayOrderId: razorpayOrderId || '',
            razorpayPaymentId: razorpayPaymentId || '',
        });

        return NextResponse.json({ message: 'Payment saved!', payment });
    } catch (error) {
        console.error('Error saving payment:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
