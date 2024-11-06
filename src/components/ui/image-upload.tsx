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
  const [preview, setPreview] = useState(value);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
        onChange(reader.result as string);
      };
      reader.readAsDataURL(file);
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

  const removeImage = () => {
    setPreview('');
    onChange('');
  };

  return (
    <div 
      {...getRootProps()}
      className={cn(
        "border border-input rounded-lg bg-background",
        "flex items-center justify-center",
        className
      )}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative w-full h-full">
          <Image
            src={preview}
            alt="Preview"
            fill
            className="object-contain p-4"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeImage();
            }}
            className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="text-center p-4">
          <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-sm text-muted-foreground">
            {description}
          </p>
        </div>
      )}
    </div>
  );
} 