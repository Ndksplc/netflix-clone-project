import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from '@/lib/serverAuth';

export default async function handler(req: NextApiRequest, resp: NextApiResponse) {
  if(req.method !== 'GET'){
    return resp.status(405).end();
  }
  try{
    await serverAuth(req,resp);
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);
    const randomMovies = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex
    });
    return resp.status(200).json(randomMovies[0]);
  }catch(error){
    console.log(error)
    return resp.status(400).end();
  }

}