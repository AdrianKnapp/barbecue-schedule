import connectMongoDB from '@/libs/mongodb';
import Barbecue from '@/models/barbecue';
import { type Barbecue as BarbecueModel } from '@/types/barbecue';
import priceFormatter from '@/utils/price-formatter';
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

  const response = await Barbecue.findOne({
    _id: id,
  });

  const barbecue = response.toObject();

  const { price: {
    drinkIncluded,
    drinkNotIncluded,
  } } = barbecue;

  return NextResponse.json({ barbecue: {
    ...barbecue,
    price: {
      drinkIncluded: priceFormatter.format(drinkIncluded),
      drinkNotIncluded: priceFormatter.format(drinkNotIncluded),
    }
  } as BarbecueModel }, {
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
