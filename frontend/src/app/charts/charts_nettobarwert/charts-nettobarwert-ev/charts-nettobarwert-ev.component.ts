import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-chart-nettobarwert-ev',
  templateUrl: './charts-nettobarwert-ev.component.html',
  styleUrls: ['./charts-nettobarwert-ev.component.css']
})
export class ChartsNettobarwertEvComponent implements OnInit {
  chartInstance;

  chartOption: EChartOption = {
    series: [{
      name: "Indicator",
      type: "gauge",
      min: -30,
      max: 30,
      detail: {fontSize: 20},
      data: [{
        value: 0,
      }], 
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
