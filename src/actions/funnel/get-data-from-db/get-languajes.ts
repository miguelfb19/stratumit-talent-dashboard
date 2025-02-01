'use server'

import prisma from "@/lib/prisma";


export const getLanguajesFromDb = async (profileId:string)=>{
    try {
        const data = await prisma.profile.findFirst({
          where: {
            id: profileId,
          },
          select: {
            languajes: true,
          },
        });
    
        if (!data || data.languajes.length === 0) {
          return {
            ok: false,
            message: "User has not languajes registered",
          };
        }
        // TODO: Los lenguajes deben revisar en la tabla de lenguajes ya que en el perfil esta relacionado con la tabla intermedia
    
        return {
            ok: true, 
            message: "Motivation text retrieved",
            languajes: data.languajes
        }
      } catch (error) {
        return {
          ok: false,
          message: "Error getting motivation text",
          errorDetail: error,
        };
      }
}