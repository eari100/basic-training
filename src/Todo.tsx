import {useRef, useState} from "react";

export const Todo = () => {
    const [todoList, setTodoList] = useState<string[]>([]);
    const newTodoRef = useRef<HTMLInputElement>(null);
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const editTodoRef = useRef<HTMLInputElement>(null);

    const addTodo = () => {
        if(newTodoRef.current && newTodoRef.current.value) {
            setTodoList([...todoList, newTodoRef.current.value]);
            newTodoRef.current.value = ''
        }
    }

    const startEditing = (index: number) => {
        setEditIndex(index);
    };

    const editTodo = (index: number) => {
        const updatedTodoList = [...todoList]

        if(editTodoRef.current && editTodoRef.current.value) {
            updatedTodoList[index] = editTodoRef.current.value;
            setTodoList(updatedTodoList)
            setEditIndex(null);
            editTodoRef.current.value = ''
        }
    }

    const deleteTodo = (index: number) => {
        const updatedList = todoList.filter((_, i) => i !== index);
        setTodoList(updatedList);
    };

    const cancelEditing = () => {
        setEditIndex(null);
    }

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editTodoRef.current) {
            editTodoRef.current.value = e.target.value;
        }
    };

    const renderDefaultItem = (todo: string, index: number) => {
        return (
            <div key={index}>
                <li>{todo}</li>
                <button onClick={() => startEditing(index)}>수정</button>
                <button onClick={() => deleteTodo(index)}>삭제</button>
            </div>
        )
    }

    const renderEditingItem = (todo: string, index: number) => {
        return (
            <div key={index}>
                <input
                    type="text"
                    defaultValue={todo}
                    ref={editTodoRef}
                    onChange={ (e) => handleEditChange }
                />
                <button onClick={() => editTodo(index)}>완료</button>
                <button onClick={cancelEditing}>취소</button>
            </div>
        )
    }

    return (
        <>
            <input type="text" ref={newTodoRef} />
            <button onClick={addTodo}>추가</button>
            {
                todoList.map((todo, index) => {
                    return editIndex !== index ? renderDefaultItem(todo, index) : renderEditingItem(todo, index)
                })
            }
        </>
    );
}