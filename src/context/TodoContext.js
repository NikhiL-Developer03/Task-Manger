import { createContext, useContext } from 'react';

export const STATUS_OPTIONS = {
    All: 'all',
    Pending: 'pending',
    Completed: 'completed'
};

export const PRIORITY_OPTIONS = {
    All: 'all',
    Low: 'low',
    Medium: 'medium',
    High: 'high'
};

const initialTodoState = {
    todos: [],
    filters: {
        status: STATUS_OPTIONS.All,
        priority: PRIORITY_OPTIONS.All
    }
};

export const TodoContext = createContext({
    ...initialTodoState,
    addTodo: () => {},
    updateTodo: () => {},
    deleteTodo: () => {},
    toggleComplete: () => {},
    setFilters: () => {}
});

// custom hook
export const useTodo = () => {
    const context = useContext(TodoContext);
    return context;
};

export const TodoProvider = TodoContext.Provider;