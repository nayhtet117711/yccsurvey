import ReactApexChart from "react-apexcharts";

export const GroupLineChart = ({ series=[], labels=[], colors=[] }) => {
    const options = {
        chart: {
            type: 'bar',
            height: 400,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '75%',
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
                formatter: function(val) {
                    return val.toLocaleString()
                }
            }
        },
        fill: {
            opacity: 1
        },
        legend: {
            show: false,
            position: "right"
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val.toLocaleString()
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