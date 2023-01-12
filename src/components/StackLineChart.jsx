import ReactApexChart from "react-apexcharts";

export const StackLineChart = ({ series=[], labels=[], colors=[] }) => {

    // const series = [{
    //         name: 'Highest',
    //         data: [44, 65, 33, 44, 22]
    //     }, 
    //     {
    //         name: 'High',
    //         data: [76, 75, 44, 33, 11]
    //     }, 
    //     {
    //         name: 'Normal',
    //         data: [35, 81, 77, 22, 44]
    //     },
    //     {
    //         name: 'Low',
    //         data: [35, 21, 22, 11, 30]
    //     },
    //     {
    //         name: 'Lowest',
    //         data: [35, 31, 11, 22, 31]
    //     }
    // ]

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
                    return val
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