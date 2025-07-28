import React, { useEffect, useState } from 'react'
import Form from './Form'
import Todo from './Todo';
import { FaListUl, FaTrash } from 'react-icons/fa'
import { toast } from 'react-hot-toast'

function Main() {
  const [todos, setTodos] = useState(localStorage.getItem("TODOS") ? JSON.parse(localStorage.getItem("TODOS")) : []);
  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
  }, [todos])

  const [isEditing, setIsEditing] = useState(-1);




  return (
    <main className='min-h-screen bg-gray-50 py-4 sm:py-8 px-2 sm:px-4'>
      <div className='max-w-4xl mx-auto'>
        <Form
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          todos={todos}
          setTodos={setTodos} />

        <div className='mt-6 sm:mt-8'>
          <div className='flex flex-col sm:flex-row sm:items-center gap-2 mb-4 sm:mb-6'>
            <div className='flex items-center gap-2'>
              <FaListUl className='text-xl sm:text-2xl text-blue-600' />
              <h2 className='text-xl sm:text-2xl font-bold text-gray-800'>Your Todos</h2>
            </div>
            <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium self-start sm:self-auto'>
              {todos.length} {todos.length === 1 ? 'item' : 'items'}
            </span>
          </div>

          {todos.length === 0 ? (
            <div className='text-center py-8 sm:py-12'>
              <div className='text-gray-400 text-4xl sm:text-6xl mb-4'>📝</div>
              <p className='text-gray-500 text-base sm:text-lg px-4'>No todos yet. Add your first todo above!</p>
            </div>
          ) : (
            <>
              <div className='flex justify-between items-center mb-4'>
                <div className='flex items-center gap-2'>
                  <span className='text-sm text-gray-600'>Manage your todos:</span>
                </div>
                <button
                  title="Clear All"
                  onClick={() => {
                    if (todos.length > 0) {
                      setTodos([]);
                      toast.success("All todos cleared successfully!");
                    }
                  }}
                  className='bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center gap-2 shadow-md hover:shadow-lg text-sm'
                >
                  <FaTrash className='text-xs' />
                  Clear All
                </button>
              </div>
              <ul className='space-y-3 sm:space-y-4'>
                {todos.map((value, index) => {
                  return <li key={index}>
                    <Todo
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                      index={index}
                      value={value}
                      setTodos={setTodos} />
                  </li>
                })}
              </ul>
            </>
          )}
        </div>
      </div>
    </main>
  )
}

export default Main
