import { useRef } from "react"
import { useState } from "react"

export const Dropdown = ({ options=[], selected, setSelected }) => {
    const dropdownRef = useRef()

    const onSelect = (option) => {
        setSelected(option)
        if(dropdownRef.current) {
            dropdownRef.current.style.display = "none"
            setTimeout(() => dropdownRef.current.style.display = "", 10)
        }
    }

    return (
        <div className="shadow-md shadow-[#99999955] relative min-w-[140px]">
            <div className="duration-200 ease-in-out cursor-default peer px-0 py-2 tracking-wide text-md rounded-sm flex items-center">
                <div className="grow px-4 text-center">{ selected || <span className="text-gray-300">None</span> }</div>
                <div className="w-[40px] flex justify-center text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
                    </svg>
                </div>
            </div>
            <div ref={dropdownRef} className="-mt-[1px] bg-white duration-200 ease-in-out shadow hidden absolute left-0 right-0 peer-hover:flex peer-hover:flex-col hover:flex hover:flex-col divide-y-[1px] divide-gray-100 rounded-b-sm">
                { options.filter(o => o !== selected).map(o => (
                    <div key={o} className="flex cursor-pointer hover:bg-gray-50">
                        <div onClick={() => onSelect(o)} className="grow text-center py-2 tracking-wide text-md font-light">{o}</div>
                        <div className="w-[40px]"></div>
                    </div>
                ))}
            </div>
        </div>
    )
}