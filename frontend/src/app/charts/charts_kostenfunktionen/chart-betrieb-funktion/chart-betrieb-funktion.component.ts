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
      max: 100,
      name: 'kW',
    },
    yAxis: {
      type: 'value',
      name: 'Euro'
    },
    legend: {
      data: ['Jährliche Betriebskosten in Euro'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
    },
  };

  constructor() { }

  ngOnInit(): void {
  }


  aktualisiere_chart(daten) {
    let option = this.chartInstance.getOption();

    option.series = {
      name: 'Jährliche Betriebskosten in Euro',
      data: daten,
      type: 'line',
      lineStyle: { color: 'rgb(118, 185, 0)' },
      itemStyle: {
        color: 'rgb(118, 185, 0)',
      }
    };

    this.chartInstance.setOption(option);
  }

  onChartInit(chart) {
    this.chartInstance = chart;
  }

}
