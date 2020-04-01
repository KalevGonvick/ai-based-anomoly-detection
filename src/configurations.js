const ANIMATIONINTERVAL = 1250;
const XAXISRANGE = 270000;
export const seed = 56;
//export const tick_interval = 86400000;
export const x_axis_range = XAXISRANGE;
export const animation_interval = ANIMATIONINTERVAL;
export const r_chart_options =
  {
  chart: {
    id: "r_predict_realtime_data_display",
    height: 350,
    group: 'anomaly',
    type: 'line',
    animations: {
      enabled: true,
      easing: 'linear',
      dynamicAnimation: {
        speed: ANIMATIONINTERVAL
      }
    },
    colors: ['#545454'],
    dropShadow: {
      enabled: true,
      opacity: 0.3,
      blur: 5,
      left: -7,
      top: 22
    },
    toolbar: {
      show: false,
      shared: false,
      intersect: true
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
  yaxis: {
    labels: {
      show: true,
      align: 'right',
      minWidth: 100,
      maxWidth: 100
  },
},
  title: {
    text: 'r_predict',
    align: 'left',
    style: {
      fontSize: '12px'
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

export const d_chart_options =
  {
  chart: {
    id: "d_predict_realtime_data_display",
    height: 350,
    group: 'anomaly',
    type: 'line',
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
      show: false,
      shared: false,
      intersect: true
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
  yaxis: {
    labels: {
      show: true,
      align: 'right',
      minWidth: 100,
      maxWidth: 100
  },
},
  title: {
    text: 'd_predictions',
    align: 'left',
    style: {
      fontSize: '12px'
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

export const n_chart_options =
  {
  chart: {
    id: "n_predict_realtime_data_display",
    height: 350,
    group: 'anomaly',
    type: 'line',
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
      show: false,
      shared: false,
      intersect: true
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
  yaxis: {
    labels: {
      show: true,
      align: 'right',
      minWidth: 100,
      maxWidth: 100
  },
},
  title: {
    text: 'n_predictions',
    align: 'left',
    style: {
      fontSize: '12px'
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

export const re_chart_options =
  {
  chart: {
    id: "re_realtime_data_display",
    height: 350,
    group: 'anomaly',
    type: 'line',
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
      show: false,
      shared: false,
      intersect: true
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
  yaxis: {
    labels: {
      show: true,
      align: 'right',
      minWidth: 100,
      maxWidth: 100
  },
},
  title: {
    text: 'r_predict_errors',
    align: 'left',
    style: {
      fontSize: '12px'
    }
  },
  legend: {
    show: false,
  },
}

export const de_chart_options =
  {
  chart: {
    id: "de_realtime_data_display",
    height: 350,
    group: 'anomaly',
    type: 'line',
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
      show: false,
      shared: false,
      intersect: true
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
  yaxis: {
    labels: {
      show: true,
      align: 'right',
      minWidth: 100,
      maxWidth: 100
  },
},
  title: {
    text: 'd_predict_errors',
    align: 'left',
    style: {
      fontSize: '12px'
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
