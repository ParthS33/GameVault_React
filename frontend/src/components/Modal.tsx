// import React from 'react'

interface Props {
  isOpen: boolean
  title: string
  message: string
  onCancel: () => void
  onConfirm: () => void
}

export default function Modal({ isOpen, title, message, onCancel, onConfirm }: Props) {
  if (!isOpen) return null
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-sm mx-auto">
        <h3 className="text-lg font-bold text-white mb-4">{title}</h3>
        <p className="text-gray-300 mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            type='button'
            onClick={onCancel}
            className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-700 text-white font-semibold transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  )
}
