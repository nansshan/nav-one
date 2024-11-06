import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import { getCategoriesQuery } from './queries'

// export const client = createClient({
//   projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
//   dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
//   apiVersion: '2024-03-13',
//   useCdn: true,
//   token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
//   perspective: 'published' // 添加这行
// })
export const client = createClient({
    projectId: '0muzcmh8',  // 直接使用项目 ID
    dataset: 'production',   // 直接使用 dataset
    apiVersion: 'v2022-03-07',
    useCdn: false,           // 改为 true
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN // 添加 token
  })
  export async function getCategories() {
    try {
      // 使用更简单的查询
      const categories = await client.fetch(`*[_type == "category"]{
        title,
        value,
        order
      }`)
      
      if (!categories) {
        console.log('No categories found')
        return []
      }
  
      return categories
    } catch (error) {
      console.error('Error fetching categories:', error)
      return []
    }
  }
  
  const builder = imageUrlBuilder(client)
  export const urlFor = (source: any) => builder.image(source)