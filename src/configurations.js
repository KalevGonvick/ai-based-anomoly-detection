const ANIMATIONINTERVAL = 750;
const XAXISRANGE = 100;
export const seed = 56;
export const tick_interval = 86400000;
export const x_axis_range = XAXISRANGE;
export const animation_interval = ANIMATIONINTERVAL;
export const chart_options = {
  chart: {
    id: 'realtime_data_display',
    height: 350,
    type: 'line',
    background: '#ffffff',
    animations: {
      enabled: true,
      easing: 'eastout',
      dynamicAnimation: { speed: ANIMATIONINTERVAL	}},
    toolbar: { show: false },
    zoom: {	enabled: false }
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'straight',
    colors: '#2ecc71'
  },
  title: { text: 'Test Dynamic Chart', align: 'left' },
  markers: { size: 0 },
  xaxis: {
    type: 'datetime',
    range: XAXISRANGE,
    title: {
      text:'X-Axis',
      offsetX: 0,
      offsetY: 5,
      style: {
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          cssClass: 'apexcharts-xaxis-title',
      },
    }
  },
  yaxis: {
    max: 100,
    title: {
      text: 'Y-Axis',
      rotate: 90,
      offsetX: 0,
      offsetY: 0,
      style: {
          fontSize: '12px',
          fontFamily: 'Helvetica, Arial, sans-serif',
          cssClass: 'apexcharts-yaxis-title',
      },
    }
   },
  legend: {	show: false },
  theme: {
    pallete: 'pallete4'
  }
};
