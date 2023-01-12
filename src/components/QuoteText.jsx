
export const QuoteText = ({ text, left, className }) => {
    const leftClasses = "italic font-light p-8 pl-[20%] text-end " + (className || "")
    const rightClasses = "italic font-light p-8 pr-[20%] text-start " + (className || "")

    return (
        <div className={left ? leftClasses : rightClasses} style={{ boxShadow: "0px 4px 4px 0px #B782E8a0 inset" }}>
            { text }
        </div>
    )
}