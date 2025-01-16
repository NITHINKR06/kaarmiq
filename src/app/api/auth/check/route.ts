import { NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromToken';

export async function GET(request: Request) {
    const { isAuthenticated } = getDataFromToken(request as any);
    return NextResponse.json({ isAuthenticated });
}
