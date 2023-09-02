import { barbecueListMock } from '@/mocks/barbecue';
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request, {
  params
}: {
  params: {
    id: string
  }
} ) {
  const { id } = params;

  const barbecue = barbecueListMock.find(barbecue => barbecue.id === Number(id));

  if (!barbecue) {
    return NextResponse.next()
  }

  const date = new Date(barbecue.date)

  const dateFormatted = `${date.getDate()}/${date.getMonth() + 1}`

  return NextResponse.json({ barbecue: {
    ...barbecue,
    amountRaised: barbecue.guests.reduce((acc, guest) => acc + guest.contribution, 0),
    date: dateFormatted,
  } })
}
