import axios, {AxiosResponse} from "axios";
import {Todos} from "../interface/todosInterface";

export const getTodos = async (): Promise<Todos[]> => {
    const { data }: AxiosResponse<Todos[]> = await axios.get("http://localhost:8080/v1/todos")
    return data
}

export const saveTodos = async (item: string): Promise<number> => {
    const { data }: AxiosResponse<number> = await axios.post("http://localhost:8080/v1/todos", { item })
    return data
}

export const patchTodos = async (id: number, item: string): Promise<number> => {
    const { data }: AxiosResponse<number> = await axios.patch(`http://localhost:8080/v1/todos/${id}`, { item })
    return data
}

export const deleteTodos = (id: number): Promise<void> => {
    return axios.delete(`http://localhost:8080/v1/todos/${id}`)
}