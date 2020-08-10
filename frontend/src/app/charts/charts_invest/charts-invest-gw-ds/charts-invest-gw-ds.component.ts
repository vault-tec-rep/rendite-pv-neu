import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-chart-invest-gw-ds',
  templateUrl: './charts-invest-gw-ds.component.html',
  styleUrls: ['./charts-invest-gw-ds.component.css']
})
export class ChartsInvestGwDsComponent implements OnInit {
  chartInstance;

  chartOption: EChartOption = {
    series: [{
      name: "Indicator",
      type: "gauge",
      min: 0,
      max: 100,
      data: [{
        value: 12.54,
      }], 
      detail: {fontSize: 20},
      axisLine: {lineStyle: {color: [[1, '#76B900']], width: 20}},
      axisLabel: {formatter: '{value}k'}
    }],

  };
  constructor() { }

  ngOnInit(): void {
  }


  aktualisiere_chart(invest: number) {
    let option = this.chartInstance.getOption()

    option.series = {
      data: [{
        value: invest/1000,
      }], 
    };
    this.chartInstance.setOption(option);
  }

  
  onChartInit(chart) {
    this.chartInstance = chart;
  }

}
