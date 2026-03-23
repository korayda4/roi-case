import { type NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const FTG_BASE = 'https://www.freetogame.com/api';

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get('category');
  const url = category
    ? `${FTG_BASE}/games?platform=browser&category=${category}`
    : `${FTG_BASE}/games?platform=browser`;

  const { data } = await axios.get(url);
  return NextResponse.json(data);
}
