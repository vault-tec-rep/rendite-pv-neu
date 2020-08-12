import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-chart-betrieb-funktion',
  templateUrl: './chart-betrieb-funktion.component.html',
  styleUrls: ['./chart-betrieb-funktion.component.css']
})
export class ChartBetriebFunktionComponent implements OnInit {
  chartInstance;
  chartOption: EChartOption = {
    xAxis: {
      type: 'value',
      min: 0, 
      max: 20,
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [[0, 0], [1, 0], [2, 0], [3, 0], [4, 0], [5, 0], [6, 0], [7, 0], [8, 0], [9, 0], [10, 0], [11, 0], [12, 0], [13, 0], [14, 0], [15, 0], [16, 0], [17, 0], [18, 0], [19, 0], [20, 0]],
        type: 'line',
        lineStyle: {color: '#76B900' }
      },
    ],
  };

  constructor() { }

  ngOnInit(): void {
  }


  aktualisiere_chart(Y_Werte: number[]) {
    let option = this.chartInstance.getOption();

    option.series = {
      data: [[0, Y_Werte[0]], [1, Y_Werte[1]], [2, Y_Werte[2]], [3, Y_Werte[3]], [4, Y_Werte[4]], [5, Y_Werte[5]], [6, Y_Werte[6]],
             [7, Y_Werte[7]], [8, Y_Werte[8]], [9, Y_Werte[9]], [10, Y_Werte[10]], [11, Y_Werte[11]], [12, Y_Werte[12]], [13, Y_Werte[13]],
             [14, Y_Werte[14]], [15, Y_Werte[15]], [16, Y_Werte[16]], [17, Y_Werte[17]], [18, Y_Werte[18]], [19, Y_Werte[19]], [20, Y_Werte[20]]],
      type: 'line'
    };

    this.chartInstance.setOption(option);
  }
  
  onChartInit(chart) {
    this.chartInstance = chart;
  }
  
}
