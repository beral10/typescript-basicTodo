'use client';
import React, { useContext, useRef, useState } from 'react';
import { Todo, TodoContext } from '../context/TodoContext';

const ListTodos = () => {
	const todoCtx = useContext(TodoContext);

	const refModifiedTextInput = useRef<HTMLInputElement>(null);

	const [modifyTodo, setModifyTodo] = useState<{id: string, isEditing: boolean} | null>(null);
	const [paragraphTodoId, setparagraphTodoId] = useState<Array<string>>([])
	


	const editHandler = (todo: Todo) => {
		setModifyTodo({id: todo.id, isEditing: true});

		if(modifyTodo?.isEditing && (modifyTodo.id === todo.id) && refModifiedTextInput.current?.value && refModifiedTextInput.current?.value !== todo.text) {
			todoCtx?.modifyTodo({id: todo.id, text: refModifiedTextInput.current.value});
			setModifyTodo(null)
		}
	}
	
	// Evitar realizar este tipo de manipulación directa dem DOM. Mala práxis. 
	/* const selectTodoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
		if(event.target.checked && event.target.id === refTextTodo.current?.id){
			refTextTodo.current.classList.add("line-through");
		} else {
			refTextTodo.current?.classList.remove("line-through");
		}
	} */

	const selectTodoHandler = (event: React.ChangeEvent<HTMLInputElement>) => {

		const currentCheckboxTodoId = event.target.id;

		if(event.target.checked){
			setparagraphTodoId( (prev) => [...prev, currentCheckboxTodoId])
		} else {
			setparagraphTodoId((prevTodoId) => {
				return prevTodoId.filter( todoId => todoId != currentCheckboxTodoId);
			})
		}
	}

;	return (
		<div>
			<ul>
				{
					todoCtx?.todos.map((todo) => {
						const todoText: string = todo.text;
						const limitedTodoText = todoText.length > 13 ? todoText.slice(0, 13) + '...' : todoText;

						const isEditing = todo.id === modifyTodo?.id && modifyTodo.isEditing;

						console.log(todo);

						return (
							<li className='w-full flex items-center justify-between space-x-[22px]' key={todo.id}>
								<div className='flex items-center gap-x-[22px] flex-1'>
									<input onChange={selectTodoHandler} id={todo.id} type='checkbox' className='w-[25px] h-[25px] border-2 border-gray-400 checked:border-blue-500' />
									<div className='relative group w-full'>
										{
											isEditing 
											? <input ref={refModifiedTextInput} className={'text-[20px] leading-[30px] bg-gray-300'} defaultValue={todoText} type="text"/> 
											: <p className={`text-[20px] m-0 p-0 leading-[30px] cursor-default ${paragraphTodoId.includes(todo.id) ? 'line-through' : null}`}>{limitedTodoText}</p>
										}
										<p className={`text-[14px] leading-[18px] px-[10px] text-white absolute left-1/2 -top-1/2 transform -translate-x-1/2 hidden ${todoText.length > 13 ? 'group-hover:block' : null} bg-slate-600 rounded-sm z-10`}>{todoText}
										</p>
									</div>
								</div>
								<div className='space-x-[10px]'>
									<button
										type='button'
										id={todo.id}
										className='w-[90px] h-[52px] border-2 border-[#868585] bg-[#eeeeee] rounded-md text-3xl cursor-pointer'
										onClick={() => editHandler(todo)}>
										{
											isEditing ? "Save" : "Edit"
										}
									</button>
									<button 
										type='button' 
										className='w-[141px] h-[52px] border-2 border-[#868585] bg-[#eeeeee] rounded-md text-3xl cursor-pointer' 
										onClick={() => todoCtx.deleteTodo(todo.id)}>
											Delete
									</button>
								</div>
							</li>
						);
					})
				}
			</ul>
		</div>
	);
};

export default ListTodos;
