import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy,
  NgZone,
  ChangeDetectorRef,
  ViewChild,
} from '@angular/core';
import { MarksService } from '@shared/services/marks.service';
import { marksForChartResult, MarksForChart } from '@shared/models/markForChart';
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
  ChartComponent,
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
  @ViewChild('chartObj') chart: ChartComponent;
  public ChartOptions: ChartOptions;

  data: any = null;
  isLoaded = false;

  constructor(
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private marksService: MarksService
  ) {
    this.ChartOptions = {
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
      series: [
        {
          name: 'Init',
          data: [12],
        },
      ],
      xaxis: {
        type: 'datetime',
        categories: ['08.22.2020'],
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
  }

  ngOnInit() {
    this.marksService.getMyMarkForChart().subscribe((data: marksForChartResult) => {
      this.updateSeries(data.marks, data.dates);
    });
  }

  public updateSeries(series: MarksForChart[], dates: string[]) {
    this.ChartOptions.series = series;
    this.ChartOptions.xaxis.categories = dates;
    this.chart.updateOptions(this.ChartOptions);
  }
  ngOnDestroy() {}
}
