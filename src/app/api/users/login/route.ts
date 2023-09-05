import { signJWT } from '@/libs/jwt';
import connectMongoDB from '@/libs/mongodb';
import User from '@/models/user';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { compare } from 'bcryptjs';
import { type UserRequestData, type UserModel } from '@/types/user';
import invalidCredentialsResponse from '@/utils/errors/invalid-credentials-response';

export async function POST(request: Request) {
  try {
    const { email, password }: UserRequestData = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Todos os campos são obrigatórios.' },
        {
          status: 400,
        },
      );
    }

    await connectMongoDB();

    const user: UserModel | null = await User.findOne({ email });

    if (!user) {
      return invalidCredentialsResponse();
    }

    const doesPasswordMatches = await compare(password, user.passwordHash);

    if (!doesPasswordMatches) {
      return invalidCredentialsResponse();
    }

    const token = await signJWT({ sub: user._id }, { exp: '24h' });

    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    cookies().set('bbc-token', token, {
      path: '/',
      secure: true,
      expires,
      sameSite: true,
      httpOnly: true,
    });

    return NextResponse.json(
      { user: user.email },
      {
        status: 200,
      },
    );
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      { message: 'Ocorreu um erro ao fazer login.' },
      {
        status: 400,
      },
    );
  }
}
