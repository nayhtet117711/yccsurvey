import { CircleStackIcon, MagnifyingGlassIcon, XCircleIcon } from "@heroicons/react/20/solid"
import { useMemo } from "react"
import { useState } from "react"
import { positionList } from "../../constants"

export const ExpandedDropdown = ({value, onChange, placeholder}) => {
    const [searchText, setSearchText] = useState("")

    const itemsView = useMemo(() => {
        return positionList
            .filter(pName => !searchText.trim() || pName.toLowerCase().includes(searchText.toLowerCase()))
            .map((pName, i) => (
            <div 
                key={i} 
                className={`px-2 py-2 cursor-pointer text-md bg-white hover:bg-gray-100 ${value==pName ? 'bg-violet-200 bold' : ''}`}
                tabIndex={0} onClick={() => {
                    setSearchText(pName)
                    onChange(pName)
                }}
            >
                {pName}
            </div>
        ))
    }, [value, searchText, onChange])
    
    return (
        <div className="pt-3 pl-4 md:pl-8">
            <div className="max-w-[360px] relative">
                <label className="pl-1 text-gray-500">{placeholder}</label>
                <div className="py-1 px-[2px] relative">
                    <input 
                        className={`${value ? '' : 'pl-7'} text-md bg-white rounded-sm w-full outline-none border-1 border-gray-200 form-input py-1 `}
                        value={searchText} 
                        onChange={e => setSearchText(e.target.value)} 
                        placeholder="Search by position name"
                        disabled={!!value}
                    />
                    {!value && <div className="absolute left-0 top-0 bottom-0 flex justify-center items-center pl-2">
                        <MagnifyingGlassIcon 
                            color="#b5b5b5" 
                            className="w-4 h-4" 
                        />
                    </div>}
                    {value && <div 
                        tabIndex={0}
                        onClick={() => {
                            onChange("")
                            setSearchText("")
                        }} 
                        className="absolute cursor-pointer right-0 top-0 bottom-0 flex justify-center items-center pr-2">
                        <XCircleIcon 
                            color="#b5b5b5" 
                            className="w-4 h-4" 

                        />
                    </div>}
                </div>
                {!value && <div className="absolute left-0 right-0 border max-h-[160px] overflow-y-auto bg-white shadow">
                    <div className="flex flex-col divide-y-[1px]">
                        { itemsView }
                    </div>
                    { itemsView.length === 0 && 
                    <div className="text-gray-400 text-sm p-2 h-full flex flex-col gap-2 justify-center items-center bg-white">
                        <CircleStackIcon color="#d0d0d0" className="w-10 h-10" />
                        <div>No position found!</div>
                    </div>}
                </div>}
            </div>
        </div>
    )
}