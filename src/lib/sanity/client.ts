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

  // 定义提交数据的接口
  interface WebsiteSubmission {
    web_link: string;
    name: string;
    categories: {
      _type: 'reference';
      _ref: string;
    };
    description: string;
    introduction: string;
    image_url: {
      _type: 'image';
      asset: {
        _type: 'reference';
        _ref: string;
      };
    };
    userid?: string;
    email?: string;
  }

  interface SubmissionResult {
    _id: string;
    _type: string;
    [key: string]: any;
  }

  export async function createSubmission(data: WebsiteSubmission): Promise<SubmissionResult> {
    try {
      const result = await client.create({
        _type: 'website', // 改为你的 schema 名称 'website'
        web_link: data.web_link,
        name: data.name,
        categories: data.categories,
        description: data.description,
        introduction: data.introduction,
        image_url: data.image_url,
        userid: data.userid || '',
        email: data.email || '',
        web_status: 1, // 初始状态：待审核
        pay: 1, // 初始状态：免费
        create_time: new Date().toISOString(),
        update_time: new Date().toISOString()
      });

      return result;
    } catch (error) {
      console.error('创建提交失败:', error);
      throw error;
    }
  }

  // 更新提交状态的函数
  export async function updateSubmissionStatus(id: string, status: number, pay: number = 1) {
    try {
      const result = await client.patch(id)
        .set({ 
          web_status: status,
          pay: pay,
          update_time: new Date().toISOString()
        })
        .commit();
      return result;
    } catch (error) {
      console.error('更新提交状态失败:', error);
      throw error;
    }
  }