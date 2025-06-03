import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db();

    await db.collection('contacts').insertOne({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password, // Store password (hash in production)
      option: data.option,
      message: data.message || '',
      phone: data.phone || '',
      other: data.other || '',
      createdAt: new Date(),
      replies: [],
      hasReply: false
    });

    await client.close();

    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
