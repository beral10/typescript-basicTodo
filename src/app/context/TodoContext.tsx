'use client';
import { createContext, useState } from 'react';

export type Todo = {
	id: string;
	text: string;
};

interface ContextValues {
	todos: Todo[];
	addTodo: (todo: Todo) => void;
	deleteTodo: (todoId: string) => void;
	modifyTodo: (todo: Todo) => void;
}

export const TodoContext = createContext<ContextValues | null>(null);

export const ContextProvider = ({ children }: { children: React.ReactNode }): React.ReactNode => {
	
	const [todos, setTodos] = useState<Array<Todo>>([]);

	const addTodo = (todo: Todo) => {
		setTodos((prev) => {
			return [...prev, todo];
		});

	};

	const deleteTodo = (todoId: string) => {
		/* const removeItem = todos.filter((todo) => todo.id != todoId);
    if(removeItem){
      setTodos(() => {
        return removeItem
      })
    } */
		setTodos((prevTodos) => {
			const removeItem = prevTodos.filter((todo) => todo.id != todoId);
			if (removeItem) {
				return removeItem;
			}
			return prevTodos;
		});
	};

	const modifyTodo = (todo: Todo) => {
		const modifyItem = todos.map((todoItem) => {
			if (todoItem.id === todo.id) {
				return { ...todo, text: todo.text };
			}
			return todoItem;
		});
		console.log(modifyItem);
		setTodos(modifyItem);
	};

	return <TodoContext.Provider value={{ todos, addTodo, deleteTodo, modifyTodo }}>{children}</TodoContext.Provider>;
};
