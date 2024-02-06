import { useDeviceDataControlsStore } from "@/state/device-data";

// eslint-disable-next-line prefer-const
export let selectedDarts: string[] = [];

export const seriesColors = [
  "#7cb5ec",
  "#434348",
  "#90ed7d",
  "#f7a35c",
  "#8085e9",
  "#f15c80",
  "#e4d354",
  "#2b908f",
  "#f45b5b",
  "#91e8e1",
];

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
      const myDart: HTMLElement | null = document.querySelector("." + dart);

      const dartIdx = +dart.split("-")?.[2];
      const dartSeriesIdx = +dart.split("-")?.[1];
      if (dartIdx >= xRange[0] && dartIdx <= xRange[1]) {
        const lft = u.valToPos(u.data[0][dartIdx], "x");
        const top = u.valToPos(u.data[dartSeriesIdx][dartIdx]!, "y");

        const offsetLeft = parseFloat(u.over.style.left);
        const offsetTop = parseFloat(u.over.style.top);

        if (!myDart) return;
        myDart.style.display = "block";
        myDart.style.left = offsetLeft + +lft + "px";
        myDart.style.top = offsetTop + +top + "px";
      } else {
        if (!myDart) return;
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

          // CONDITIONALS ====================================
          const dragNotUndefined = u.cursor.drag !== undefined;
          const isZoomSection = graphControlOption === "zoomSection";
          // =================================================

          if (dataIdx != c.idx) dataIdx = c.idx as number | null;

          if (isZoomSection && dragNotUndefined) u.cursor.drag!.x = true;
          if (!isZoomSection && dragNotUndefined) u.cursor.drag!.x = false;
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

export const customPlugin = () => {
  let dataIdx: null | number = null;
  let seriesIdx: null | number = null;

  function init(u: uPlot) {
    const over = u.over;

    over.addEventListener("click", () => {
      if (seriesIdx !== null && dataIdx !== null) {
        // console.log(dataIdx, seriesIdx);
      }
    });

    over.addEventListener("mousedown", (e) => {
      const graphControlOption =
        useDeviceDataControlsStore.getState().graphControl;

      if (graphControlOption !== "moveGraph") return;

      if (e.button == 0) {
        e.preventDefault();

        const left0 = e.clientX;

        const scXMin0 = u.scales.x.min!;
        const scXMax0 = u.scales.x.max!;

        const xUnitsPerPx = u.posToVal(1, "x") - u.posToVal(0, "x");

        // eslint-disable-next-line no-inner-declarations
        function onmove(e: MouseEvent) {
          e.preventDefault();
          const left1 = e.clientX;
          const dx = xUnitsPerPx * (left1 - left0);

          // TO PREVENT EXCEEDING RIGHT IF LAST POINT IS PRESENT
          const newMaxX = scXMax0 - dx;
          const outOfBoundsRight =
            newMaxX > Math.max(...u.data[0]) && Math.sign(dx) === -1;
          if (outOfBoundsRight) return;

          // TO PREVENT EXCEEDING LEFT IF FIRST POINT IS PRESENT
          const newMinX = scXMin0 - dx;
          const outOfBoundsLeft =
            Math.sign(dx) === 1 && newMinX < Math.min(...u.data[0]);
          if (outOfBoundsLeft) return;

          u.setScale("x", { min: scXMin0 - dx, max: scXMax0 - dx });
        }

        // eslint-disable-next-line no-inner-declarations
        function onup() {
          document.removeEventListener("mousemove", onmove);
          document.removeEventListener("mouseup", onup);
        }

        document.addEventListener("mousemove", onmove);
        document.addEventListener("mouseup", onup);
      }
    });
  }

  const redrawDarts = (u: uPlot) => {
    const xRange = u.series[0].idxs!;

    selectedDarts.forEach((dart: string) => {
      const myDart: HTMLElement | null = document.querySelector("." + dart);

      const dartIdx = +dart.split("-")?.[2];
      const dartSeriesIdx = +dart.split("-")?.[1];
      if (dartIdx >= xRange[0] && dartIdx <= xRange[1]) {
        const lft = u.valToPos(u.data[0][dartIdx], "x");
        const top = u.valToPos(u.data[dartSeriesIdx][dartIdx]!, "y");

        const offsetLeft = parseFloat(u.over.style.left);
        const offsetTop = parseFloat(u.over.style.top);

        if (!myDart) return;
        myDart.style.display = "block";

        myDart.style.left = offsetLeft + +lft + "px";
        myDart.style.top = offsetTop + +top + "px";
      } else {
        if (!myDart) return;
        myDart.style.display = "none";
      }
    });
  };

  const addDart = (u: uPlot, over: HTMLDivElement) => {
    const dart = document.createElement("div");
    // `darty-${seriesIdx}-${dataIdx}-${val}`;
    dart.className = `darty-${seriesIdx}-${dataIdx}`;

    if (selectedDarts.includes(dart.className) === true) return;

    selectedDarts.push(dart.className);

    dart.style.display = "block";
    dart.style.width = "10px";
    dart.style.height = "10px";
    dart.style.borderRadius = "50%";
    dart.style.outline = `3px solid ${seriesColors[seriesIdx! - 1]}`;
    dart.style.background = seriesColors[seriesIdx! - 1];
    dart.style.outlineOffset = `2px`;
    dart.style.position = "absolute";
    dart.style.transform = "translate(-50% , -50%)";

    dart.addEventListener("click", (e: MouseEvent) => {
      const { className } = e.target as HTMLElement;
      dart.remove();
      selectedDarts = selectedDarts.filter((i: string) => i !== className);
    });

    over.style.cursor = "pointer";

    const top = u.valToPos(u.data[seriesIdx!][dataIdx!]!, "y");
    const lft = u.valToPos(u.data[0][dataIdx!], "x");

    const offsetLeft = parseFloat(over.style.left);
    const offsetTop = parseFloat(over.style.top);

    dart.style.top = offsetTop + top + "px";
    dart.style.left = offsetLeft + lft + "px";

    u?.root?.querySelector(".u-wrap")?.appendChild(dart);
  };

  return {
    hooks: {
      init,
      ready: [
        (u: uPlot) => {
          const over = u.over;

          over.addEventListener("click", () => {
            if (dataIdx != null && seriesIdx != null) addDart(u, over);
          });
        },
      ],
      setCursor: [
        (u: uPlot) => {
          const c = u.cursor;
          if (dataIdx != c.idx) dataIdx = c.idx as number | null;
        },
      ],
      setSeries: [
        (u: uPlot, sidx: number | null) => {
          if (seriesIdx != sidx) seriesIdx = sidx;
        },
      ],
      setScale: [
        (u: uPlot, key: string) => {
          if (key == "x") redrawDarts(u);
        },
      ],
    },
  };
};
