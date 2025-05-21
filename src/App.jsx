import { useEffect, useState, useCallback } from 'react';
import { TodoProvider } from './context';
import { TodoForm, TodoItem } from './components';
import { STATUS_OPTIONS, PRIORITY_OPTIONS } from './context/TodoContext';

function App() {
  const [todos, setTodos] = useState([]);
  const [filters, setFilters] = useState({
    status: STATUS_OPTIONS.ALL,
    priority: PRIORITY_OPTIONS.ALL
  });

  // Load todos from localStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos?.length > 0) {
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((todo) => {
    setTodos(prev => [
      ...prev,
      {
        id: Date.now(),
        ...todo,
        completed: false
      }
    ]);
  }, []);

  const updateTodo = useCallback((id, updatedTodo) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleComplete = useCallback((id) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }, []);

  // Filter todos
  const filteredTodos = todos.filter(todo => {
    const matchesStatus = filters.status === STATUS_OPTIONS.ALL
      ? true
      : filters.status === STATUS_OPTIONS.COMPLETED
        ? todo.completed
        : !todo.completed;

    const matchesPriority = filters.priority === PRIORITY_OPTIONS.ALL
      ? true
      : todo.priority.toLowerCase() === filters.priority.toLowerCase();

    return matchesStatus && matchesPriority;
  });

  const contextValue = {
    todos: filteredTodos,
    filters,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleComplete,
    setFilters
  };

  return (
    <TodoProvider value={contextValue}>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-8 px-4">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-8 mt-2 text-gray-100">
            Task Manager
          </h1>

          {/* Filters Section */}
          <section className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 mb-6 border border-gray-700/50">
            <h2 className="text-gray-400 text-sm font-medium mb-3">Filter Tasks</h2>
            <div className="flex gap-4">
              <select
                className="flex-1 bg-gray-900/90 rounded-lg px-3 py-2 text-sm text-gray-300 outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50"
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
              >
                <option value={STATUS_OPTIONS.ALL}>All Status</option>
                <option value={STATUS_OPTIONS.PENDING}>Pending</option>
                <option value={STATUS_OPTIONS.COMPLETED}>Completed</option>
              </select>

              <select
                className="flex-1 bg-gray-900/90 rounded-lg px-3 py-2 text-sm text-gray-300 outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50 "
                value={filters.priority}
                onChange={(e) => setFilters(prev => ({ ...prev, priority: e.target.value }))}
              >
                <option value={PRIORITY_OPTIONS.ALL}>All Priority</option>
                <option value={PRIORITY_OPTIONS.LOW}>Low</option>
                <option value={PRIORITY_OPTIONS.MEDIUM}>Medium</option>
                <option value={PRIORITY_OPTIONS.HIGH}>High</option>
              </select>
            </div>
          </section>

          {/* Form Section */}
          <section className="bg-gray-800/90 backdrop-blur-sm rounded-lg p-4 mb-6 border border-gray-700/50">
            <TodoForm />
          </section>

          {/* Todo List Section */}
          <section className="space-y-4">
            {filteredTodos.map((todo) => (
              <div key={todo.id}>
                <TodoItem todo={todo} />
              </div>
            ))}
            {filteredTodos.length === 0 && (
              <div className="text-center py-8 bg-gray-800/90 backdrop-blur-sm rounded-lg border border-gray-700/50">
                <p className="text-gray-400 mb-1">No tasks found</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
