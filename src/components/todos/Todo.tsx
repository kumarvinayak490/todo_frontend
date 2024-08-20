
import { todoProps } from "@/types";
import ChangeTodo from "./ChangeTodo";
import EditTodo from "./EditTodo";
import DeleteTodo from "./DeleteTodo";



const Todo = ({ todo }: { todo: todoProps }) => {

  const todoStyle = {
    textDecoration: todo.completed === true ? "line-through" : "none",
    opacity: todo.completed === true ? 0.5 : 1,
  };

  return (
    <div
      style={todoStyle}
      className="w-10/12 mx-auto flex items-center justify-between bg-slate-300 py-4 px-20 rounded-2xl"
    >
      <ChangeTodo todo={todo} />
      <span className="text-center font-bold uppercase grow">{todo.title}</span>
      <div className="flex items-center mx-2">
        <EditTodo todo={todo} />
      </div>

      <div className="flex items-center ">
        <DeleteTodo todo={todo} />
      </div>
    </div>
  );
};

export default Todo;