import { NextResponse } from 'next/server';
import { MongoClient, ObjectId } from 'mongodb';

export async function POST(req: Request) {
  const authHeader = req.headers.get('Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { contactId, email, reply } = await req.json();
  
  try {
    const client = new MongoClient(process.env.MONGODB_URI!);
    await client.connect();
    const db = client.db();

    await db.collection('contacts').updateOne(
      { _id: new ObjectId(contactId) },
      {
        $push: {
          replies: {
            adminReply: reply,
            repliedAt: new Date(),
            repliedBy: 'Admin'
          }
        },
        $set: { hasReply: true }
      }
    );

    await client.close();
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Database error' }, { status: 500 });
  }
}
