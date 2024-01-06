import { NextApiRequest,NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, resp:NextApiResponse){
  if(req.method !=='GET'){
    return resp.status(405).end();
  }
  try{
    const {currentUser} = await serverAuth(req,resp);
    const favoriteMovies = await prismadb.movie.findMany({
        where: {
          id:{
            in: currentUser?.favoriteIds,
          }

        }
      });
      return resp.status(200).json(favoriteMovies);

  }catch(error){
    console.log(error);
    return resp.status(400).end();
  }
 

}