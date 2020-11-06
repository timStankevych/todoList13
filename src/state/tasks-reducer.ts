import {TasksStateType} from '../App';
import {AddTodolistActionType, RemoveTodolistActionType, SetTodolistsActionType} from './todolists-reducer';
import {TaskType, todolistsAPI} from '../api/todolists-api';
import {Dispatch} from 'redux';
import {AppRootStateType} from './store';
import {setAppStatusAC} from '../app/app-reducer';

export type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    todolistId: string
    taskId: string
}

export type AddTaskActionType = {
    type: 'ADD-TASK',
    task: TaskType
}

export type UpdateTaskActionType = {
    type: 'UPDATE-TASK'
    todolistId: string
    taskId: string
    model: UpdateDomainTaskModelType
}

export type SetTasksActionType = {
    type: 'SET-TASKS'
    tasks: Array<TaskType>
    todolistId: string
}

type ActionsType = RemoveTaskActionType
    | AddTaskActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | RemoveTodolistActionType
    | SetTodolistsActionType
    | SetTasksActionType

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.todolistId];
            const newTasks = tasks.filter(t => t.id != action.taskId);
            stateCopy[action.todolistId] = newTasks;
            return stateCopy;
        }
        case 'ADD-TASK': {
            const stateCopy = {...state};
            const tasks = stateCopy[action.task.todoListId];
            const newTasks = [action.task, ...tasks];
            stateCopy[action.task.todoListId] = newTasks;
            return stateCopy;
        }
        case 'UPDATE-TASK': {
            let todolistTasks = state[action.todolistId];
            let newTasksArray = todolistTasks
                .map(t => t.id === action.taskId ? {...t, ...action.model} : t);

            state[action.todolistId] = newTasksArray;
            return ({...state});
        }
        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.todolist.id]: []
            };
        }
        case 'REMOVE-TODOLIST': {
            const copyState = {...state};
            delete copyState[action.id];
            return copyState;
        }

        case 'SET-TODOLISTS': {
            const stateCopy = {...state};
            action.todos.forEach((tl) => {
                stateCopy[tl.id] = [];
            });
            return stateCopy;
        }
        case 'SET-TASKS': {
            const stateCopy = {...state};
            stateCopy[action.todolistId] = action.tasks;
            return stateCopy;
        }

        default:
            return state;
    }
};

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId};
};

export const addTaskAC = (task: TaskType): AddTaskActionType => {
    return {type: 'ADD-TASK', task}
}

export const updateTaskAC = (taskId: string, todolistId: string, model: UpdateDomainTaskModelType): UpdateTaskActionType => {
    return {type: 'UPDATE-TASK', taskId, todolistId, model};
};

export const setTasksAC = (tasks: Array<TaskType>, todolistId: string): SetTasksActionType => {
    return {type: 'SET-TASKS', tasks, todolistId};
};


//thunk
export const getTasksTC = (todolistId: string) =>
    (dispatch: Dispatch) => {

    dispatch(setAppStatusAC('loading'));
    todolistsAPI.getTasks(todolistId)
        .then((res) => {
            let tasks = res.data.items;
            dispatch(setTasksAC(tasks, todolistId));

            dispatch(setAppStatusAC('succeeded'));
        });
};

export const removeTaskTC = (taskId: string, todolistId: string) => (dispatch: Dispatch) => {

    dispatch(setAppStatusAC('loading'));
    todolistsAPI.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(removeTaskAC(taskId, todolistId))

            dispatch(setAppStatusAC('succeeded'));
        })
}

export const addTaskTC = (title: string, todolistId: string) =>
    (dispatch: Dispatch) => {

    dispatch(setAppStatusAC('loading'));
    todolistsAPI.createTask(todolistId, title)
        .then(res => {
            dispatch(addTaskAC(res.data.data.item))

            dispatch(setAppStatusAC('succeeded'));
        })
}
export type UpdateDomainTaskModelType = {
    title?: string
    description?: string
    status?: number
    priority?: number
    startDate?: string
    deadline?: string
}
export const updateTaskTC = (taskId: string, todolistId: string, domainModel: UpdateDomainTaskModelType) => {
    return (dispatch: Dispatch, getState: () => AppRootStateType) => {

// так как мы обязаны на сервер отправить все св-ва, которые сервер ожидает, а не только
// те, которые мы хотим обновить, соответственно нам нужно в этом месте взять таску целиком
// чтобы у неё отобрать остальные св-ва

        const task = getState().tasks[todolistId].find(t => t.id === taskId)

        if (task) {
        const apiModel = {
            title: task.title,
            startDate: task.startDate,
            priority: task.priority,
            description: task.description,
            deadline: task.deadline,
            status: task.status,
            ...domainModel
        }
            todolistsAPI.updateTask(todolistId, taskId, apiModel).then(() => {
                dispatch(updateTaskAC(taskId, todolistId, domainModel))
            })
        }
    }
}

