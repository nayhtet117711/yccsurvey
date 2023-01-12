import "./range-slider.css"

export const JobCareerHeaderRow = () => {
    return (
        <div className="flex gap-5 pb-4">
            <div className="flex-1 p-1 text-gray-600"><div className="w-[50%] text-center">Title</div></div>
            <div className="flex-1 p-1 text-gray-600"><div className="w-[60%] text-center">Avg</div></div>
            <div className="flex-1 p-1 text-gray-600 text-center">Range</div>
        </div>
    )
}

export const JobCareerRow = ({ title="Untitled", avg=0, range=0, rangeMin=0, rangeMax=0 }) => {
    return (
        <div className="flex gap-5 py-2">
            <div className="flex-1 p-3 flex items-center">{title}</div>
            <div className="flex-1 p-3 flex items-center">MMK {avg.toLocaleString()} <span className="text-gray-500 pl-1 text-md">per month</span></div>
            <div className="flex-1 p-3">
                <div className="px-10">
                    <input type="range" min={rangeMin} max={rangeMax} value={range} readOnly title={range.toLocaleString()} />
                </div>
                <div className="flex justify-between">
                    <div className="text-gray-500 text-sm">MMK {rangeMin.toLocaleString()}</div>
                    <div className="text-gray-500 text-sm">MMK {rangeMax.toLocaleString()}</div>
                </div>
            </div>
        </div>
    )
}
