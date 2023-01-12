import ReactApexChart from "react-apexcharts";

export const PieChart = ({ hideLegend=false, series=[], labels=[], colors=[], width=350, isDonut=false }) => {

    const options = {
        chart: {
          width,
          type: isDonut ? 'donut' : 'pie',
          offsetY: hideLegend ? 2 : 50,
        },
        labels,
        colors,
        dataLabels: {
            formatter: function(_, s) {
                return s.w.globals.series[s.seriesIndex]
            },
        },
        legend: {
            show: hideLegend ? false : true,
            position: 'bottom',
            fontSize: 15,
            width: 150,
            horizontalAlign: 'start',
            offsetX: 100,
            markers: {
                width: 20,
                height: 20,
                radius: 0,
            },
            itemMargin: {
                vertical: 5
            }
        },
        plotOptions:  {
            pie: {
                donut: isDonut ? { size: "38%" } : {}
            }
        }
      }


    return (
        <ReactApexChart
            options={options}
            series={series}
            type={isDonut ? "donut" : "pie"}
            height={width}
        />
    )
}