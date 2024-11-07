'use client';

import { useState, useEffect, useRef } from "react";
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import 'easymde/dist/easymde.min.css';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload } from "@/components/ui/image-upload";
import { Bold, Italic, Underline, Code, Quote, List, ListOrdered, Link as LinkIcon, Eye, HelpCircle } from "lucide-react";
import { cn } from '@/lib/utils';
import EasyMDE from 'easymde';
import { getCategories, createSubmission } from "@/lib/sanity/client";

interface Category {
    title: string;
    value: string;
    _id: string;
  }
  

// 更新 markdown 编辑器样式
const markdownEditorStyles = `
  .EasyMDEContainer {
    display: flex !important;
    flex-direction: column !important;
  }
  .EasyMDEContainer .editor-toolbar {
    border: 1px solid hsl(var(--input)) !important;
    border-bottom: none !important;
    border-top-left-radius: 0.5rem !important;
    border-top-right-radius: 0.5rem !important;
    background: hsl(var(--background)) !important;
    padding: 8px !important;
  }
  .EasyMDEContainer .CodeMirror {
    border: 1px solid hsl(var(--input)) !important;
    border-bottom-left-radius: 0.5rem !important;
    border-bottom-right-radius: 0.5rem !important;
    background: transparent !important;
    height: 300px !important;
  }
  .EasyMDEContainer .editor-toolbar button {
    color: hsl(var(--foreground)) !important;
    border: none !important;
    border-radius: 0.25rem !important;
    margin: 0 2px !important;
    padding: 4px !important;
    background: none !important;
    opacity: 0.7 !important;
  }
  .EasyMDEContainer .editor-toolbar button:hover {
    background-color: hsl(var(--accent)) !important;
    opacity: 1 !important;
  }
  .EasyMDEContainer .editor-toolbar button.active {
    background-color: hsl(var(--accent)) !important;
    opacity: 1 !important;
  }
  .EasyMDEContainer .editor-toolbar i.separator {
    border-left: 1px solid hsl(var(--border)) !important;
    margin: 0 6px !important;
  }
  .EasyMDEContainer .CodeMirror-scroll {
    min-height: 300px !important;
  }
  .EasyMDEContainer .CodeMirror pre.CodeMirror-placeholder {
    color: hsl(var(--muted-foreground)) !important;
  }
`;

// 添加类型定义
interface FormData {
  web_link: string;
  name: string;
  categories: string;
  categoriesName: string;
  description: string;
  introduction: string;
  image_url: string;
  imageAssetId: string;
}

export default function SubmitPage() {
  const t = useTranslations('submit');
  const router = useRouter();
  const editorRef = useRef<EasyMDE | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [categories, setCategories] = useState<Category[]>([]);

  
  const [formData, setFormData] = useState<FormData>({
    web_link: '',
    name: '',
    categories: '',
    categoriesName: '',
    description: '',
    introduction: '',
    image_url: '',
    imageAssetId: ''
  });

  // 添加提交状态
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        console.log('Fetching categories...');
        const data = await getCategories();
        console.log('Categories data:', data);
        
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
          console.log('Categories set successfully');
        } else {
          console.log('No categories returned from API');
        }
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    }

    fetchCategories();
  }, []);

  console.log('Current categories state:', categories);

  useEffect(() => {
    if (!textareaRef.current || editorRef.current) return;

    const init = async () => {
      const editor = new EasyMDE({
        element: textareaRef.current!,
        placeholder: t('form.introduction.placeholder'),
        spellChecker: false,
        status: false,
        toolbar: [
          'bold', 'italic', 'code', 'quote', 'link',
          'unordered-list', 'ordered-list', 'preview', 'guide'
        ],
        autofocus: false,
        initialValue: formData.introduction,
      });

      editor.codemirror.on('change', () => {
        setFormData(prev => ({ ...prev, introduction: editor.value() }));
      });

      editorRef.current = editor;
    };

    init();

    return () => {
      if (editorRef.current) {
        editorRef.current.toTextArea();
        editorRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      // 验证表单数据
      if (!formData.web_link || !formData.name || !formData.categories || !formData.description || !formData.introduction || !formData.image_url) {
        throw new Error('请填写所有必填字段');
      }

      // 准备存储数据
      const submissionData = {
        web_link: formData.web_link,
        name: formData.name,
        categories: {
          _type: 'reference',
          _ref: formData.categories  // 这里是 category 的 _id
        },
        categoriesName: formData.categoriesName,
        description: formData.description,
        introduction: formData.introduction,
        url: formData.image_url,
        image_url: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: formData.imageAssetId
          }
        },
        created_at: new Date().toISOString()
      };

      // 存储到 localStorage
      localStorage.setItem('submissionData', JSON.stringify(submissionData));

      // 跳转到支付页面
      router.push('/submit/payment');
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败，请重试');
      console.error('提交错误:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (url: string, assetId: string) => {
    setFormData(prev => ({
      ...prev,
      image_url: url,
      imageAssetId: assetId
    }));
  };

  return (
    <>
      <style jsx global>{markdownEditorStyles}</style>
      <div className="max-w-4xl mx-auto p-4 space-y-8">
        <div className="flex items-start gap-4">
          <div className="w-1/3">
            <h1 className="text-2xl font-semibold">{t('title')}</h1>
          </div>

          <div className="w-2/3">
            <div className="flex items-center justify-between">
              {['details', 'payment', 'publish'].map((step, index) => (
                <div key={step} className="flex items-center">
                  {index > 0 && (
                    <div className="h-[1px] w-[120px] bg-border mx-4" />
                  )}
                  <div className="flex flex-col items-center gap-2">
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium",
                      index === 0 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted/50 text-muted-foreground"
                    )}>
                      {index + 1}
                    </div>
                    <span className={cn(
                      "text-sm font-medium",
                      index === 0 ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {t(`steps.${step}`)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="web_link">{t('form.web_link.label')}</Label>
                <Input 
                  id="web_link" 
                  placeholder={t('form.web_link.placeholder')}
                  value={formData.web_link}
                  onChange={(e) => setFormData({...formData, web_link: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">{t('form.name.label')}</Label>
                <Input 
                  id="name" 
                  placeholder={t('form.name.placeholder')}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>{t('form.categories.label')}</Label>
              <Select
                value={formData.categories}
                onValueChange={(value) => {
                  // 找到选中的 category 对象
                  const selectedCategory = categories.find(cat => cat._id === value);
                  
                  // 同时更新 categories 和 categoriesName
                  setFormData({
                    ...formData, 
                    categories: value,
                    categoriesName: selectedCategory ? selectedCategory.title : ''
                  });
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t('form.categories.placeholder')} />
                </SelectTrigger>
                <SelectContent>
                {categories.map((category) => (
                    <SelectItem key={category.value} value={category._id}>
                        {category.title}
                    </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">{t('form.description.label')}</Label>
              <Textarea 
                id="description" 
                placeholder={t('form.description.placeholder')}
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t('form.introduction.label')}</Label>
                  <span className="text-sm text-muted-foreground">
                    {t('form.introduction.markdownSupported')}
                  </span>
                </div>
                <div className="markdown-editor-container">
                  <textarea ref={textareaRef} />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>{t('form.image_url.label')}</Label>
                  <span className="text-sm text-muted-foreground">
                    {t('form.image_url.sizeLimit')}
                  </span>
                </div>
                <ImageUpload
                  value={formData.image_url}
                  assetId={formData.imageAssetId}
                  onChange={handleImageChange}
                  description="点击或拖拽图片上传"
                  className="w-full"
                />
              </div>
            </div>

            <div className="bg-muted/50 -mx-6 -mb-6 mt-6 p-6 flex items-center justify-between">
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
              >
                {isSubmitting ? '提交中...' : t('submit')}
              </Button>
              {error && (
                <span className="text-sm text-destructive">{error}</span>
              )}
              <span className="text-sm text-muted-foreground flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                {t('helpText')}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
} 