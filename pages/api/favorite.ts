import { NextApiRequest,NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(req: NextApiRequest,resp:NextApiResponse){
  try{
   console.log('dans try favorite');
    if(req.method ==='POST'){
       
      const { currentUser } = await serverAuth(req,resp);
      const { movieId } = req.body;
      const existingMovie = await prismadb.movie.findUnique({
        where:{
          id: movieId,
        }
      });
      if(!existingMovie){
        throw new Error('invalid ID');
      }
      const user = await prismadb.user.update({
        where:{
          email: currentUser.email || '',
        },
        data:{
          favoriteIds:{
            push: movieId
          }
        }
      });
      return resp.status(201).json(user);
    };

    if(req.method ==='DELETE'){
      const {currentUser} = await serverAuth(req,resp);
      const {movieId} = req.body;

      const existingMovie = await prismadb.movie.findUnique({
        where:{
          id: movieId
        }
      });
      if(!existingMovie){
        throw new Error('Invalid ID');
      }
      const updatedFavoriteIds = without(currentUser.favoriteIds, movieId);
      const updateUser = await prismadb.user.update({
        where:{
          email : currentUser.email || ''
        },
        data:{
          favoriteIds: updatedFavoriteIds
        }
      });
      return resp.status(204).json(updateUser);
    }
    return resp.status(405).end();
  }catch(error){
    console.log(error);
    return resp.status(400).end();
  }
}