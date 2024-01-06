import { NextApiResponse, NextApiRequest } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, resp: NextApiResponse){
  if(req.method !== 'GET'){
    return resp.status(405).end();
  }
  try{
    await serverAuth(req, resp);

    const movies = await prismadb.movie.findMany();
    return resp.status(200).json(movies);

  }catch(error){
    console.log(error);
    return resp.status(500).end();

  }
};
/*import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '@/lib/prismadb';
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') {
      return res.status(405).end();
    }

    await serverAuth(req, res);

    const movies = await prismadb.movie.findMany();

    return res.status(200).json(movies);
  } catch (error) {
    console.log({ error })
    return res.status(500).end();
  }
}*/