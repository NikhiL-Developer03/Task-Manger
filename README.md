# Todo App with Local Storage

A modern, responsive Todo application built with React and Vite that persists data in the browser's local storage. This app allows users to create, manage, and organize their tasks with priority levels and due dates.

## ✨ Features

- **Add Tasks**: Create new todos with title, description, due date, and priority level
- **Priority Management**: Organize tasks by priority (Low, Medium, High)
- **Status Tracking**: Mark tasks as completed or pending
- **Filter & Sort**: Filter todos by status and priority
- **Local Storage**: Automatic data persistence in browser storage
- **Responsive Design**: Built with Tailwind CSS for mobile-first design
- **Context API**: State management using React Context for efficient data flow

## 🚀 Technologies Used

- **React 18** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework for styling
- **Context API** - React's built-in state management
- **Local Storage** - Browser storage for data persistence
- **ESLint** - Code linting and formatting

## 📁 Project Structure

```
src/
├── components/
│   ├── TodoForm.jsx    # Form for adding new todos
│   ├── TodoItem.jsx    # Individual todo item component
│   └── index.js        # Components barrel export
├── context/
│   ├── TodoContext.js  # Context provider and hooks
│   └── index.js        # Context barrel export
├── App.jsx             # Main application component
├── main.jsx           # Application entry point
└── index.css          # Global styles and Tailwind imports
```

## 🛠️ Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Todo-App-Local-Storage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 📝 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the project for production
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run ESLint to check code quality

## 🎯 Usage

1. **Adding a Todo**: Fill in the form with task details and click "Add Todo"
2. **Completing Tasks**: Click the checkbox to mark todos as completed
3. **Editing Tasks**: Click the edit button to modify existing todos
4. **Deleting Tasks**: Click the delete button to remove todos
5. **Filtering**: Use the filter options to view tasks by status or priority
6. **Data Persistence**: Your todos are automatically saved to local storage

## 🏗️ Built With

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [PostCSS](https://postcss.org/) - CSS processing
- [ESLint](https://eslint.org/) - Code linting
