import ReactApexChart from "react-apexcharts";

export const GroupLineChart = ({ series=[], labels=[], colors=[] }) => {

    // const series = [{
    //     name: 'Bachelor',
    //     data: [44, 55, 57, 56, 61]
    // }, {
    //     name: 'Master',
    //     data: [76, 85, 101, 98, 87]
    // }, {
    //     name: 'PhD',
    //     data: [35, 41, 36, 26, 45]
    // }]

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