import { NextResponse } from 'next/server';

const unauthorizedResponse = () => {
  return NextResponse.json(
    {
      message: 'Unauthorized.',
    },
    {
      status: 403,
    },
  );
};

export default unauthorizedResponse;
