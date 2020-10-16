import React, {useEffect, useState} from 'react';
import {todolistAPI} from '../api/todolist-api';

export default {
    title: 'API'
};


export const GetTodolists = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        todolistAPI.getTodolists()
            .then((res) => {
                setState(res.data);
            });

    }, []);

    return <div> {JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        let title = 'My Task';
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null);
    let todolistId = '378cc08c-e37b-486f-a415-2d40b5ac1df0';
    useEffect(() => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null);
    let todolistId = '22fc2183-c48c-4f38-9520-9df824d89bc3';
    let title = 'REACT!!!!!!!!!!';
    useEffect(() => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};

export const GetTasks = () => {

    const [state, setState] = useState<any>(null);

    useEffect(() => {
        const todolistId = 'a55588c6-c710-4808-b46b-cf2b6dec1aa2';
        todolistAPI.getTasks(todolistId)
            .then((res) => {
                setState(res.data);
            });

    }, []);

    return <div> {JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
    const [state, setState] = useState<any>(null);
    let todolistId = 'a55588c6-c710-4808-b46b-cf2b6dec1aa2';
    let taskId = 'e8158796-ac6d-4c62-a979-a8ddc080932e';
    useEffect(() => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
    const [state, setState] = useState<any>(null);
    useEffect(() => {
        let newTask = {
            title: 'NEW TASK',
            description: 'learn REACT!!!',
            completed: false,
            status: 1,
            priority: -2,
            startDate: '11.02.2020',
            deadline: '12.12.2020',
        }
        const todolistId = 'a55588c6-c710-4808-b46b-cf2b6dec1aa2';
        todolistAPI.createTask(todolistId, newTask)
            .then((res) => {
                setState(res.data);
            });
    }, []);

    return <div> {JSON.stringify(state)}</div>;
};

export const UpdateTaskModel = () => {
    const [state, setState] = useState<any>(null);
    const [todolistId, setTodolistId] = useState<string>('');
    const [taskId, setTaskId] = useState<string>('');

    let model = {
        title: "updated TAS11111111111K",
        description: "My new task",
        completed: false,
        status: 12,
    }
    const UpdateTask = () => {
        todolistAPI.updateTaskModel(todolistId, taskId, model)
            .then((res) => {
                setState(res.data);
            });
    }

    return <div> {JSON.stringify(state)}
    <div>
        <input type="text" placeholder={'taskId'} value={taskId}
               onChange={(e) => setTaskId(e.currentTarget.value)}/>
        <input type="text" placeholder={'todolistId'} value={todolistId}
               onChange={(e) => setTodolistId(e.currentTarget.value)}/>
        <button onClick={UpdateTask}>UpdateTask</button>
    </div>
    </div>;
};
