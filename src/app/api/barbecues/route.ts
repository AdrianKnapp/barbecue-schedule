import connectMongoDB from '@/libs/mongodb';
import Barbecue from '@/models/barbecue';
import { type BarbecueModel } from '@/types/barbecue';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  await connectMongoDB();

  const barbecues = await Barbecue.find();

  return NextResponse.json(
    { barbecues },
    {
      status: 200,
    },
  );
}

export async function POST(request: Request) {
  const barbecue: BarbecueModel = await request.json();

  await connectMongoDB();

  const dateArray = barbecue.date.split('-');
  dateArray.shift();
  const date = dateArray.reverse().join('/');

  const createdBarbecue: BarbecueModel = await Barbecue.create({
    ...barbecue,
    amountRaised: barbecue.guests.reduce((acc, guest) => acc + guest.contribution, 0),
    userId: '123',
    date,
  });

  return NextResponse.json(
    { barbecue: createdBarbecue },
    {
      status: 201,
    },
  );
}
