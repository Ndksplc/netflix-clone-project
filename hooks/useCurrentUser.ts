import useSWR from "swr";
import fetcher from "@/lib/fetcher";

const useCurrentUser = ()=>{
  
  const {data, error, isValidating, mutate} = useSWR('/api/current',fetcher);
  

  return {
    data, 
    error, 
    isValidating,
     mutate,
  }
};

export default useCurrentUser;