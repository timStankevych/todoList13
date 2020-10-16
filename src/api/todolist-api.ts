import axios from 'axios';


let instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '56d303f7-4b20-4c05-aca0-a27b6fa68891'
    }
});
type TodoType = {
    'id': string
    'title': string
    'addedDate': string
    'order': number
}

type CommonResponseType<T = {}> = {
    resultCode: number
    messages: string[]
    fieldsErrors: string[]
    data: T
}

type TaskType = {
    description: string
    title: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}
type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type CreateTaskType = {
    title: string
    description: string
    completed: boolean
    status: number
    priority: number
    startDate: string
    deadline: string
}
export type UpdateTaskModelType = {
    title: string
    description: string
    completed: boolean
    status: number
}

export const todolistAPI = {
    getTodolists() {
        let promise = instance.get<TodoType[]>('todo-lists/');
        return promise;
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>('todo-lists/', {title});
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`);
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title});
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    createTask(todolistId: string, newTask: CreateTaskType) {
        return instance.post(`todo-lists/${todolistId}/tasks/`, newTask)
    },
    updateTaskModel(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
};
