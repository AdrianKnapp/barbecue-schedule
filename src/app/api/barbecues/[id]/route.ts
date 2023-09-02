import connectMongoDB from '@/libs/mongodb';
import Barbecue from '@/models/barbecue';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) {
  const { id } = params;

  await connectMongoDB();

  const response = await Barbecue.findOne({
    _id: id,
  });

  const barbecue = response.toObject();

  return NextResponse.json(
    {
      barbecue: {
        ...barbecue,
      },
    },
    {
      status: 200,
    },
  );
}

export async function PATCH(
  request: Request,
  {
    params,
  }: {
    params: {
      id: string;
    };
  },
) {
  const { id } = params;

  const data = await request.json();

  await connectMongoDB();

  await Barbecue.findByIdAndUpdate(id, data);

  return NextResponse.json(
    {
      message: 'Barbecue updated successfully.',
    },
    {
      status: 200,
    },
  );
}
