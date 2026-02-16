'use client'

import { useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Upload, X, Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

export default function ImageUpload({ 
  onImageUploaded,
  defaultImageUrl = ''
}: { 
  onImageUploaded: (url: string) => void
  defaultImageUrl?: string
}) {
  const [uploading, setUploading] = useState(false)
  const [imageUrl, setImageUrl] = useState<string>(defaultImageUrl)
  const [previewUrl, setPreviewUrl] = useState<string>(defaultImageUrl)
  const [error, setError] = useState<string>('')

  // Rest of the component stays the same...

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB')
      return
    }

    setError('')
    setUploading(true)

    try {
      const supabase = createClient()
      
      // Generate unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}-${Date.now()}.${fileExt}`
      const filePath = `products/${fileName}`

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from('product-images')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('product-images')
        .getPublicUrl(filePath)

      setImageUrl(publicUrl)
      setPreviewUrl(URL.createObjectURL(file))
      onImageUploaded(publicUrl)
        } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to upload image')
        }finally {
      setUploading(false)
    }
  }

  const handleUrlInput = (url: string) => {
    setImageUrl(url)
    setPreviewUrl(url)
    onImageUploaded(url)
    setError('')
  }

  const clearImage = () => {
    setImageUrl('')
    setPreviewUrl('')
    onImageUploaded('')
  }

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wide">
        Product Image *
      </label>

      {/* Preview */}
      {previewUrl && (
        <div className="relative w-full h-64 bg-gray-50 border border-gray-300 mb-4">
          <Image
            src={previewUrl}
            alt="Product preview"
            fill
            className="object-contain"
          />
          <button
            type="button"
            onClick={clearImage}
            className="absolute top-2 right-2 bg-red-500 text-white p-2 hover:bg-red-600 transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Upload Button */}
      {!previewUrl && (
        <div className="border-2 border-dashed border-gray-300 hover:border-[#1565C0] transition p-12 text-center">
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleFileUpload}
            disabled={uploading}
            className="hidden"
          />
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex flex-col items-center gap-4"
          >
            {uploading ? (
              <>
                <div className="w-12 h-12 border-4 border-[#1565C0] border-t-transparent rounded-full animate-spin"></div>
                <p className="text-sm text-gray-600 font-light">Uploading...</p>
              </>
            ) : (
              <>
                <Upload className="w-12 h-12 text-gray-400" />
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-700">Click to upload image</p>
                  <p className="text-xs text-gray-500 font-light">PNG, JPG, WebP up to 5MB</p>
                </div>
              </>
            )}
          </label>
        </div>
      )}

      {/* OR Divider */}
      {!previewUrl && (
        <div className="flex items-center gap-4 py-4">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="text-xs text-gray-500 uppercase tracking-wider font-light">Or use URL</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
      )}

      {/* URL Input */}
      {!previewUrl && (
        <input
          type="url"
          value={imageUrl}
          onChange={(e) => handleUrlInput(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 focus:border-[#1565C0] focus:ring-1 focus:ring-[#1565C0] outline-none transition font-light"
          placeholder="https://images.unsplash.com/..."
        />
      )}

      {/* Hidden input for form submission */}
      <input type="hidden" name="image_url" value={imageUrl} required />

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 text-sm font-light">
          {error}
        </div>
      )}
    </div>
  )
}