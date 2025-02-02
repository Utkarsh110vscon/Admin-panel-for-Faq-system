import React, { useState } from 'react';
import { Loader2, X } from 'lucide-react';
import WYSIWYG from './WYSIWYG';
import { api } from '../api/faqApi';

export const FAQForm: React.FC = ({ onSubmit, onClose, initialData, btnLoading, setFaqs }) => {
  const [formData, setFormData] = React.useState({
    question: initialData?.question || '',
    answer: initialData?.answer || '',
  });

  const [btnLoading2, setBtnLoading2]= useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setBtnLoading2(true)
    try {
      console.log('yes');
      const result = await api.put(`/api/PUT/faqs/${initialData._id}`, formData);
      console.log(result.data)
      const updatedFaq = {
        _id: result.data.updatedFaq._id,
        answer: result.data.updatedFaq.answer.en,
        question: result.data.updatedFaq.question.en
      }
      setFaqs((prev) => {
        const index = prev.findIndex((prevFaq) => prevFaq._id === result.data.updatedFaq._id)
        prev.splice(index, 1, updatedFaq)
        return (
          [...prev]
        );
      })
      onClose();
    } catch (error) {
      console.log(error);
    }finally{
      setBtnLoading2(false);
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold">
            {initialData ? 'Edit FAQ' : 'Add New FAQ'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        <form onSubmit={initialData ? (e) => handleUpdate(e, '23') : handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Question
            </label>
            <input
              type="text"
              value={formData.question}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, question: e.target.value }))
              }
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Answer
            </label>
            <WYSIWYG
              placeholder={'type Your detail'}
              content={formData.answer}
              setContent={setFormData}
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              {
                btnLoading || btnLoading2 ? <Loader2 className='animate-spin' /> : (initialData ? 'Update FAQ' : 'Add FAQ')
              }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};