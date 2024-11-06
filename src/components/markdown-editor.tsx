'use client';

import { useEffect, useRef } from 'react';
import EasyMDE from 'easymde';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const editorRef = useRef<EasyMDE | null>(null);

  useEffect(() => {
    if (!textareaRef.current || editorRef.current) return;

    const init = async () => {
      const EasyMDEModule = (await import('easymde')).default;
      const editor = new EasyMDEModule({
        element: textareaRef.current!,
        placeholder: placeholder,
        spellChecker: false,
        status: false,
        toolbar: [
          {
            name: "heading",
            className: "fa fa-header",
            title: "标题",
            children: [
              {
                name: "heading-1",
                action: EasyMDEModule.toggleHeading1,
                className: "fa fa-header header-1",
                title: "一级标题",
              },
              {
                name: "heading-2",
                action: EasyMDEModule.toggleHeading2,
                className: "fa fa-header header-2",
                title: "二级标题",
              },
              {
                name: "heading-3",
                action: EasyMDEModule.toggleHeading3,
                className: "fa fa-header header-3",
                title: "三级标题",
              }
            ]
          },
          '|',
          'bold',
          'italic', 
          'code',
          'quote',
          '|',
          'unordered-list',
          'ordered-list',
          '|',
          'link',
          'image',
          '|',
          'preview',
          'side-by-side',
          'fullscreen',
          'guide'
        ],
        autofocus: false,
        initialValue: value,
      });

      editor.codemirror.on('change', () => {
        onChange(editor.value());
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

  return <textarea ref={textareaRef} className="w-full" />;
}