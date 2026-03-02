import mongoose from 'mongoose';

const PaymentSchema = new mongoose.Schema({
    // The page owner who received the donation
    toUsername: {
        type: String,
        required: true,
    },
    // The person who donated
    name: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    message: {
        type: String,
        default: '',
    },
    razorpayOrderId: {
        type: String,
        default: '',
    },
    razorpayPaymentId: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.models.Payment || mongoose.model('Payment', PaymentSchema);

export default Payment;
