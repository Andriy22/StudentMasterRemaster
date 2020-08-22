import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
} from '@angular/core';
import { MarksService } from '@shared/services/marks.service';
import { marksForChartResult } from '@shared/models/markForChart';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexTheme,
  ApexLegend,
  ApexDataLabels,
  ApexStroke,
  ApexGrid,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  theme: ApexTheme;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  grid: ApexGrid;
};

@Component({
  selector: 'app-marks-chart',
  templateUrl: './marks-chart.component.html',
  styleUrls: ['./marks-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarksChartComponent implements OnInit, OnDestroy {
  chart1: ChartOptions = null;
  data: any = null;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private marksService: MarksService
  ) {}

  ngOnInit() {
    this.marksService.getMyMarkForChart().subscribe((data: marksForChartResult) => {
      this.initChart(data.marks, data.dates);
    });
  }

  generateChart(series: any[], dates: any[]) {
    const chart: ChartOptions = {
      legend: {
        show: true,
        position: 'top',
        onItemClick: {
          toggleDataSeries: true,
        },
      },
      theme: {
        mode: 'dark',
      },
      chart: {
        height: 350,
        type: 'scatter',
        animations: {
          enabled: true,
        },
        zoom: {
          enabled: true,
          type: 'xy',
        },
        toolbar: {
          show: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      stroke: {
        width: 10,
      },
      series,
      xaxis: {
        type: 'datetime',
        categories: dates,
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
    };

    return chart;
  }

  initChart(siries: any, dates: any): any {
    this.chart1 = this.generateChart([...siries], [...dates]);
  }

  ngOnDestroy() {}
}
