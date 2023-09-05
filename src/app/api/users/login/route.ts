import { signJWT } from '@/libs/jwt';
import connectMongoDB from '@/libs/mongodb';
import User from '@/models/user';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { type UserRequestData, type UserModel } from '@/types/user';

const invalidCredentialsResponse = NextResponse.json(
  { error: 'Credenciais inválidas.' },
  {
    status: 403,
  },
);

export async function POST(request: Request) {
  const { email, password }: UserRequestData = await request.json();

  if (!email || !password) {
    return NextResponse.next();
  }

  await connectMongoDB();

  const user: UserModel | null = await User.findOne({ email });

  if (!user) {
    return invalidCredentialsResponse;
  }

  const doesPasswordMatches = await compare(password, user.passwordHash);

  if (!doesPasswordMatches) {
    return invalidCredentialsResponse;
  }

  const token = await signJWT({ sub: user._id }, { exp: '1h' });

  cookies().set('bbc-token', token);

  return NextResponse.json(
    { user: user.email },
    {
      status: 201,
    },
  );
}
