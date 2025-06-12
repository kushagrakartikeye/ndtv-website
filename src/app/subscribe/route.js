import { NextResponse } from "next/server";
import dbConnect from '../../lib/mongodb';
import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema({ email: { type: String, unique: true } });
const Subscriber = mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ message: 'Invalid email' }, { status: 400 });
    }
    await dbConnect();
    const existing = await Subscriber.findOne({ email });
    if (existing) return NextResponse.json({ message: 'Email already subscribed' }, { status: 409 });
    await Subscriber.create({ email });
    return NextResponse.json({ message: 'Subscribed successfully!' }, { status: 201 });
  } catch (err) {
    console.error('API error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
  }
}
