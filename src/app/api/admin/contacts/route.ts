import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function GET(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const token = authHeader.split(' ')[1];
  if (token !== 'dummy_admin_token') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db();

    // Fetch both collections
    const contacts = await db.collection('contacts').find().toArray();
    const subscribers = await db.collection('subscribers').find().toArray();

    await client.close();

    return NextResponse.json({ contacts, subscribers });
  } catch (err) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
