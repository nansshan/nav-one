'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Check, X } from "lucide-react"
import Image from "next/image"
import { useRouter } from 'next/navigation';
import { useToast } from "@/components/ui/use-toast";
import {createSubmission } from "@/lib/sanity/client";
interface Category {
  title: string;
  value: string;
  _id: string;
}
interface SubmissionData {
  web_link: string;
  name: string;
  categories: string;
  categoriesName: string;
  description: string;
  introduction: string;
  image_url: string;
  created_at: string;
  url: string;
}

export default function PaymentPage() {
  const t = useTranslations('payment');
  const router = useRouter();
  const [submissionData, setSubmissionData] = useState<SubmissionData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  useEffect(() => {
    // 从 localStorage 读取数据
    const storedData = localStorage.getItem('submissionData');
    if (storedData) {
      setSubmissionData(JSON.parse(storedData));
    } else {
      // 如果没有数据，重定向回提交页面
      router.push('/submit');
    }
  }, [router]);

  if (!submissionData) {
    return null; // 或者显示加载状态
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('zh-CN');
  };

  const handleFreeSubmit = async () => {
    try {
      setIsSubmitting(true);
      setError(null);

      if (!submissionData) {
        throw new Error('没有找到提交数据');
      }

      // 准备提交数据
      const submitData = {
        ...submissionData,
        userid: 'test-user',
        email: 'test@example.com',
        web_status: 2, // 设置状态为待审核
        pay: 1, // 免费
        create_time: new Date().toISOString(),
        update_time: new Date().toISOString()
      };

      // 提交到 Sanity
      const result = await createSubmission(submitData);

      if (!result || !result._id) {
        throw new Error('提交失败');
      }

      // 提交成功后显示提示
      toast({
        title: "提交成功",
        description: "您的网站已提交成功，我们会尽快进行审核",
        duration: 3000,
      });

      // 清除 localStorage
      localStorage.removeItem('submissionData');

    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败，请重试');
      console.error('提交错误:', err);
      
      // 显示错误提示
      toast({
        title: "提交失败",
        description: err instanceof Error ? err.message : '提交失败，请重试',
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-8">
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Submit</h1>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center">
            <Check className="h-4 w-4" />
          </div>
          <span className="text-muted-foreground">Details</span>
        </div>
        <div className="flex-1 h-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">2</div>
          <span className="font-medium">Payment</span>
        </div>
        <div className="flex-1 h-px bg-border" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center">3</div>
          <span className="text-muted-foreground">Publish</span>
        </div>
      </div>
    </div>

    <Card>
      <CardContent className="p-6">
        <div className="text-sm text-muted-foreground mb-2">2/3 选择定价方案</div>
        <div className="grid md:grid-cols-[1fr,2fr] gap-6 mb-8">
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden border">
            <Image
              src={submissionData.url}
              alt="Product preview"
              fill
              className="object-cover"
            />
            <div className="absolute bottom-2 left-2 flex gap-2">
              <Badge variant="secondary">{submissionData.categoriesName}</Badge>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold">{submissionData.name}</h2>
            <p className="text-muted-foreground">{submissionData.description}</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">计划:</div>
                <div>Free</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">状态:</div>
                <div>待支付</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">发布日期:</div>
                <div>未发布</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">创建日期:</div>
                <div>{formatDate(submissionData.created_at)}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="relative">
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold">FREE</h3>
                <div className="text-3xl font-bold">$0</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Get 3 dofollow links to boost your SEO</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Permanent link with backlink maintenance</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Reviewed and listed within 72 hours</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Publish your product the day you want</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <X className="h-5 w-5 shrink-0" />
                  <span>Backlink to our site is required</span>
                </li>
                <li className="flex gap-2 text-muted-foreground">
                  <X className="h-5 w-5 shrink-0" />
                  <span>No customer support</span>
                </li>
              </ul>
              <Button 
                className="w-full" 
                variant="outline"
                onClick={handleFreeSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? '提交中...' : 'Submit to review'}
              </Button>
              {error && (
                <p className="text-sm text-destructive mt-2">{error}</p>
              )}
            </CardContent>
          </Card>

          <Card className="relative">
            <CardContent className="p-6">
              <Badge className="absolute -top-3 right-6 bg-primary text-primary-foreground">POPULAR</Badge>
              <div className="flex justify-between items-start mb-6">
                <h3 className="text-xl font-bold">PRO</h3>
                <div className="text-3xl font-bold">$9.9</div>
              </div>
              <ul className="space-y-3 mb-6">
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Get at least 3 dofollow links to boost your SEO</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Listed immediately, publish it whenever you want</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Permanent link, no backlink required</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Featured in listings with an award icon</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Share through social media and newsletters</span>
                </li>
                <li className="flex gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0" />
                  <span>Premium customer support</span>
                </li>
              </ul>
              <Button className="w-full bg-primary text-primary-foreground">
                Pay & Publish Right Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  </div>
  );
} 