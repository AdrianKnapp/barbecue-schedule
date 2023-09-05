import connectMongoDB from '@/libs/mongodb';
import Barbecue from '@/models/barbecue';
import unauthorizedResponse from '@/utils/errors/unauthorized-response';
import getUserIdFromHeaders from '@/utils/get-user-id-from-headers';
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

  const userId = getUserIdFromHeaders(request);
  if (!userId) return unauthorizedResponse();

  await connectMongoDB();

  try {
    const barbecue = await Barbecue.findOne({
      _id: id,
      userId,
    });

    return NextResponse.json(
      {
        barbecue,
      },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        message: 'Barbecue not found.',
      },
      {
        status: 404,
      },
    );
  }
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

  const userId = getUserIdFromHeaders(request);
  if (!userId) return unauthorizedResponse();

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
