import { useState } from "react";
import { useTodo } from "../context";

function TodoForm() {
  const [todo, setTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    priority: "medium"
  });
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!todo.title.trim()) return;

    addTodo(todo)
    setTodo({
      title: "",
      description: "",
      dueDate: "",
      priority: "medium"
    })
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo(prev => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Title"
        name="title"
        value={todo.title}
        onChange={handleChange}
        className="w-full bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50 transition-all duration-300 text-gray-100 placeholder-gray-500"
      />
      <textarea
        placeholder="Description"
        name="description"
        value={todo.description}
        onChange={handleChange}
        rows="2"
        className="w-full bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50 transition-all duration-300 text-gray-300 placeholder-gray-500 text-sm resize-none"
      />
      <div className="flex gap-2">
        <input
          type="date"
          name="dueDate"
          value={todo.dueDate}
          onChange={handleChange}
          className="flex-1 bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50 transition-all duration-300 text-gray-300 text-sm"
        />
        <select
          name="priority"
          value={todo.priority}
          onChange={handleChange}
          className="flex-1 bg-gray-800/90 backdrop-blur-sm rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500/50 border border-gray-700/50 transition-all duration-300 text-gray-300 text-sm"
        >
          <option value="low" className="py-1 bg-gray-800 ">Low Priority</option>
          <option value="medium" className="py-1 bg-gray-800">Medium Priority</option>
          <option value="high" className="py-1 bg-gray-800">High Priority</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg px-4 py-2 transition-colors duration-300 focus:ring-2 focus:ring-purple-500/50 focus:ring-offset-2 focus:ring-offset-gray-900"
      >
        Add Task
      </button>
    </form>
  );
}

export default TodoForm;
