import type { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>

export function Input({ className = '', ...props }: InputProps) {
    return (
        <input
            {...props}
            className={`min-w-0 rounded-xl border border-slate-200
                 bg-white px-4 py-2.5 text-sm text-slate-700 
                 shadow-sm outline-none transition-colors 
                 placeholder:text-slate-400 hover:border-slate-300
                  focus:border-brand-500 focus:ring-2 focus:ring-brand-500/15 
                  disabled:cursor-not-allowed disabled:opacity-60 
                  ${className}`}
        />
    )
}