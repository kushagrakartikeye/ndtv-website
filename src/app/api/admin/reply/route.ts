import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export async function POST(req: Request) {
  // Authorization check
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Environment validation
  if (!process.env.MONGODB_URI) {
    return NextResponse.json({ error: 'Database configuration error' }, { status: 500 });
  }

  // Parse request
  const { contactId, reply } = await req.json();
  
  const client = new MongoClient(process.env.MONGODB_URI);
  try {
    await client.connect();
    const db = client.db();

    // Update contact with reply
    await db.collection('contacts').updateOne(
      { _id: new ObjectId(contactId) },
      {
        $push: {
          replies: {
            adminReply: reply,
            repliedAt: new Date(),
            repliedBy: 'Admin'
          }
        } as any, // Bypass TypeScript strictness
        $set: { hasReply: true }
      }
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[ADMIN REPLY ERROR]', error);
    return NextResponse.json({ error: 'Database operation failed' }, { status: 500 });
  } finally {
    await client.close();
  }
}
