import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '56d303f7-4b20-4c05-aca0-a27b6fa68891'
    }
};

let baseURL = 'https://social-network.samuraijs.com/api/1.1/todo-lists/'

export const todolistAPI = {
    getTodolistAPI() {
        let promise = axios.get(baseURL, settings)
        return promise
    },
    createTodolist(title: string) {
        return axios.post(baseURL, {title}, settings)
    },
    deleteTodolist(todolistId: string) {
       return  axios.delete(`${baseURL}${todolistId}`, settings)
    },
    updateTodolist(todolistId: string, title: string) {
        return  axios.put(`${baseURL}${todolistId}`,{title}, settings)
    }
}
