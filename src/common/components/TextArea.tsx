import { useFormContext } from "react-hook-form";
import { Fragment, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
type InputProps = {
  label ?: string;
  name : string;
  validate?: any;
  className ?: string
}

const getInputId = (name: string) => `${name}-input`

const InputClassCheck = (isError: boolean) => 
`shadow appearance-none borderrounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${ 
  isError ? 'border-gray-200' : 'border-red-500'}`
export const TextArea = (props: InputProps) =>{
  const{label,className,name,validate} = props;
  
  const {
    register,
    formState: {errors},
  } = useFormContext();
  const error = errors[name]
  

  return(
    <div className="relative mb-4">
      <textarea {
        ...register(name,{validate})
      } 
      className={`${InputClassCheck(!error)} ${className}`}
      placeholder={label}
      id={getInputId(name)}
      ></textarea>
      {
        !!error && (
          <span className="absolute right-O text-red-400">
              {error.message as string}
          </span>
        )
      }

    </div>
  )
}


