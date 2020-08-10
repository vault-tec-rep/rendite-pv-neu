import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-chart-autarkie-eigenverbrauch-gw-ev',
  templateUrl: './chart-autarkie-eigenverbrauch-gw-ev.component.html',
  styleUrls: ['./chart-autarkie-eigenverbrauch-gw-ev.component.css']
})
export class ChartAutarkieEigenverbrauchGwEvComponent implements OnInit {
  chartInstance;

  chartOption: EChartOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {           
          type: 'shadow'        
      }
  },
    legend: {
      data: ['Direktversorgung', 'Netz-einspeisung/-bezug'],
      show: true, 
      align: 'auto', 
    },
    xAxis: [
      {
        type: 'category',
        data: ['PV-Erzeugung', 'Lastdeckung']
      }
    ],
    yAxis: [
      {
        type: 'value',
        min: 0, 
        max: 100,
      }
    ],
    series: [
      {
        name: 'Direktversorgung',
        type: 'bar',
        stack: 'Stack_1',
        data: [60, 40],
        itemStyle: {color: '#f3e03b'}
      },
      {
        name: 'Netz-einspeisung/-bezug',
        type: 'bar',
        stack: 'Stack_1',
        data: [40, 60],
        itemStyle: {color: '#C8C8C8'}
      },
    ],
    
  };
  wert1: number;
  wert2: number;

  constructor() { }

  ngOnInit(): void {
  }


  aktualisiere_chart(autarkiegrad: number, eigenverbrauchsanteil: number) {
    this.wert1 = 100 - autarkiegrad;
    this.wert2 = 100 - eigenverbrauchsanteil;
    let option = this.chartInstance.getOption()

    option.series = [
    {
      data: [autarkiegrad, eigenverbrauchsanteil],
    },
    {
      data: [this.wert1, this.wert2],
    }];
    
    this.chartInstance.setOption(option);
  }


  onChartInit(chart) {
    this.chartInstance = chart;
  }
}
