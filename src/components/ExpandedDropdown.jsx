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
                className={`px-2 py-2 cursor-pointer text-sm bg-white hover:bg-gray-100 ${value==pName ? 'bg-indigo-300 bold' : ''}`}
                tabIndex={0} onClick={() => {
                    setSearchText("")
                    onChange(pName)
                }}
            >
                {pName}
            </div>
        ))
    }, [searchText])

    return (
        <div className="pt-4 pl-8">
            <div className="p-[2px] bg-gray-100 border rounded max-w-[360px]">
                <label className="p-2 text-gray-500">{placeholder}</label>
                <div className="py-1 px-[2px]">
                    <input className="text-sm bg-white rounded-sm w-full outline-none border-none form-input py-1" value={searchText} onChange={e => setSearchText(e.target.value)} placeholder="Search by position name" />
                </div>
                <div className="border max-h-[200px] overflow-y-auto">
                    <div className="flex flex-col divide-y-[1px]">
                        { itemsView }
                        { itemsView.length === 0 && <div className="text-gray-400 text-sm p-2">No position found!</div>}
                    </div>
                </div>
            </div>
        </div>
    )
}