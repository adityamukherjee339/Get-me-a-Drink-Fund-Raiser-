import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    profilePic: {
        type: String,
        default: '',
    },
    coverPic: {
        type: String,
        default: 'https://c10.patreonusercontent.com/4/patreon-media/p/campaign/4842667/452146dcfeb04f38853368f554aadde1/eyJ3Ijo5NjAsIndlIjoxfQ%3D%3D/20.gif?token-hash=W5oXp7-eTHGeo5faGxH32REkRN1KtwJUsnymAC7z_kA%3D&token-time=1772582400',
    },
    razorpayId: {
        type: String,
        default: '',
    },
    razorpaySecret: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Prevent model re-compilation in Next.js hot-reload
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;
