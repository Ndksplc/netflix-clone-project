import bcrypt from 'bcrypt';
import { NextApiRequest, NextApiResponse } from 'next';
import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, resp:NextApiResponse){
  if(req.method !== 'POST' ){
    return resp.status(405).end();
  }
  try{
    const { email, name, password} = req.body;
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      }
    })
    if(existingUser){
      return resp.status(422).json({error: 'This Email already exist'});
    }
    const hashedPassword = await bcrypt.hash(password,12);
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image:'',
        emailVerified: new Date()
      }
    });
    console.log(user);
    return resp.status(200).json(user);

  } catch(error){
    console.log(error);
    return resp.status(400).end();
  }
}