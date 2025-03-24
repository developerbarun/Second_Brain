import { ReactElement } from "react";

interface ButtonProps{
    varient : "primary" | "secondary",
    size : "sm" | "md" | "lg",
    text : string,
    startIcon ?: ReactElement,
    endIcon ?: any,
    fullWidth ?: boolean, 
    loading ?: boolean, 
    onClick ?: () => void,
}

const buttonVarient = {
    "primary" : "bg-purple-600 text-white hover:bg-purple-500",
    "secondary" : "bg-purple-200 text-purple-600 hover:bg-blue-50",
}

const sizeStyle = {
    "sm" : "py-1 px-2 text-sm",
    "md" : "py-2 px-4 text-md",
    "lg" : "py-3 px-6 text-lg"
}

const defaultStyles = "rounded-md font-light";

export const Button = (props : ButtonProps) => {
  return (
    <button 
      className={`flex items-center gap-2  ${buttonVarient[props.varient]} ${defaultStyles} ${sizeStyle[props.size]}${props.fullWidth ? " w-full flex justify-center items-center" : ""} ${props.loading ? "opacity-45" : ""}`} disabled={props.loading}
      onClick={props.onClick}
    >
      {props.startIcon && <span>{props.startIcon}</span>}
      {props.text}
    </button>
  )
}