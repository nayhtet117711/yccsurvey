import ReactApexChart from "react-apexcharts";

export const StackLineChart = ({ series=[], labels=[], colors=[] }) => {
    const options = {
        chart: {
            type: 'bar',
            height: 400,
            stacked: true,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '50%',
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false
        },
        colors: colors, //['#5C99C7', '#8A7ED5', '#505ED1'],
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: labels, //['IST', 'CE', 'ECE', 'AME', "PRE"],
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
            show: true,
            position: 'right',
            inverseOrder: true,
            offsetY: 150,
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