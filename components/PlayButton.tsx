import React from "react";
import { useRouter } from "next/router";
import { FaPlay } from "react-icons/fa";
import Watch from "@/pages/watch/[movieId]";

interface PlayButtonProps{
  movieId: string;
}

const PlayButton: React.FC<PlayButtonProps> =({movieId}) =>{
  const router = useRouter();
  return(
    <button onClick={()=>router.push(`/watch/${movieId}`)} className="bg-white text-black rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition">
      <FaPlay size={25} className="mr-1" />
      Play
    </button>
  )
  

};
export default PlayButton;