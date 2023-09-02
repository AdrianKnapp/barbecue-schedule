import { barbecueListMock } from '@/mocks/barbecue'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: Request) {
  return NextResponse.json({ barbecues: barbecueListMock})
}
