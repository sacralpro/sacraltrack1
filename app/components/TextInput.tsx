import { TextInputCompTypes } from "../types"

export default function TextInput({ string, inputType, placeholder, error, onUpdate }: TextInputCompTypes) {

  return (
    <>
        <input 
            placeholder={placeholder}
            className="
                block
                w-full
                bg-[#272B43]
                text-white
                border
                border-[#8A5A9C]
                border-0.5px
                rounded-xl
                py-2.5
                px-3
                focus:outline-none
            " 
            value={string || ''}
            onChange={(event) => onUpdate(event.target.value)}
            type={inputType}
            autoComplete="off"
        />

        <div className="text-red-500 text-[14px] font-semibold">
            {error ? (error) : null}
        </div>
    </>
  )
}