'use client';
import React, { useContext, useRef } from 'react';
import { TodoContext } from '../context/TodoContext';

const AddTodo = () => {
	const addTodoCtx = useContext(TodoContext);
	const refTextTodo = useRef<HTMLInputElement>(null);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (refTextTodo.current?.value) {
			addTodoCtx?.addTodo({ id: crypto.randomUUID(), text: refTextTodo.current.value });
		}
		e.currentTarget.reset();
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='flex flex-col items-start gap-3'>
				<h3 className='text-4xl'>New Todo</h3>
				<input type='text' name='' ref={refTextTodo} className='w-full border-2 border-[#a7a7a7] h-[51px] rounded-md px-[15px]' />
				<button type='submit' className='w-full bg-[#e4e4e4] border-2 border[#2b2b2b] h-[51px] rounded-md text-3xl cursor-pointer'>
					Add Todo
				</button>
			</div>
		</form>
	);
};

export default AddTodo;
