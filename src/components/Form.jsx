import React, { useState, useEffect } from 'react'
import { toast } from 'react-hot-toast';
import { FaPlus, FaEdit, FaFileAlt, FaSave, FaTimes } from 'react-icons/fa'

function Form({ isEditing, setIsEditing, todos, setTodos }) {
  const [formData, setFormData] = useState({
    title: '',
    desc: ''
  });

  // Update form data when editing
  useEffect(() => {
    if (isEditing !== -1) {
      const todoToEdit = todos[isEditing];
      setFormData({
        title: todoToEdit.title,
        desc: todoToEdit.desc
      });
    } else {
      setFormData({ title: '', desc: '' });
    }
  }, [isEditing, todos]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.desc.trim()) {
      toast.error("Both  Fields are required");
      return;
    }

    // Check for duplicate title (excluding current todo if editing)
    const isDuplicate = todos.some((todo, index) =>
      todo.title === formData.title && index !== isEditing
    );

    if (isDuplicate) {
      toast.error("Todo with same title already exists");
      return;
    }

    if (isEditing !== -1) {
      // Update existing todo
      const updatedTodos = [...todos];
      updatedTodos[isEditing] = {
        ...updatedTodos[isEditing],
        title: formData.title,
        desc: formData.desc
      };
      setTodos(updatedTodos);
      setIsEditing(-1);
      toast.success("Todo updated successfully!");
    } else {
      // Add new todo
      const newTodo = {
        title: formData.title,
        desc: formData.desc,
        isCompleted: false,
      };
      setTodos([...todos, newTodo]);
      toast.success("New Todo added successfully!");
    }

    // Reset form
    setFormData({ title: '', desc: '' });
  };

  const handleCancel = () => {
    setIsEditing(-1);
    setFormData({ title: '', desc: '' });
  };

  return (
    <div className='bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8'>
      <div className='flex items-center gap-2 mb-4 sm:mb-6'>
        <FaEdit className='text-xl sm:text-2xl text-blue-600' />
        <h2 className='text-xl sm:text-2xl font-bold text-gray-800'>
          {isEditing !== -1 ? 'Edit Todo' : 'Add New Todo'}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex flex-col sm:flex-row gap-4'>
          <div className='flex-1'>
            <div className='flex items-center gap-2 mb-2'>
              <FaEdit className='text-gray-500' />
              <label className='text-sm font-medium text-gray-700'>Title</label>
            </div>
            <input
              type="text"
              placeholder='Enter Title'
              name='title'
              value={formData.title}
              onChange={handleInputChange}
              className='w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all'
            />
          </div>
          <div className='flex items-end gap-2'>
            <button
              type='submit'
              className='w-full sm:w-auto bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg'
            >
              {isEditing !== -1 ? (
                <>
                  <FaSave className='text-lg' />
                  UPDATE TODO
                </>
              ) : (
                <>
                  <FaPlus className='text-lg' />
                  ADD TODO
                </>
              )}
            </button>
            {isEditing !== -1 && (
              <button
                type='button'
                onClick={handleCancel}
                className='w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 sm:px-8 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 shadow-lg'
              >
                <FaTimes className='text-lg' />
                CANCEL
              </button>
            )}
          </div>
        </div>

        <div>
          <div className='flex items-center gap-2 mb-2'>
            <FaFileAlt className='text-gray-500' />
            <label className='text-sm font-medium text-gray-700'>Description</label>
          </div>
          <textarea
            placeholder='Enter Description'
            name='desc'
            value={formData.desc}
            onChange={handleInputChange}
            rows="3"
            className='w-full px-3 sm:px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none'
          />
        </div>
      </form>
    </div>
  )
}

export default Form
