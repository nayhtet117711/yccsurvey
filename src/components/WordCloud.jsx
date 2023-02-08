import ReactWordCloud from "react-wordcloud";

export const WordCloud = ({ className = "", data=[] }) => {

    const options = {
        colors: ['#150099', '#3586FF', '#505ED1', '#8A7ED5', '#5C99C7'],
        enableTooltip: true,
        deterministic: true,
        fontFamily: "impact",
        fontSizes: [9, 72],
        fontStyle: "normal",
        fontWeight: "normal",
        padding: 1,
        rotations: 3,
        rotationAngles: [0, 90],
        scale: "sqrt",
        spiral: "archimedean"
    }

    return (
        <div className={`p-3 ${className || ""}`} style={{ boxShadow: "0px 4px 4px 0px #B782E8a0 inset" }}>
            <ReactWordCloud 
              options={options} 
              words={data} 
              minSize={[400, 400]}
            />
        </div>
    )
}