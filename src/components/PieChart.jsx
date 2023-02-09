import { ResponsivePie } from "@nivo/pie";
import { useMemo } from "react";

export const PieChart = ({ hideLegend=false, series=[], labels=[], colors=[], width=200, isDonut=false }) => {
    const data = useMemo(() => {
        return labels.map((l, i) => ({ id: l, label: l, value: series[i] }))
    }, [series, labels])

    const padding = isDonut ? 20 : 50
    return (
        <div className={`text-[11px] h-full`} style={{ width: width+padding }}>
            <ResponsivePie
                data={data}
                padAngle={1}
                cornerRadius={2}
                sortByValue
                enableArcLabels={false}
                colors={colors}
                innerRadius={isDonut ? 0.3 : 0.08}
                arcLinkLabelsStraightLength={4}
                margin={{ top: padding, right: padding, bottom: padding+10, left: padding }}
                arcLinkLabel={d => `${d.value}`}
                arcLinkLabelsTextColor={{ from: 'color' }}
                arcLinkLabelsColor={{ from: "color" }}
                isInteractive
                activeOuterRadiusOffset={4}
                legends={hideLegend ? [] : [
                    {
                        anchor: 'bottom',
                        direction: 'column',
                        justify: false,
                        translateX: 0,
                        translateY: 30,
                        itemsSpacing: 4,
                        itemWidth: 60,
                        itemHeight: 18,
                        itemTextColor: '#999',
                        itemDirection: 'left-to-right',
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: 'square',
                        effects: [
                            {
                                on: 'hover',
                                style: {
                                    itemTextColor: '#000'
                                }
                            }
                        ]
                    }
                ]}
            />
        </div>
    )
}