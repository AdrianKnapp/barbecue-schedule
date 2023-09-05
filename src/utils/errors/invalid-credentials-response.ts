import { NextResponse } from 'next/server';

const invalidCredentialsResponse = () => {
  return NextResponse.json(
    {
      message: 'Credenciais inválidas.',
    },
    {
      status: 400,
    },
  );
};

export default invalidCredentialsResponse;
