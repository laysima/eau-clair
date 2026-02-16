'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function createProduct(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.from('products').insert({
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    size: formData.get('size') as string,
    price: parseFloat(formData.get('price') as string),
    category: formData.get('category') as string,
    stock: parseInt(formData.get('stock') as string),
    image_url: formData.get('image_url') as string,
    is_active: formData.get('is_active') === 'true',
  })

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin')
  revalidatePath('/products')
  redirect('/admin')
}

export async function updateProduct(productId: string, formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('products')
    .update({
      name: formData.get('name') as string,
      description: formData.get('description') as string,
      size: formData.get('size') as string,
      price: parseFloat(formData.get('price') as string),
      category: formData.get('category') as string,
      stock: parseInt(formData.get('stock') as string),
      image_url: formData.get('image_url') as string,
      is_active: formData.get('is_active') === 'true',
    })
    .eq('id', productId)

  if (error) {
    throw new Error(error.message)
  }

  revalidatePath('/admin')
  revalidatePath('/products')
  redirect('/admin')
}

export async function deleteProduct(productId: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', productId)

  if (error) {
    return { error: error.message }
  }

  revalidatePath('/admin')
  revalidatePath('/products')
  return { success: true }
}