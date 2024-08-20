"use client";

import Form from "../form/Form";
import Input from "../input/Input";
import Button from "../button/Button";
import { useState } from "react";
import { todoProps } from "@/types";
import { MdEdit } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { AxiosResponse } from "axios";
import {updateTodo} from "../../apis/todos"


const EditTodo = ({ todo }: { todo: todoProps }) => {
  const queryClient = useQueryClient()
  const mutation = useMutation<AxiosResponse, Error, {id:string; updatedTodo:{title:string; completed:boolean}}>(updateTodo, {
      onSuccess: () => {
        // Query Invalidations
        queryClient.invalidateQueries("todos");
      }
    });
  const [editTodoState, setEditTodoState] = useState(false);

  const handleEdit = () => {
    if (todo.completed) {
      return;
    }
    setEditTodoState(!editTodoState);
  };

  return (
    <div className="flex gap-5 items-center">
      <Button onClick={handleEdit} text={<MdEdit />} actionButton />
      {editTodoState ? (
        <Form  onSubmit={(e)=>{
          e.preventDefault()
          const target = e.target as HTMLFormElement;
          const todoTitle = (target.newTitle as HTMLInputElement).value;
          const updatedData = {
            id:todo.id,
            updatedTodo:{
              title:todoTitle,
              completed:todo.completed
            }
          }
          mutation.mutate(updatedData)
          setEditTodoState(false);
        }}>
          <Input name="inputId" value={todo.id} type="hidden"></Input>
          <div className="flex justify-center ">
            <Input type="text" name="newTitle" placeholder="Edit Todo..." />
            <Button type="submit" text="save"></Button>
          </div>
        </Form>
      ) : null}
    </div>
  );
};

export default EditTodo;