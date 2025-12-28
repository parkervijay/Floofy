"use client";

import * as React from 'react';
import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

const alertVariants = cva(
  'flex items-stretch w-full gap-2',
  {
    variants: {
      variant: {
        secondary: '',
        primary: '',
        destructive: '',
        success: '',
        info: '',
        warning: '',
      },
      appearance: {
        solid: '',
        outline: '',
        light: '',
      },
      size: {
        lg: 'rounded-lg p-4 gap-3 text-base [&>[data-slot=alert-icon]>svg]:size-6',
        md: 'rounded-lg p-3.5 gap-2.5 text-sm [&>[data-slot=alert-icon]>svg]:size-5',
        sm: 'rounded-md px-3 py-2.5 gap-2 text-xs [&>[data-slot=alert-icon]>svg]:size-4',
      },
    },
    compoundVariants: [
  /* SOLID */
  {
    variant: 'secondary',
    appearance: 'solid',
    className: 'bg-[#38BDF8] text-white *:data-alert-close:text-white',
  },
  {
    variant: 'primary',
    appearance: 'solid',
    className: 'bg-[#1D4ED8] text-white *:data-alert-close:text-white',
  },

  /* ✅ SUCCESS → GREEN (CHANGED) */
  {
    variant: 'success',
    appearance: 'solid',
    className: 'bg-[#22C55E] text-white *:data-alert-close:text-white',
  },

  {
    variant: 'warning',
    appearance: 'solid',
    className: 'bg-[#FACC15] text-[#78350F] *:data-alert-close:text-[#78350F]',
  },
  {
    variant: 'info',
    appearance: 'solid',
    className: 'bg-[#22C55E] text-white *:data-alert-close:text-white',
  },
  {
    variant: 'destructive',
    appearance: 'solid',
    className: 'bg-[#DC2626] text-white *:data-alert-close:text-white',
  },

  /* LIGHT */
  {
    variant: 'secondary',
    appearance: 'light',
    className:
      'bg-[#E0F2FE] border border-[#38BDF8]/40 text-[#075985] [&>div:first-of-type>svg]:text-[#38BDF8]',
  },
  {
    variant: 'primary',
    appearance: 'light',
    className:
      'bg-[#EFF6FF] border border-[#1D4ED8]/40 text-[#1E3A8A] [&>div:first-of-type>svg]:text-[#1D4ED8]',
  },

  /* ✅ SUCCESS → GREEN (LIGHT) (CHANGED) */
  {
    variant: 'success',
    appearance: 'light',
    className:
      'bg-[#ECFDF5] border border-[#22C55E]/40 text-[#065F46] [&>div:first-of-type>svg]:text-[#22C55E]',
  },

  {
    variant: 'warning',
    appearance: 'light',
    className:
      'bg-[#FEF9C3] border border-[#FACC15]/40 text-[#854D0E] [&>div:first-of-type>svg]:text-[#FACC15]',
  },
  {
    variant: 'info',
    appearance: 'light',
    className:
      'bg-[#ECFDF5] border border-[#22C55E]/40 text-[#065F46] [&>div:first-of-type>svg]:text-[#22C55E]',
  },
  {
    variant: 'destructive',
    appearance: 'light',
    className:
      'bg-[#FEE2E2] border border-[#DC2626]/40 text-[#991B1B] [&>div:first-of-type>svg]:text-[#DC2626]',
  },
],

    defaultVariants: {
      variant: 'secondary',
      appearance: 'solid',
      size: 'md',
    },
  },
);

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  close?: boolean;
  onClose?: () => void;
}

function Alert({
  className,
  variant,
  size,
  appearance,
  close = false,
  onClose,
  children,
  ...props
}: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant, size, appearance }), className)}
      {...props}
    >
      {children}
      {close && (
        <button
          type="button"
          onClick={onClose}
          aria-label="Dismiss"
          className="shrink-0 ml-auto p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}

function AlertTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <div
      data-slot="alert-title"
      className={cn('grow tracking-tight font-medium', className)}
      {...props}
    />
  );
}

function AlertIcon({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="alert-icon"
      className={cn('shrink-0', className)}
      {...props}
    >
      {children}
    </div>
  );
}

function AlertDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <div
      data-slot="alert-description"
      className={cn('text-sm [&_p]:leading-relaxed', className)}
      {...props}
    />
  );
}

export { Alert, AlertIcon, AlertTitle, AlertDescription };