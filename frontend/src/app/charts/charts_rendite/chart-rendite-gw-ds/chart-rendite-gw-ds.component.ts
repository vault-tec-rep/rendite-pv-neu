import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-chart-rendite-gw-ds',
  templateUrl: './chart-rendite-gw-ds.component.html',
  styleUrls: ['./chart-rendite-gw-ds.component.css']
})
export class ChartRenditeGwDsComponent implements OnInit {
  chartInstance;

  chartOption: EChartOption = {
    series: [{
      name: "Indicator",
      type: "gauge",
      min: 0,
      max: 100,
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
