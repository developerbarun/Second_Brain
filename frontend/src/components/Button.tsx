import { ReactElement } from "react";

interface ButtonProps{
    varient : "primary" | "secondary",
    size : "sm" | "md" | "lg",
    text : string,
    startIcon ?: ReactElement,
    endIcon ?: any,
    onClick : () => void,
}

const buttonVarient = {
    "primary" : "bg-purple-600 text-white hover:bg-purple-500",
    "secondary" : "bg-purple-300 text-purple-600 hover:bg-blue-50",
}

const sizeStyle = {
    "sm" : "py-1 px-2 text-sm",
    "md" : "py-2 px-4 text-md",
    "lg" : "py-3 px-6 text-lg"
}

const defaultStyles = "rounded-md ";

export const Button = (props : ButtonProps) => {
  return (
    <button 
      className={`flex items-center gap-2  ${buttonVarient[props.varient]} ${defaultStyles} ${sizeStyle[props.size]}`}
      onClick={props.onClick}
    >
      {props.startIcon && <span>{props.startIcon}</span>}
      {props.text}
      {props.endIcon && <span>{props.endIcon}</span>}
      {/* {props.endIcon} */}
    </button>
  )
}