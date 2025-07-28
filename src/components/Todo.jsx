import React from 'react'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { FaTrash, FaCheckCircle, FaListUl, FaChevronDown, FaChevronUp, FaCircle, FaEdit } from 'react-icons/fa'

function Todo({ isEditing, setIsEditing, index, value, setTodos }) {

  const [isOpen, setIsOpen] = useState(false);


  const handleCompleted = (index) => {
    setTodos(prev => {
      const updatedTodos = [...prev];
      updatedTodos[index] = { ...updatedTodos[index], isCompleted: !updatedTodos[index].isCompleted };
      return updatedTodos;
    });

    const isCompleted = !value.isCompleted;
    toast.success(isCompleted ? "Todo marked as completed!" : "Todo marked as incomplete!");
  }

  const handleDelete = (index) => {
    console.log(index);
    setTodos(prev => prev.filter((val, i) => {
      return i != index;
    }))


    toast.success("Todo deleted successfully");
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 sm:p-6 border-l-4 hover:shadow-lg transition-all duration-200 ${value.isCompleted
      ? 'border-green-500 bg-green-50'
      : 'border-blue-500'
      }`}>
      <div className='flex items-start justify-between gap-3'>
        <button
          onClick={() => handleCompleted(index)}
          className={`p-2 sm:p-3 rounded-lg transition-all duration-200 flex items-center gap-1 sm:gap-2 shadow-md hover:shadow-lg flex-shrink-0 ${value.isCompleted
            ? 'bg-green-500 hover:bg-green-600 text-white'
            : 'bg-gray-200 hover:bg-gray-300 text-gray-600'
            }`}
          title={value.isCompleted ? 'Mark as incomplete' : "Mark as completed"}
        >
          {value.isCompleted ? (
            <FaCheckCircle className='text-xs sm:text-sm' />
          ) : (
            <FaCircle className='text-xs sm:text-sm' />
          )}
        </button>

        <div className='flex-1 min-w-0'>
          <div className='flex items-center gap-2 sm:gap-3 mb-3'>
            <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium flex items-center gap-1 flex-shrink-0 ${value.isCompleted
              ? 'bg-green-100 text-green-600'
              : 'bg-blue-100 text-blue-600'
              }`}>
              <FaListUl className='text-xs' />
              #{index + 1}
            </div>
            <h3 className={`text-base sm:text-lg font-semibold break-words ${value.isCompleted
              ? 'text-gray-500 line-through'
              : 'text-gray-800'
              }`}>
              {value.title}
            </h3>
            {value.desc && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className='ml-auto text-gray-500 hover:text-blue-600 transition-colors duration-200 flex-shrink-0'
                title={isOpen ? 'Hide description' : 'Show description'}
              >
                {isOpen ? <FaChevronUp className='text-sm' /> : <FaChevronDown className='text-sm' />}
              </button>
            )}
          </div>

          {value.desc && isOpen && (
            <p className={`leading-relaxed mt-3 pl-2 sm:pl-4 border-l-2 text-sm sm:text-base break-words ${value.isCompleted
              ? 'text-gray-400 border-gray-300'
              : 'text-gray-600 border-gray-200'
              }`}>
              {value.desc}
            </p>
          )}
        </div>

        <button
          onClick={() => handleDelete(index)}
          className='bg-red-500 hover:bg-red-600 text-white p-2 sm:p-3 rounded-lg transition-all duration-200 flex items-center gap-1 sm:gap-2 shadow-md hover:shadow-lg flex-shrink-0'
          title='Delete Todo'
        >
          <FaTrash className='text-xs sm:text-sm' />
        </button>
        <button
          disabled={isEditing !== -1 && isEditing !== index}
          onClick={() => setIsEditing(index)}
          className={`p-2 sm:p-3 rounded-lg transition-all duration-200 flex items-center gap-1 sm:gap-2 shadow-md hover:shadow-lg flex-shrink-0 ${isEditing === index
            ? 'bg-blue-500 hover:bg-blue-600 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          title='Edit Todo'
        >
          <FaEdit className='text-xs sm:text-sm' />
        </button>
      </div>
    </div>
  )
}

export default Todo
