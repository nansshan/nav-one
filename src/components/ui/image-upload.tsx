'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageIcon, X } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  description?: string;
}

export function ImageUpload({
  value,
  onChange,
  className,
  description
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(value);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      setIsUploading(true);
      const file = acceptedFiles[0];
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('上传失败');
      }

      const data = await response.json();
      
      if (data && data.url) {
        setPreviewUrl(data.url);
        onChange(data.url);
      }
    } catch (error) {
      console.error('上传错误:', error);
    } finally {
      setIsUploading(false);
    }
  }, [onChange]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': []
    },
    maxSize: 1024 * 1024,
    maxFiles: 1
  });

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewUrl('');
    onChange('');
  };

  return (
    <div 
      {...getRootProps()}
      className={cn(
        "border border-input rounded-lg bg-background",
        "flex items-center justify-center",
        "h-[calc(300px+41px)]", // 41px 是 markdown 编辑器工具栏的高度
        className
      )}
    >
      <input {...getInputProps()} />
      {isUploading ? (
        <div className="text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground animate-pulse" />
          <p className="text-sm text-muted-foreground mt-4">
            正在上传...
          </p>
        </div>
      ) : previewUrl ? (
        <div className="relative w-full h-full">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-contain p-4 rounded-lg"
          />
          <button
            onClick={removeImage}
            className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="text-center p-4">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">
            {isDragActive ? "拖放文件到这里" : description}
          </p>
        </div>
      )}
    </div>
  );
} 