import AddTodo from './components/AddTodo';
import ListTodos from './components/ListTodos';
import { ContextProvider } from './context/TodoContext';
export default function Home() {
	return (
		<>
			<ContextProvider>
				<ListTodos />
				<AddTodo />
			</ContextProvider>
		</>
	);
}
