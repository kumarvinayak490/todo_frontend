import TodosContainer from "@/components/todos/Container";
import AddTodo from "../components/todos/Add";
import {
  QueryClient,
  QueryClientProvider,
} from 'react-query'

const queryClient = new QueryClient()
export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
    <div className="min-h-screen w-screen py-20 flex justify-center flex-col items-center">
      <span className="text-4xl font-extrabold uppercase">Todo App</span>
      <div className="flex justify-center flex-col items-center">
        <AddTodo />
        <TodosContainer/>
      </div>
    </div>
    </QueryClientProvider>
  );
}