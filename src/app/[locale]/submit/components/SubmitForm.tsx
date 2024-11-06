'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { client } from '@/lib/sanity';

export default function SubmitForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    web_link: '',
    description: '',
    introduction: '',
    email: '',
    categories: [],
  });

  // 处理图片上传
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    const file = e.target.files[0];
    
    try {
      const asset = await client.assets.upload('image', file);
      return asset._id;
    } catch (error) {
      console.error('图片上传失败:', error);
      return null;
    }
  };

  // 处理表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 创建文档
      const doc = {
        _type: 'website',
        ...formData,
        web_status: 1,
        pay: 1,
        create_time: new Date().toISOString(),
        update_time: new Date().toISOString(),
      };

      const result = await client.create(doc);
      
      if (result._id) {
        router.push('/submit/success');
      }
    } catch (error) {
      console.error('提交失败:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 表单字段 */}
      <div>
        <label>网站名称</label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          required
        />
      </div>
      
      {/* 添加其他表单字段 */}
      
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-primary text-white py-2 rounded"
      >
        {isSubmitting ? '提交中...' : '免费提交'}
      </button>
    </form>
  );
} 