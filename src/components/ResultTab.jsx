import { useLocation, useNavigate } from "react-router-dom"

export const ResultTabItem = ({ title, type, onClick, selected }) => {
    return (
        <div 
            onClick={onClick} 
            className={`cursor-pointer flex-1 p-3 text-center font-bold border-[#8A7ED5] border-b-4 text-[#8A7ED5] ${selected !== type ? 'border-[transparent] text-gray-700 hover:text-gray-500' : ''}`}>
            {title}
        </div>
    )
}

export const ResultTab = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const onTabItemClicked = (type) => {
        navigate("/results/"+type)
    }
    
    const currentType = location.pathname?.replace("/results/", "")
    const selected = currentType || "overview" // overview | career | utycc

    return (
        <div className="max-w-[50%] min-w-[360px] md:min-w-[400px] flex gap-2 shadow-lg sticky top-0 left-0">
            <ResultTabItem 
                type="overview" 
                title="Overview" 
                onClick={() => onTabItemClicked("overview")} 
                selected={selected}
            />
            <ResultTabItem 
                type="career" 
                title="Job/Career" 
                onClick={() => onTabItemClicked("career")} 
                selected={selected}
            />
            <ResultTabItem 
                type="utycc" 
                title="UTYCC" 
                onClick={() => onTabItemClicked("utycc")} 
                selected={selected}
            />
        </div>
    )
}