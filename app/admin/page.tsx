import { getProducts } from '../lib/supabase-queries'
import { Product } from '../types/database'
import Image from 'next/image'
import Link from 'next/link'
import DeleteProductButton from './components/DeleteProductButton'
import { Plus } from 'lucide-react'

export const revalidate = 0

export default async function AdminPage() {
  const products = await getProducts()

  return (
    <div>
      {/* Header */}
      <div className="bg-white border border-gray-200 p-12 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm tracking-[0.3em] text-[#1565C0] uppercase font-medium mb-2">
              Inventory
            </p>
            <h1 className="text-4xl font-light text-gray-900">Products</h1>
            <p className="text-gray-500 mt-2 font-light">{products.length} total products</p>
          </div>
          <Link 
            href="/admin/products/new"
            className="bg-[#1565C0] text-white px-8 py-3 hover:bg-[#42A5F5] transition font-medium tracking-wide flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Product</span>
          </Link>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left p-6 text-xs font-medium text-gray-700 uppercase tracking-wider">Image</th>
              <th className="text-left p-6 text-xs font-medium text-gray-700 uppercase tracking-wider">Name</th>
              <th className="text-left p-6 text-xs font-medium text-gray-700 uppercase tracking-wider">Category</th>
              <th className="text-left p-6 text-xs font-medium text-gray-700 uppercase tracking-wider">Size</th>
              <th className="text-left p-6 text-xs font-medium text-gray-700 uppercase tracking-wider">Price</th>
              <th className="text-left p-6 text-xs font-medium text-gray-700 uppercase tracking-wider">Stock</th>
              <th className="text-left p-6 text-xs font-medium text-gray-700 uppercase tracking-wider">Status</th>
              <th className="text-left p-6 text-xs font-medium text-gray-700 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                <td className="p-6">
                  <div className="relative w-16 h-16 bg-gray-100 overflow-hidden">
                    {product.image_url && (
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                </td>
                <td className="p-6">
                  <div className="font-light text-gray-900 text-lg">{product.name}</div>
                  <div className="text-sm text-gray-500 font-light mt-1">{product.description?.substring(0, 40)}...</div>
                </td>
                <td className="p-6">
                  <span className="border border-[#1565C0] text-[#1565C0] px-3 py-1 text-xs font-medium uppercase tracking-wide">
                    {product.category}
                  </span>
                </td>
                <td className="p-6 text-gray-600 text-sm font-light">{product.size}</td>
                <td className="p-6 font-light text-gray-900 text-lg">${Number(product.price).toFixed(2)}</td>
                <td className="p-6 text-gray-600 text-sm font-light">{product.stock}</td>
                <td className="p-6">
                  {product.is_active ? (
                    <span className="border border-[#2E7D32] text-[#2E7D32] px-3 py-1 text-xs font-medium uppercase tracking-wide">
                      Active
                    </span>
                  ) : (
                    <span className="border border-red-500 text-red-600 px-3 py-1 text-xs font-medium uppercase tracking-wide">
                      Inactive
                    </span>
                  )}
                </td>
                <td className="p-6">
                  <div className="flex gap-3">
                    <Link
                      href={`/admin/products/edit/${product.id}`}
                      className="border border-gray-300 text-gray-700 px-6 py-2 text-sm font-light hover:border-[#1565C0] hover:text-[#1565C0] transition tracking-wide"
                    >
                      Edit
                    </Link>
                    <DeleteProductButton productId={product.id} productName={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}