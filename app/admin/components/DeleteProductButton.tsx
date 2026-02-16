'use client'

import { useState } from 'react'
import { deleteProduct } from '../actions'
import { useRouter } from 'next/navigation'
import { Trash2, X } from 'lucide-react'

export default function DeleteProductButton({ 
  productId, 
  productName 
}: { 
  productId: string
  productName: string 
}) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    const result = await deleteProduct(productId)
    
    if (result.error) {
      alert(`Error: ${result.error}`)
      setIsDeleting(false)
    } else {
      setShowConfirm(false)
      router.refresh()
    }
  }

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="border border-red-300 text-red-600 px-6 py-2 text-sm font-light hover:border-red-500 hover:bg-red-50 transition tracking-wide flex items-center gap-2"
      >
        <Trash2 className="w-4 h-4" />
        <span>Delete</span>
      </button>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white border-2 border-gray-200 shadow-2xl p-12 max-w-md relative">
            {/* Close button */}
            <button
              onClick={() => setShowConfirm(false)}
              disabled={isDeleting}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div>
                <p className="text-xs tracking-[0.3em] text-red-600 uppercase font-medium mb-2">
                  Warning
                </p>
                <h3 className="text-3xl font-light text-gray-900">Delete Product?</h3>
              </div>
              
              <p className="text-gray-600 font-light leading-relaxed">
                Are you sure you want to delete <span className="font-medium text-gray-900">{productName}</span>? This action cannot be undone.
              </p>
              
              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-600 text-white px-8 py-3 font-medium hover:bg-red-700 transition flex-1 disabled:opacity-50 disabled:cursor-not-allowed tracking-wide"
                >
                  {isDeleting ? 'Deleting...' : 'Yes, Delete'}
                </button>
                <button
                  onClick={() => setShowConfirm(false)}
                  disabled={isDeleting}
                  className="border border-gray-300 text-gray-700 px-8 py-3 font-light hover:border-gray-400 transition flex-1 tracking-wide"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}