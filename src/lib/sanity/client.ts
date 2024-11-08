import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import {getWebsitesQuery, getCategoriesQuery, getTotalWebsitesQuery, getFilteredWebsitesQuery } from './queries'

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
      const categories = await client.fetch(`*[_type == "category"] | order(order desc) {
        title,
        value,
        _id,
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

  // 定义接口
  interface WebsiteFilters {
    name?: string;
    categoryId?: string;
    orderBy?: 'publish_time desc' | 'publish_time asc' | 'create_time desc' | 'create_time asc';
    page?: number;
    pageSize?: number;
  }

  interface Website {
    _id: string;
    name: string;
    web_link: string;
    description: string;
    introduction: string;
    imageUrl: string;
    category: {
      _id: string;
      title: string;
      value: string;
    };
    publish_time: string;
    create_time: string;
  }

  interface WebsiteResponse {
    websites: Website[];
    total: number;
    page: number;
    pageSize: number;
    totalPages: number;
  }

  export async function getWebsites(filters: WebsiteFilters = {}): Promise<WebsiteResponse> {
    try {
      const {
        name,
        categoryId,
        orderBy = 'publish_time desc',
        page = 1,
        pageSize = 12
      } = filters;

      // 计算分页参数
      const start = (page - 1) * pageSize;
      const end = start + pageSize;

      // 构建基础查询
      let query = `*[_type == "website" && web_status == 3`;
      
      // 添加条件
      if (name) {
        query += ` && name match "*${name}*"`;
      }
      if (categoryId) {
        query += ` && categories._ref == "${categoryId}"`;
      }
      
      // 完成查询
      query += `] | order(${orderBy}) [$start...$end] {
        _id,
        name,
        web_link,
        description,
        introduction,
        "imageUrl": image_url.asset->url,
        "category": categories->{
          _id,
          title,
          value
        },
        publish_time,
        create_time
      }`;

      // 构建计数查询
      let countQuery = query.split('] |')[0] + ']';
      countQuery = `count(${countQuery})`;

      // 执行查询
      const [websites, total] = await Promise.all([
        client.fetch(query, { start, end, orderBy }),
        client.fetch(countQuery)
      ]);

      return {
        websites,
        total,
        page,
        pageSize,
        totalPages: Math.ceil(total / pageSize)
      };
    } catch (error) {
      console.error('Error fetching websites:', error);
      throw error;
    }
  }

  export async function findUserByEmail(email: string) {
    return client.fetch(
      `*[_type == "user" && email == $email][0]`,
      { email }
    )
  }
  
  // 生成随机字符串的辅助函数
  function generateRandomString(length: number): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }
  
  // 修改用户创建接口定义
  interface UserData {
    email: string;
    name: string;
    image: string;
    providerId: string;
    provider: 'google' | 'github' | 'credentials';
    password?: string; // 添加可选的密码字段
  }

  export async function createUser(userData: UserData) {
    let password = userData.password;

    // 如果没有提供密码（第三方登录），则生成随机密码
    if (!password) {
      const emailUsername = userData.email.split('@')[0];
      const randomSuffix = generateRandomString(4);
      password = `${emailUsername}${randomSuffix}`;
    }
    
    return client.create({
      _type: 'user',
      email: userData.email,
      name: userData.name,
      image: userData.image,
      providerId: userData.providerId,
      provider: userData.provider,
      password: password,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
  }