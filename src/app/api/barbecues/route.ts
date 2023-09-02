import connectMongoDB from '@/libs/mongodb'
import Barbecue from '@/models/barbecue';
import { type Barbecue as BarbecueModel } from '@/types/barbecue';
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  await connectMongoDB();

  const barbecues = await Barbecue.find();

  return NextResponse.json({ barbecues }, {
    status: 200,
  })
}

export async function POST(request: Request) {
  const barbecue = await request.json() as BarbecueModel;

  await connectMongoDB();

  const createdBarbecue = await Barbecue.create({
    ...barbecue,
  });

  return NextResponse.json({ barbecue: createdBarbecue }, {
    status: 201,
  })
}
