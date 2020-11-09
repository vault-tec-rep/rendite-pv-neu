import { Component, OnInit } from '@angular/core';
import { EChartOption } from 'echarts';

@Component({
  selector: 'app-chart-invest-funktion',
  templateUrl: './chart-invest-funktion.component.html',
  styleUrls: ['./chart-invest-funktion.component.css']
})
export class ChartInvestFunktionComponent implements OnInit {
  chartInstance;
  chartOption: EChartOption = {
    xAxis: {
      type: 'value',
      name: 'kW',
      min: 0,
      max: 100,
    },
    yAxis: {
      type: 'value',
      name: 'Euro'
    },
    legend: {
      data: ['Spezifische Investitionskosten in Euro'],
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
  };

  constructor() { }

  ngOnInit(): void {
  }


  aktualisiere_chart(daten) {
    let option = this.chartInstance.getOption();
    option.series = {
      name: 'Spezifische Investitionskosten in Euro',
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
