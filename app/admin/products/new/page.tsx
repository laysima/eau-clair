'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import ImageUpload from '../../components/ImageUpload'
import { createClient } from '@/utils/supabase/client'

export default function NewProductPage() {
  const [imageUrl, setImageUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    try {
      const { error } = await supabase.from('products').insert({
        name: formData.get('name') as string,
        description: formData.get('description') as string,
        size: formData.get('size') as string,
        price: parseFloat(formData.get('price') as string),
        category: formData.get('category') as string,
        stock: parseInt(formData.get('stock') as string),
        image_url: imageUrl,
        is_active: formData.get('is_active') === 'true',
      })

      if (error) throw error

      router.push('/admin')
      router.refresh()
      } catch (err) {
        alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
        setIsSubmitting(false)
      }
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-white border border-gray-200 p-12 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm tracking-[0.3em] text-[#1565C0] uppercase font-medium mb-2">
              New Product
            </p>
            <h1 className="text-4xl font-light text-gray-900">Add Product</h1>
            <p className="text-gray-500 mt-2 font-light">Create a new product listing</p>
          </div>
          <Link 
            href="/admin"
            className="border border-gray-300 text-gray-700 px-6 py-3 font-light hover:border-[#1565C0] hover:text-[#1565C0] transition tracking-wide flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </Link>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white border border-gray-200 p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              required
              className="w-full px-4 py-3 border border-gray-300 focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0] outline-none transition font-light"
              placeholder="Premium Spring Water"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0] outline-none transition font-light resize-none"
              placeholder="Pure spring water from natural sources..."
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Size *
              </label>
              <input
                type="text"
                name="size"
                required
                className="w-full px-4 py-3 border border-gray-300 focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0] outline-none transition font-light"
                placeholder="500ml"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Price ($) *
              </label>
              <input
                type="number"
                name="price"
                step="0.01"
                required
                className="w-full px-4 py-3 border border-gray-300 focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0] outline-none transition font-light"
                placeholder="2.99"
              />
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Category *
              </label>
              <select
                name="category"
                required
                className="w-full px-4 py-3 border border-gray-300 focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0] outline-none transition bg-white font-light"
              >
                <option value="">Select category</option>
                <option value="Still Water">Still Water</option>
                <option value="Sparkling">Sparkling</option>
                <option value="Premium">Premium</option>
                <option value="Bulk">Bulk</option>
              </select>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
                Stock Quantity *
              </label>
              <input
                type="number"
                name="stock"
                required
                defaultValue={100}
                className="w-full px-4 py-3 border border-gray-300 focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0] outline-none transition font-light"
                placeholder="100"
              />
            </div>
          </div>

          {/* Image Upload Component */}
          <ImageUpload onImageUploaded={setImageUrl} />

          {/* Active Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 uppercase tracking-wide">
              Status
            </label>
            <div className="flex items-center gap-8">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="is_active"
                  value="true"
                  defaultChecked
                  className="w-4 h-4 text-[#2E7D32] border-gray-300 focus:ring-[#2E7D32]"
                />
                <span className="text-gray-700 font-light group-hover:text-[#2E7D32] transition">Active</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="is_active"
                  value="false"
                  className="w-4 h-4 text-gray-400 border-gray-300 focus:ring-gray-400"
                />
                <span className="text-gray-700 font-light group-hover:text-gray-500 transition">Inactive</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-8 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting || !imageUrl}
              className="w-full bg-[#1565C0] text-white px-8 py-4 hover:bg-[#42A5F5] transition font-medium tracking-wide flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Create Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}