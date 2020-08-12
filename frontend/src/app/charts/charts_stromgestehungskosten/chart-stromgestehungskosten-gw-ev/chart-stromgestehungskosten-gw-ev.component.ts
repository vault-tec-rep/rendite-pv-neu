import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-chart-stromgestehungskosten-gw-ev',
  templateUrl: './chart-stromgestehungskosten-gw-ev.component.html',
  styleUrls: ['./chart-stromgestehungskosten-gw-ev.component.css']
})
export class ChartStromgestehungskostenGwEvComponent implements OnInit {
  chartInstance;

  chartOption: EChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {           
          type: 'shadow'        
      }
  },
    legend: {
      data: ['Stromgestehungskosten'],
      show: true, 
      align: 'auto', 
    },
    xAxis: [
      {
        type: 'category',
        data: ['Stromgestehungskosten']
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0, 
        max: 40,
      }
    ],
    series: [
      {
        name: 'Direktversorgung',
        type: 'bar',
        data: [20],
        itemStyle: {color: '#f3e03b'}
      },
    ],
    
  };


  constructor() { }

  ngOnInit(): void {
  }

  aktualisiere_chart(stromgestehungskosten: number) {

    let option = this.chartInstance.getOption()

    option.series = [
    {
      data: [stromgestehungskosten],
    }];
    this.chartInstance.setOption(option);
  }


  onChartInit(chart) {
    this.chartInstance = chart;
  }

}
