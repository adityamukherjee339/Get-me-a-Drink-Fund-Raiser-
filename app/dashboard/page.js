"use client"
import React, { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Dashboard = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '', email: '', profilePic: '', coverPic: '',
    razorpayId: '', razorpaySecret: '',
  });
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchProfile = async () => {
        try {
          const res = await fetch('/api/profile');
          if (res.ok) {
            const data = await res.json();
            setForm({
              name: data.name || '', email: data.email || '',
              profilePic: data.profilePic || '', coverPic: data.coverPic || '',
              razorpayId: data.razorpayId || '', razorpaySecret: data.razorpaySecret || '',
            });
          }
        } catch (err) { console.error('Error loading profile:', err); }
      };
      fetchProfile();
    }
  }, [status]);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSave = async () => {
    setSaving(true); setSuccessMsg(''); setErrorMsg('');
    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) setSuccessMsg('✅ Profile saved successfully!');
      else setErrorMsg(data.error || 'Failed to save profile.');
    } catch (err) {
      setErrorMsg('Network error. Please try again.');
    } finally { setSaving(false); }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-[80vh] flex justify-center items-center">
        <div className="text-white text-xl animate-pulse">Loading dashboard…</div>
      </div>
    );
  }
  if (!session) return null;

  const fields = [
    { label: 'Name', name: 'name', type: 'text', placeholder: 'Your display name' },
    { label: 'Email', name: 'email', type: 'email', placeholder: 'your@email.com' },
    { label: 'Profile Picture URL', name: 'profilePic', type: 'text', placeholder: 'https://example.com/photo.jpg' },
    { label: 'Cover Picture URL', name: 'coverPic', type: 'text', placeholder: 'https://example.com/cover.jpg' },
    { label: 'Razorpay Key ID', name: 'razorpayId', type: 'text', placeholder: 'rzp_live_xxxxxxxxxx' },
    { label: 'Razorpay Key Secret', name: 'razorpaySecret', type: 'password', placeholder: '••••••••••••••••' },
  ];

  return (
    <div className='min-h-[80vh] flex justify-center items-start py-10 px-4'>
      <div className='w-full max-w-xl flex flex-col gap-5'>
        <div className="text-center mb-2">
          <h1 className='font-bold text-2xl sm:text-3xl'>Your Dashboard</h1>
          <p className='text-slate-400 text-sm mt-1'>Update your public profile details below</p>
        </div>

        {/* Username (read-only) */}
        <div className='flex flex-col gap-1'>
          <label className='font-bold text-sm text-slate-300'>Username</label>
          <input
            type="text"
            value={session.user.username || session.user.name}
            disabled
            className='w-full rounded-lg bg-slate-700 p-3 text-slate-400 cursor-not-allowed text-sm'
          />
          <span className='text-xs text-slate-500'>Set from your GitHub login — cannot be changed</span>
        </div>

        {/* Dynamic fields */}
        {fields.map((f) => (
          <div key={f.name} className='flex flex-col gap-1'>
            <label className='font-bold text-sm text-slate-300'>{f.label}</label>
            <input
              type={f.type}
              name={f.name}
              value={form[f.name]}
              onChange={handleChange}
              className='w-full rounded-lg bg-slate-800 placeholder:text-slate-400 p-3 text-white text-sm'
              placeholder={f.placeholder}
            />
          </div>
        ))}

        {successMsg && <div className='bg-green-700 text-white rounded-lg p-3 text-sm font-medium'>{successMsg}</div>}
        {errorMsg && <div className='bg-red-700 text-white rounded-lg p-3 text-sm font-medium'>{errorMsg}</div>}

        <button
          onClick={handleSave}
          disabled={saving}
          className='bg-green-500 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors px-4 py-3 rounded-lg font-bold text-white text-sm'
        >
          {saving ? 'Saving…' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}

export default Dashboard
