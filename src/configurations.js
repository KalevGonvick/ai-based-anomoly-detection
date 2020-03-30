const ANIMATIONINTERVAL = 750;
const XAXISRANGE = 100;
export const seed = 56;
//export const tick_interval = 86400000;
export const x_axis_range = XAXISRANGE;
export const animation_interval = ANIMATIONINTERVAL;
export const chart_options = {
  chart: {
    height: 350,
    type: 'line',
    stacked: true,
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: 1000
      }
    },
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    colors: '#2ecc71'
  },
  title: { text: 'Anomaly Results', align: 'left' },
  markers: {
    size: 0,
    hover: {
      size: 0
    }
  },

  xaxis: {
    type: 'datetime',
    range: 2700000
  },
  subtitle: {
    text: '20',
    floating: true,
    align: 'right',
    offsetY: 0,
    style: {
      fontSize: '22px'
    }
  },
  yaxis: {
   decimalsInFloat: 2,
   opposite: true,
   labels: {
     offsetX: -10
   }
 },
 subtitle: {
    text: '20',
    floating: true,
    align: 'right',
    offsetY: 0,
    style: {
      fontSize: '22px'
    }
  },
 legend: {
   show: true,
   floating: true,
   horizontalAlign: 'left',
   onItemClick: {
     toggleDataSeries: false
   },
   position: 'top',
   offsetY: -33,
   offsetX: 60
 }
};

export const second_op =
  {
  chart: {
    id: "realtime_data_display",
    height: 350,
    type: 'line',
    stacked: true,
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: ANIMATIONINTERVAL
      }
    },
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22
    },
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    curve: 'straight',
    width: 5,
  },
  grid: {
    padding: {
      left: 0,
      right: 0
    }
  },
  markers: {
    size: 0,
    hover: {
      size: 0
    }
  },
  xaxis: {
    type: 'datetime',
    range: XAXISRANGE,
  },
  title: {
    text: 'Processes',
    align: 'left',
    style: {
      fontSize: '12px'
    }
  },
  subtitle: {
    text: '20',
    floating: true,
    align: 'right',
    offsetY: 0,
    style: {
      fontSize: '22px'
    }
  },
  legend: {
    show: true,
    floating: true,
    horizontalAlign: 'left',
    onItemClick: {
      toggleDataSeries: false
    },
    position: 'top',
    offsetY: -33,
    offsetX: 60
  },
}
