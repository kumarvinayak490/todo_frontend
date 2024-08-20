import React from 'react'
import { useQuery, useQueryClient } from "react-query";
import { getTodos} from "../../apis/todos"
import { AxiosResponse } from 'axios';
import Todo from './Todo';

const Container = () => {

  const {data:todoData, isError} = useQuery('todos', async ()=>{
    try{
        const data = await getTodos<AxiosResponse>()
        return  data?.data?.user_todos || []
    }catch(err){
        return []
    }
})

  return (
    <div className="flex flex-col gap-5 items-center justify-center mt-10 w-screen">
          {todoData?.map((todo:any, id:number) => (
            <div className="w-full" key={id}>
              <Todo todo={todo} />
            </div>
          ))}
        </div>
  )
}

export default Container