import { todoProps } from "@/types";
import Button from "../button/Button";
import Form from "../form/Form";
import Input from "../input/Input";
import { FaCheck } from "react-icons/fa";
import { BiCrosshair } from "react-icons/bi";
import { useMutation, useQueryClient } from "react-query";
import { AxiosResponse } from "axios";
import { changeStatus } from "@/apis/todos";

const ChangeTodo = ({ todo }: { todo: todoProps }) => {
    const queryClient = useQueryClient()
    const mutation = useMutation<AxiosResponse, Error, {id:string, status:boolean}>(changeStatus, {
        onSuccess: () => {
          // Query Invalidations
          queryClient.invalidateQueries("todos");
        }
      });
  return (
    <Form onSubmit={(e)=>{
        e.preventDefault()
        mutation.mutate({id:todo.id, status:!todo.completed})
    }} >
      <Input name="inputId" value={todo.id} type="hidden"></Input>
      <Button
        text={todo.completed ? <FaCheck /> : <BiCrosshair/>}
        type="submit"
        actionButton
        bgColor={todo.completed ? "bg-green-400" : "bg-blue-500"}
      ></Button>
    </Form>
  );
};

export default ChangeTodo;