import { ResponsiveBar } from "@nivo/bar";
import { useMemo } from "react";

export const GroupLineChart = ({ series=[], labels=[], colors=[], height=400 }) => {
    const keyName = "major"

    const datum = useMemo(() => {
        const data = labels.map((l, i) => {
            const keyValue = l
            const values = series.reduce((r, s) => ({ ...r, [s.name]: s.data[i] }), {})
            return {...values, [keyName]: keyValue }
        })
        const keys = Object.keys(data[0] || {}).filter(v => v!==keyName)
        return { keys, data }
    }, [series, labels])

    return (
        <div className="text-[11px]" style={{ height }}>
            <ResponsiveBar
                data={datum.data}
                keys={datum.keys}
                groupMode="grouped"
                indexBy={keyName}
                margin={{ left: 60, bottom: 30, top: 5, right: 5 }}
                padding={0.2}
                isInteractive
                label={false}
                enableGridY
                gridYValues={8}
                colors={colors}
                axisLeft={{ format: v => v.toLocaleString(), tickSize: 2, tickValues: 8 }}
                tooltip={d => (
                    <div className="bg-gray-100 rounded shadow border flex gap-2 items-center px-2 py-2">
                        <div className="w-3 h-3 rounded-sm" style={{ background: d.color }}></div>
                        <div className="flex gap-2 items-center">
                            <div className="font-bold">{d.id}:</div>
                            <div className="">{d.value.toLocaleString()} MMK</div>
                        </div>
                    </div>
                )}
            />
        </div>
    )
}