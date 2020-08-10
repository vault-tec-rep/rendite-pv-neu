import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-chart-nettobarwert-gw-ve',
  templateUrl: './charts-nettobarwert-gw-ve.component.html',
  styleUrls: ['./charts-nettobarwert-gw-ve.component.css']
})
export class ChartsNettobarwertGwVeComponent implements OnInit {
  chartInstance;

  chartOption: EChartOption = {
    series: [{
      name: "Indicator",
      type: "gauge",
      min: -30,
      max: 30,
      data: [{
        value: 0,
      }], 
      detail: {fontSize: 20},
      axisLine: {lineStyle: {color: [[1, '#76B900']], width: 20}},
      axisLabel: {formatter: '{value}k'}
    }],

  };
  constructor() { }

  ngOnInit(): void {
  }


  aktualisiere_chart(nettobarwert: number) {
    let option = this.chartInstance.getOption()

    option.series = {
      data: [{
        value: nettobarwert/1000,
      }], 
    };
    this.chartInstance.setOption(option);
  }

  
  onChartInit(chart) {
    this.chartInstance = chart;
  }

}
