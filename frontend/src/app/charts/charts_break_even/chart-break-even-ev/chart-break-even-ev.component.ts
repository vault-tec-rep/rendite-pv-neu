import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-chart-break-even-ev',
  templateUrl: './chart-break-even-ev.component.html',
  styleUrls: ['./chart-break-even-ev.component.css']
})
export class ChartBreakEvenEvComponent implements OnInit {
  chartInstance;
  chartOption: EChartOption = {
    xAxis: {
      type: 'value',
      name: 'Jahre',
      min: 0, 
      max: 20,
    },
    yAxis: {
      type: 'value',
      name: 'Euro',
    },
    series: [
      {
        data: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0]],
        type: 'line',
        lineStyle: {color: '#76B900' }
      },
      {
        data: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0]],
        type: 'line',
        lineStyle: {color: '#000000' }
      }
    ],
  };

  constructor() { }

  ngOnInit(): void {
  }


  aktualisiere_chart(gewinnkurve) {
    let option = this.chartInstance.getOption()

    option.series[0] = {
      data: [[0, gewinnkurve[0]], [1, gewinnkurve[1]], [2, gewinnkurve[2]], [3, gewinnkurve[3]], [4, gewinnkurve[4]], [5, gewinnkurve[5]], [6, gewinnkurve[6]],
             [7, gewinnkurve[7]], [8, gewinnkurve[8]], [9, gewinnkurve[9]], [10, gewinnkurve[10]], [11, gewinnkurve[11]], [12, gewinnkurve[12]], [13, gewinnkurve[13]],
             [14, gewinnkurve[14]], [15, gewinnkurve[15]], [16, gewinnkurve[16]], [17, gewinnkurve[17]], [18, gewinnkurve[18]], [19, gewinnkurve[19]], [20, gewinnkurve[20]]],
      type: 'line', 
      lineStyle: {color: '#76B900'},
    };
    this.chartInstance.setOption(option);
  }

  
  onChartInit(chart) {
    this.chartInstance = chart;
  }
}
