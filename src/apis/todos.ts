import { post, get, patch, put, del } from "./index";


type TODO = {

}

export const addTodos = <T>({
    title,
    description,
  }: {
    title: string;
    description: string;
  }) => {
    return post<T>("/create_todo", { title, description });
  };

  export const deleteTodo = <T>({
    id
  }: {
    id:string
  }) => {
    return del<T>(`/todos/${id}`);
  };


  export const changeStatus = <T>({
    id,
    status
  }: {
    id: string;
    status:boolean
  }) => {
    return put<T>(`/change_status/${id}`, {completed:status});
  };

  export const getTodos = <T>() => {
    return get<T>("/todos");
  };

  export const updateTodo = <T>({
    id,
    updatedTodo
  }: {
    id: string;
    updatedTodo:{title:string; completed:boolean}
  }) => {
    return put<T>(`/update_todo/${id}`, updatedTodo);
  };

 