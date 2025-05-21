import { useState } from "react";
import { useTodo } from "../context";

function TodoItem({ todo }) {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    const [todoData, setTodoData] = useState({
        title: todo.title || todo.todo, 
        description: todo.description || "",
        dueDate: todo.dueDate || "",
        priority: todo.priority || "medium"
    });
    
    const { updateTodo, deleteTodo, toggleComplete } = useTodo();
    
    const editTodo = () => {
        updateTodo(todo.id, {
            ...todo,
            title: todoData.title,
            description: todoData.description,
            dueDate: todoData.dueDate,
            priority: todoData.priority
        });
        setIsTodoEditable(false);
    };
    
    const toggleCompleted = () => {
        toggleComplete(todo.id);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTodoData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const getPriorityColor = () => {
        switch(todoData.priority.toLowerCase()) {
            case 'high': return 'bg-red-900/30 text-red-400';
            case 'medium': return 'bg-yellow-900/30 text-yellow-400';
            case 'low': return 'bg-green-900/30 text-green-400';
            default: return 'bg-gray-800 text-gray-400';
        }
    };

    return (
        <div className={`bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-3 shadow-md border border-gray-700/50 transition-all duration-300 hover:bg-gray-800 ${
            todo.completed ? "opacity-60" : ""
        }`}>
            <div className="flex items-center gap-3 mb-2">
                <input
                    type="checkbox"
                    className="w-4 h-4 rounded-full cursor-pointer accent-purple-500 bg-gray-700 border-gray-600"
                    checked={todo.completed}
                    onChange={toggleCompleted}
                />
                <div className="flex-1">
                    <input
                        type="text"
                        name="title"
                        className={`outline-none w-full bg-transparent font-medium text-gray-100 ${
                            isTodoEditable ? "border-b border-purple-500/50 px-1" : "border-transparent"
                        } ${todo.completed ? "line-through text-gray-500" : ""}`}
                        value={todoData.title}
                        onChange={handleChange}
                        readOnly={!isTodoEditable}
                    />
                </div>
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor()}`}>
                    {todoData.priority}
                </span>
            </div>
            
            {(todoData.description || isTodoEditable) && (
                <textarea
                    name="description"
                    className={`w-full bg-transparent resize-none text-sm text-gray-300 mb-2 ${
                        isTodoEditable ? "border-b border-purple-500/30 px-1" : "border-transparent"
                    } ${todo.completed ? "line-through text-gray-500" : ""}`}
                    value={todoData.description}
                    onChange={handleChange}
                    readOnly={!isTodoEditable}
                    placeholder={isTodoEditable ? "Add description..." : ""}
                    rows="2"
                />
            )}
            
            {(todoData.dueDate || isTodoEditable) && (
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span className="font-medium">Due:</span>
                    <input
                        type="date"
                        name="dueDate"
                        className={`bg-transparent text-gray-300 ${
                            isTodoEditable ? "border-b border-purple-500/30 px-1" : "border-transparent"
                        }`}
                        value={todoData.dueDate}
                        onChange={handleChange}
                        readOnly={!isTodoEditable}
                    />
                </div>
            )}
            
            <div className="flex gap-2 justify-end">
                <button
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        isTodoEditable 
                            ? "bg-purple-900/50 text-purple-300 hover:bg-purple-800/50" 
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                    onClick={() => {
                        if (todo.completed) return;
                        if (isTodoEditable) {
                            editTodo();
                        } else {
                            setIsTodoEditable(true);
                        }
                    }}
                    disabled={todo.completed}
                >
                    {isTodoEditable ? "Save" : "Edit"}
                </button>
                <button
                    className="px-3 py-1 rounded-full text-xs font-medium bg-red-900/30 text-red-400 hover:bg-red-800/50 transition-colors"
                    onClick={() => deleteTodo(todo.id)}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default TodoItem;