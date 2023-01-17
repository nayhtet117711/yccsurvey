import ReactApexChart from "react-apexcharts";

export const StackLineChartFull = ({ series=[], labels=[], colors=[] }) => {
    const options = {
        chart: {
            type: 'bar',
            height: 400,
            stacked: true,
            stackType: '100%',
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '40%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        colors,
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: labels,
        },
        yaxis: {
            title: {
                show: false
            },
            labels: {
                formatter: function(val, i, o) {
                    return val+"%"
                    // const maxYValue = o?.globals?.stackedSeriesTotals.reduce((r, c) => c>r ? c : r, 0) || 0
                    // return maxYValue * (val / 100).toFixed()
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            show: true,
            position: 'right',
            inverseOrder: true,
            fontSize: 15,
            markers: {
                width: 20,
                height: 20,
                radius: 0,
                offsetY: 5
            },
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val
                }
            }
        }
    }


    return (
        <ReactApexChart
            options={options}
            series={series}
            type="bar"
            height={400}
        />
    )
}