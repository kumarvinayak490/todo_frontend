import { todoProps } from "@/types";
import React from "react";
import Form from "../form/Form";
import Input from "../input/Input";
import Button from "../button/Button";
import { FaTrash } from "react-icons/fa";
import { useMutation, useQueryClient } from "react-query";
import { AxiosResponse } from "axios";
import {deleteTodo} from "../../apis/todos"


const DeleteTodo = ({ todo }: { todo: todoProps }) => {
  const queryClient = useQueryClient()
    const mutation = useMutation<AxiosResponse, Error, {id:string}>(deleteTodo, {
        onSuccess: () => {
          // Query Invalidations
          queryClient.invalidateQueries("todos");
        }
      });
  return (
    <Form onSubmit={ (e)=>{
      e.preventDefault()
      mutation.mutate({id:todo.id})
    }}>
      <Input type="hidden" name="inputId" value={todo.id}></Input>
      <Button
        actionButton
        type="submit"
        bgColor="bg-red-400"
        text={<FaTrash />}
      ></Button>
    </Form>
  );
};

export default DeleteTodo;