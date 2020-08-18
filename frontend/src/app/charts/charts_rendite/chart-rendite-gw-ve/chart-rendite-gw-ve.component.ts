import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-chart-rendite-gw-ve',
  templateUrl: './chart-rendite-gw-ve.component.html',
  styleUrls: ['./chart-rendite-gw-ve.component.css']
})
export class ChartRenditeGwVeComponent implements OnInit {
  chartInstance;

  chartOption: EChartOption = {
    series: [{
      name: "Indicator",
      type: "gauge",
      min: 0,
      max: 15,
      data: [{
        value: 0,
      }], 
      detail: {fontSize: 20},
      axisLine: {lineStyle: {color: [[1, '#76B900']], width: 20}},
      axisLabel: {formatter: '{value}%'}
    }],

  };
  constructor() { }

  ngOnInit(): void {
  }


  aktualisiere_chart(rendite: number) {
    let option = this.chartInstance.getOption()

    option.series = {
      data: [{
        value: rendite,
      }], 
    };
    this.chartInstance.setOption(option);
  }

  
  onChartInit(chart) {
    this.chartInstance = chart;
  }

}
