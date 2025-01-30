import prisma from '@/lib/prisma';
import { NextResponse, NextRequest } from 'next/server'

export async function GET(request: Request) { 

    // await prisma.languaje.createMany({
    //     data: 
    // })

    // await prisma.technology.createMany({
    //     data: 
    // })

  return new Response(JSON.stringify({
    message: 'Hello World'
  }), { status: 200 } );
}