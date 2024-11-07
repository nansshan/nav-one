'use client';

import { ChevronLeft, ChevronRight } from "lucide-react"
import { PaginationLink } from "./pagination"

interface CustomPaginationButtonProps {
  href: string;
  className?: string;
  'aria-label'?: string;
  children?: React.ReactNode;
}

export function CustomPaginationPrevious({
  className,
  children,
  ...props
}: CustomPaginationButtonProps) {
  return (
    <PaginationLink
      size="default"
      className={className}
      {...props}
    >
      <ChevronLeft className="h-4 w-4 mr-2" />
      <span>{children}</span>
    </PaginationLink>
  )
}

export function CustomPaginationNext({
  className,
  children,
  ...props
}: CustomPaginationButtonProps) {
  return (
    <PaginationLink
      size="default"
      className={className}
      {...props}
    >
      <span>{children}</span>
      <ChevronRight className="h-4 w-4 ml-2" />
    </PaginationLink>
  )
} 