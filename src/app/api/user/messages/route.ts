import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function POST(req: Request) {
  const { email, password } = await req.json();

  try {
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db();

    const messages = await db.collection('contacts')
      .find({
        email: email,
        password: password, // Verify password matches
        option: 'message'
      })
      .toArray();

    await client.close();

    return NextResponse.json({ messages });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
