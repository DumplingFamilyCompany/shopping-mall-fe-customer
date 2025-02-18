import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  console.log(`🔥🔥🔥 header 테스트 🔥🔥🔥`);
  console.log(request.headers.get('authorization'));

  const authorizationHeader = request.headers.get('authorization');

  if (!!authorizationHeader) {
    return NextResponse.json([{ id: 1, name: 'MMM' }], {
      status: 200,
      statusText: 'haha',
    });
  }

  return NextResponse.json([], {
    status: 400,
    statusText: 'No Header',
  });
}
