import { type NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { data } = await axios.get(`https://www.freetogame.com/api/game?id=${id}`);
  return NextResponse.json(data);
}
