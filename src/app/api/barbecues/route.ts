import connectMongoDB from '@/libs/mongodb';
import Barbecue from '@/models/barbecue';
import { type BarbecueModel } from '@/types/barbecue';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  await connectMongoDB();

  const headers = new Headers(request.headers);
  const userId = headers.get('user-id');

  const barbecues = await Barbecue.find({ userId });

  return NextResponse.json(
    { barbecues },
    {
      status: 200,
    },
  );
}

export async function POST(request: Request) {
  const barbecue: BarbecueModel = await request.json();

  const headers = new Headers(request.headers);
  const userId = headers.get('user-id');

  await connectMongoDB();

  const dateArray = barbecue.date.split('-');
  dateArray.shift();
  const date = dateArray.reverse().join('/');

  const createdBarbecue: BarbecueModel = await Barbecue.create({
    ...barbecue,
    amountRaised: barbecue.guests.reduce((acc, guest) => acc + guest.contribution, 0),
    date,
    userId,
  });

  return NextResponse.json(
    { barbecue: createdBarbecue },
    {
      status: 201,
    },
  );
}
