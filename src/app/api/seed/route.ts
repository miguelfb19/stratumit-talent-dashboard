import prisma from '@/lib/prisma';
import { LanguajeLevel } from '@prisma/client';
import { NextResponse, NextRequest } from 'next/server'
import { languajes } from '@/seed/seed-data';

export async function GET(request: NextRequest) { 

  // First delete all the data
  await prisma.languaje.deleteMany();

  for (const languaje of languajes) {
    await prisma.languaje.create({
      data: {
        name: languaje.name,
        level: languaje.level as LanguajeLevel
      }
    });
  }

    // await prisma.technology.createMany({
    //     data: 
    // })

  return NextResponse.json({ message: 'Seed executed successfully' });
}