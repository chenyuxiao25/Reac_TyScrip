import { useQuery, UseQueryOptions } from "@tanstack/react-query"
import { movieApi } from "../api/movie.api"
import { DataListMovie } from "../interfaces/movie.interface"

type useListMovieOptions = Omit<UseQueryOptions<DataListMovie>,"queryKey"|"queryFn" >

export const useListMovies = (currenPage:any , options ?:useListMovieOptions) => { 

      const queryResult = useQuery({
        queryKey: ["list-movie",{currenPage}],
        queryFn: () => movieApi.getListMovie<DataListMovie>({ page: currenPage }),   
        ...options
        // gcTime: 1000 * 60 * 5,
        // staleTime: 100 * 60 * 3,
      })
    
    
    return  queryResult
 }