import { useDeviceDataControlsStore } from "@/state/device-data";

// eslint-disable-next-line prefer-const
export let selectedDarts: string[] = [];

export const resizePlugin = (ParentDivRef: React.RefObject<HTMLDivElement>) => {
  return {
    hooks: {
      ready: (u: uPlot) => {
        const { clientWidth, clientHeight } = ParentDivRef.current!;
        window.addEventListener("resize", () => {
          u.setSize({ width: clientWidth, height: clientHeight });
        });
      },
    },
  };
};

export const clickZoomPlugin = () => {
  let dataIdx: null | number = null;
  let seriesIdx: null | number = null;

  const factor = 0.75;

  let xMin: number, xMax: number, xRange: number;

  function redrawDarts(u: uPlot) {
    const xRange = u.series[0].idxs!;

    selectedDarts.forEach((dart: string) => {
      const myDart = document.querySelector("." + dart)!;

      const dartIdx = +dart.split("-")?.[2];
      const dartSeriesIdx = +dart.split("-")?.[1];
      if (dartIdx >= xRange[0] && dartIdx <= xRange[1]) {
        const lft = u.valToPos(u.data[0][dartIdx], "x");
        const top = u.valToPos(u.data[dartSeriesIdx][dartIdx]!, "y");

        const offsetLeft = parseFloat(u.over.style.left);
        const offsetTop = parseFloat(u.over.style.top);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        myDart.style.display = "block";

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        myDart.style.left = offsetLeft + +lft + "px";
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        myDart.style.top = offsetTop + +top + "px";
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        myDart.style.display = "none";
      }
    });
  }

  function clamp(
    nRange: number,
    nMin: number,
    nMax: number,
    fRange: number,
    fMin: number,
    fMax: number,
  ) {
    if (nRange > fRange) {
      nMin = fMin;
      nMax = fMax;
    } else if (nMin < fMin) {
      nMin = fMin;
      nMax = fMin + nRange;
    } else if (nMax > fMax) {
      nMax = fMax;
      nMin = fMax - nRange;
    }

    return [nMin, nMax];
  }

  return {
    hooks: {
      ready: (u: uPlot) => {
        xMin = u.scales.x.min!;
        xMax = u.scales.x.max!;

        xRange = xMax - xMin;

        const over = u.over;
        const rect = over.getBoundingClientRect();

        // wheel scroll zoom
        over.addEventListener("click", (e: MouseEvent) => {
          if (seriesIdx && dataIdx) return;
          e.preventDefault();

          const { left } = u.cursor as { left: number };

          const leftPct = left / rect.width;
          const xVal = u.posToVal(left, "x");
          const oxRange = u.scales.x.max! - u.scales.x.min!;

          /* zoomIn zoomOut moveGraph zoomSection */
          const graphControlOption =
            useDeviceDataControlsStore.getState().graphControl;

          if (
            graphControlOption !== "zoomIn" &&
            graphControlOption !== "zoomOut"
          )
            return;

          // No need to assign to zero though
          let nxRange: number;

          if (graphControlOption === "zoomIn") nxRange = oxRange * factor;
          if (graphControlOption === "zoomOut") nxRange = oxRange / factor;

          let nxMin = xVal - leftPct * nxRange!;
          let nxMax = nxMin + nxRange!;
          [nxMin, nxMax] = clamp(nxRange!, nxMin, nxMax, xRange, xMin, xMax);

          u.batch(() => u.setScale("x", { min: nxMin, max: nxMax }));
          redrawDarts(u);
        });
      },
      setCursor: [
        (u: uPlot) => {
          const c = u.cursor;
          const graphControlOption =
            useDeviceDataControlsStore.getState().graphControl;

          if (dataIdx != c.idx) dataIdx = c.idx as number | null;
          if (
            graphControlOption === "zoomSection" &&
            u.cursor.drag !== undefined
          )
            u.cursor.drag.x = true;

          if (
            graphControlOption !== "zoomSection" &&
            u.cursor.drag !== undefined
          ) {
            u.cursor.drag.x = false;
          }
        },
      ],
      setSeries: [
        (u: uPlot, sidx: number | null) => {
          if (seriesIdx != sidx) seriesIdx = sidx;
        },
      ],
    },
  };
};
