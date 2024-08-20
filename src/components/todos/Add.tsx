import Button from "../button/Button";
import Form from "../form/Form";
import Input from "../input/Input";
import {addTodos} from "../../apis/todos"
import { useMutation,useQueryClient } from "react-query";
import { AxiosResponse } from "axios";



const AddTodo = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation<AxiosResponse, Error, {title:string; description:string}>(addTodos, {
        onSuccess: () => {
          // Query Invalidations
          queryClient.invalidateQueries("todos");
        }
      });
  return (
    <div>
      <Form onSubmit={(e)=>{
        e.preventDefault()
        const target = e.target as HTMLFormElement;
        const todoTitle = (target.todoTitle as HTMLInputElement).value;
        if(!todoTitle) return 
        mutation.mutate({title:todoTitle, description:''})
      }}>
        <div className="flex gap-4 items-center">
          <Input name="todoTitle" type="text" placeholder="Add Todo Here..." />
          <Button type="submit" text="Add" bgColor="bg-blue-600" />
        </div>
      </Form>
    </div>
  );
};

export default AddTodo;