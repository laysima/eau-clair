'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Save } from 'lucide-react'
import ImageUpload from '../../../components/ImageUpload'
import { createClient } from '@/utils/supabase/client'
import { Product } from '@/app/types/database'

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [imageUrl, setImageUrl] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [loading, setLoading] = useState(true)
  const [productId, setProductId] = useState<string>('')
  const router = useRouter()

  useEffect(() => {
    async function loadProduct() {
      const resolvedParams = await params
      setProductId(resolvedParams.id)
      
      const supabase = createClient()
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', resolvedParams.id)
        .single()

      if (!error && data) {
        setProduct(data)
        setImageUrl(data.image_url || '')
      }
      setLoading(false)
    }

    loadProduct()
  }, [params])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const supabase = createClient()

    try {
      const { error } = await supabase
        .from('products')
        .update({
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          size: formData.get('size') as string,
          price: parseFloat(formData.get('price') as string),
          category: formData.get('category') as string,
          stock: parseInt(formData.get('stock') as string),
          image_url: imageUrl,
          is_active: formData.get('is_active') === 'true',
        })
        .eq('id', productId)

      if (error) throw error

      router.push('/admin')
      router.refresh()
    } catch (err) {
      alert(`Error: ${err instanceof Error ? err.message : 'Unknown error'}`)
      setIsSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-[#1565C0] border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="text-center py-12">
        <p className="text-xl text-gray-500 font-light">Product not found</p>
        <Link href="/admin" className="text-[#1565C0] hover:underline mt-4 inline-block">
          Back to Admin
        </Link>
      </div>
    )
  }

  return (
    <div>
      {/* Header */}
      <div className="bg-white border border-gray-200 p-12 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm tracking-[0.3em] text-[#1565C0] uppercase font-medium mb-2">
              Edit Product
            </p>
            <h1 className="text-4xl font-light text-gray-900">{product.name}</h1>
            <p className="text-gray-500 mt-2 font-light">Update product information</p>
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
              defaultValue={product.name}
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
              defaultValue={product.description || ''}
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
                defaultValue={product.size || ''}
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
                defaultValue={product.price}
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
                defaultValue={product.category || ''}
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
                defaultValue={product.stock}
                className="w-full px-4 py-3 border border-gray-300 focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0] outline-none transition font-light"
                placeholder="100"
              />
            </div>
          </div>

          {/* Image Upload Component */}
          <ImageUpload onImageUploaded={setImageUrl} defaultImageUrl={product.image_url || ''} />

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
                  defaultChecked={product.is_active}
                  className="w-4 h-4 text-[#2E7D32] border-gray-300 focus:ring-[#2E7D32]"
                />
                <span className="text-gray-700 font-light group-hover:text-[#2E7D32] transition">Active</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="is_active"
                  value="false"
                  defaultChecked={!product.is_active}
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
                  <span>Updating...</span>
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  <span>Update Product</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}