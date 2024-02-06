import React, { useRef, useState } from "react";
import uPlot from "uplot";
import UplotReact from "uplot-react";
import "uplot/dist/uPlot.min.css";
import { clickZoomPlugin, resizePlugin } from "./plotPlugins";

const data: uPlot.AlignedData = [
  [1546300800, 1546387200, 1556387300, 1566397400, 1576387500], // x-values (timestamps)
  [35, 71, 100, 0, 115], // y-values (series 1)
  [90, 15, 100, 115, 120], // y-values (series 2)
];

const MetricDataPlot: React.FC = () => {
  const parentDivRef = useRef<HTMLDivElement>(null);
  const [options] = useState<uPlot.Options>({
    width: 493,
    height: 300,
    series: [
      {},
      { label: "1", width: 3, stroke: "#7cb5ec" },
      { label: "2", width: 3, stroke: "#434348" },
    ],
    legend: { show: false },
    focus: { alpha: 0.3 },
    scales: { y: { auto: false, range: [0, 150] } },
    cursor: {
      drag: { x: false, y: false },
      focus: { prox: 5 },
      bind: { dblclick: () => null },
    },
    plugins: [resizePlugin(parentDivRef), clickZoomPlugin()],
    axes: [{}],
  });

  return (
    <div className="max-h-[320px] w-full" ref={parentDivRef}>
      <UplotReact options={options} data={data} />
    </div>
  );
};

export default MetricDataPlot;

/* <img
        className="max-h-[320px] w-full bg-cover"
        src="/images/mock-metric-data-img.png"
        alt=""
      /> */
