import { NextResponse } from 'next/server';

const unauthorizedResponse = () => {
  return NextResponse.json(
    {
      error: 'Unauthorized.',
    },
    {
      status: 403,
    },
  );
};

export default unauthorizedResponse;
