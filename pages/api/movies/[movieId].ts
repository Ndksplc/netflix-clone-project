import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, resp: NextApiResponse){
  if(req.method !== 'GET'){
    return resp.status(405).end();
  }
  try{
    await serverAuth(req,resp);
    const {movieId} = req.query;
    if(typeof movieId !== 'string'){
      throw new Error('invalid ID');

    }
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      }
    });
    if(!movie){
      throw new Error('invalid ID');
    }
    return resp.status(200).json(movie);

  }catch(error){
    console.log(error);
    return resp.status(400).end();
  }
}