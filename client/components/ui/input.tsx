import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> { }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input autoComplete="off"
        type={type}
        className={cn(
          "w-full bg-white rounded-lg border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 disabled:cursor-not-allowed text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out placeholder:text-sm",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
