import React, { FC, ReactElement, useCallback, useEffect, useReducer, useState } from 'react'
import TdInput from './Input'
import TdList from './List'
import { ITodo, IState, ACTION_TYPE } from './typings'
import { todoReducer } from './reducer'
import { stat } from 'fs'

// const initialState: IState = {
//     todoList: []
// }

function init (initTodoList: ITodo[]): IState {
    return {
        todoList: initTodoList
    }
}

const TodoList: FC = (): ReactElement => {
    // const [todoList, setTodoList] = useState<ITodo[]>([])

    // useEffect(() => {
    //     console.log(todoList)
    // }, [todoList])

    // const addTodo = useCallback((todo: ITodo) => {
    //     setTodoList(todoList => [...todoList, todo])
    // }, [])

    const [state, dispatch] = useReducer(todoReducer, [], init)

    useEffect(() => {
        console.log(state.todoList);
    }, [state.todoList])

    const addTodo = useCallback((todo: ITodo) => {
        dispatch({
            type: ACTION_TYPE.ADD_TODO,
            payload: todo
        })
    }, [])

    const removeTodo = useCallback((id: number): void => {
        dispatch({
            type: ACTION_TYPE.REMOVE_TODO,
            payload: id
        })
    }, [])

    const toggleTodo = useCallback((id: number): void => {
        dispatch({
            type: ACTION_TYPE.TOGGLE_TODO,
            payload: id
        })
    }, [])

    return (
        <div className="todo-list">
            <TdInput
                addTodo={addTodo}
                todoList={state.todoList}
            />
            <TdList
                todoList={state.todoList}
                removeTodo={removeTodo}
                toggleTodo={toggleTodo} />
        </div>
    )
}

export default TodoList;