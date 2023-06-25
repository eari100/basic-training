import {useEffect, useRef, useState} from "react";
import {deleteTodos, getTodos, patchTodos, saveTodos} from "./api/todosApi";
import {Todos} from "./interface/todosInterface";

export const Todo = () => {
    const [todoList, setTodoList] = useState<Todos[]>([]);
    const newTodoRef = useRef<HTMLInputElement>(null);
    const [editId, setEditId] = useState<number | null>(null);
    const editTodoRef = useRef<HTMLInputElement>(null);

    const fetchTodoList = () => {
        getTodos()
            .then(data => setTodoList(data))
            .catch(error => alert(`todo 리스트 조회 오류 발생: ${error}`))
    }

    const addTodo = () => {
        const newTodoValue = newTodoRef.current?.value

        if (newTodoValue) {
            saveTodos(newTodoValue)
                .then(() => {
                    fetchTodoList()
                    newTodoRef.current!.value = ''
                })
                .catch(error => alert(`todo 리스트 등록 오류 발생: ${error}`))
        } else {
            alert('할 일을 추가 해주세요')
        }
    }

    const startEditing = (id: number) => {
        setEditId(id);
    }

    const editTodo = (id: number) => {
        const editedTodoValue = editTodoRef.current?.value

        if(editedTodoValue) {
            patchTodos(id, editedTodoValue)
                .then(() => {
                    fetchTodoList()
                    setEditId(null)
                    editTodoRef.current!.value = ''
                })
                .catch(error => alert(`todo 리스트 수정 오류 발생: ${error}`))

        }
    }

    const deleteTodo = (id: number) => {
        const confirmDelete = window.confirm("정말로 삭제하시겠습니까?")

        if (confirmDelete) {
            deleteTodos(id)
                .then(() => fetchTodoList())
                .catch(error => alert(`todo 리스트 수정 오류 발생: ${error}`))
        }
    };

    const cancelEditing = () => {
        setEditId(null);
    }


    useEffect(() => {
        fetchTodoList()
    }, [])

    const renderDefaultItem = (id: number, item: string) => {
        return (
            <div key={id}>
                <li>{item}</li>
                <button onClick={() => startEditing(id)}>수정</button>
                <button onClick={() => deleteTodo(id)}>삭제</button>
            </div>
        )
    }

    const renderEditingItem = (id: number, item: string) => {
        return (
            <div key={id}>
                <input
                    type="text"
                    defaultValue={item}
                    ref={editTodoRef}
                />
                <button onClick={() => editTodo(id)}>완료</button>
                <button onClick={cancelEditing}>취소</button>
            </div>
        )
    }

    return (
        <>
            <input type="text" ref={newTodoRef} />
            <button onClick={addTodo}>추가</button>
            {
                todoList.map(todo => {
                    const id = todo.id
                    const item = todo.item

                    return editId !== id ? renderDefaultItem(id, item) : renderEditingItem(id, item)
                })
            }
        </>
    );
}