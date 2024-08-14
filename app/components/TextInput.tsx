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
                text-[white]
                text-[13px]
                border
                border-[#8A5A9C]
                border-0.2px
                rounded-2xl
                py-2.5
                px-3
                focus:outline-none
            " 
            value={string || ''}
            onChange={(event) => onUpdate(event.target.value)}
            type={inputType}
            autoComplete="off"
        />

        <div className="text-[#F44747] text-[12px] font-semibold mt-2">
            {error ? (error) : null}
        </div>
    </>
  )
}