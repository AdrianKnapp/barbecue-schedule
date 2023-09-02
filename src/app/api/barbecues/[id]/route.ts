import connectMongoDB from '@/libs/mongodb';
import Barbecue from '@/models/barbecue';
import { NextResponse } from 'next/server'

export async function GET(request: Request, {
  params
}: {
  params: {
    id: string
  }
} ) {
  const { id } = params;

  await connectMongoDB();

  const barbecue = await Barbecue.findOne({
    _id: id,
  });

  return NextResponse.json({ barbecue }, {
    status: 200,
  })
}

export async function PATCH(request: Request, {
  params
}: {
  params: {
    id: string
  }
} ) {
  const { id } = params;

  const data = await request.json();

  await connectMongoDB();

  await Barbecue.findByIdAndUpdate(id, data);

  return NextResponse.json({
    message: 'Barbecue updated successfully.'
  }, {
    status: 200,
  })
}
