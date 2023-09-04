import connectMongoDB from '@/libs/mongodb';
import User from '@/models/user';
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { type UserRequestData, type UserModel } from '@/types/user';

export async function POST(request: Request) {
  const { email, password }: UserRequestData = await request.json();

  if (!email || !password) {
    return NextResponse.json(
      { error: 'Há dados faltando.' },
      {
        status: 400,
      },
    );
  }

  await connectMongoDB();

  const user = await User.findOne({ email });

  if (user) {
    return NextResponse.json(
      { error: 'Usuário já existe.' },
      {
        status: 409,
      },
    );
  }

  const passwordHash = await hash(password, 6);
  const createdUser: UserModel = await User.create({
    email,
    passwordHash,
  });

  return NextResponse.json(
    { user: createdUser },
    {
      status: 200,
    },
  );
}
