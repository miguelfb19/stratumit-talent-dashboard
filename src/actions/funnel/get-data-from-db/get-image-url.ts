'use server'

import prisma from "@/lib/prisma";

export const getImageUrl = async (profileId:string) =>{

    try {
        const data = await prisma.profile.findFirst({
          where: {
            id: profileId,
          },
          select: {
            imageUrl: true,
          },
        });
    
        if (!data || data.imageUrl === "") {
          return {
            ok: false,
            message: "Profile has not image URL registered",
          };
        }
    
        return {
            ok: true, 
            message: "Image URL retrieved",
            imageUrl: data.imageUrl
        }
      } catch (error) {
        return {
          ok: false,
          message: "Error getting image URL",
          errorDetail: error,
        };
      }
}