import { useDeviceDataControlsStore } from "@/state/device-data";
import placement from "./placement.min.js";

// eslint-disable-next-line prefer-const
export let selectedDarts: string[] = [];
let lineCount = 0;
let horizontalLine;
let newHorizontalLine;
let verticalBlueLineInititalLeft = 0;
let horizontalLineInititalLeft = 0;
let horizontalLineInitialWidth = 0;
let lines = document.querySelectorAll(".draggable-line");
let blueVerticalLineCreated = false;
let previousLeftLineReading;

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

function updateHorizontalLine(
  customValueFlag = false,
  customValue = undefined,
  updateNewHorizontaLineFlag = false,
  NewHorizontalLineValue,
) {
  if (blueVerticalLineCreated && !customValueFlag) {
    if (newHorizontalLine) {
      const savedMargin = newHorizontalLine.style.marginLeft;
      newHorizontalLine.parentNode.removeChild(newHorizontalLine);
      const y1 = parseFloat(lines[0].style.left) || 0;
      const y2 = parseFloat(lines[1].style.left) || 0;
      const verticalBlueLine = document.getElementById("vertical-blue-line");

      const minY = Math.max(y1, y2);
      const maxY = Math.max(y1, y2);

      const xValue = getXValueForHorizontalLine(minY, maxY);

      newHorizontalLine = document.createElement("div");
      newHorizontalLine.id = "horizontal-blue-line";
      newHorizontalLine.classList.add("horizontal-line");
      newHorizontalLine.style.marginLeft = savedMargin;
      newHorizontalLine.style.top = "0";

      newHorizontalLine.style.backgroundColor = "red";
      newHorizontalLine.style.width =
        y1 - parseFloat(verticalBlueLine.style.left) + "px";
      newHorizontalLine.style.height = "20px"; // Adjust the height of the horizontal line
      newHorizontalLine.innerText = formatXAxisValue(xValue); // Content of the horizontal line
      document.getElementById("chart-container").appendChild(newHorizontalLine);
    } else {
      const y1 = parseFloat(lines[0].style.left) || 0;
      const y2 = parseFloat(lines[1].style.left) || 0;
      const verticalBlueLine = document.getElementById("vertical-blue-line");

      const minY = Math.max(y1, y2);
      const maxY = Math.max(y1, y2);

      const xValue = getXValueForHorizontalLine(minY, maxY);

      newHorizontalLine = document.createElement("div");
      newHorizontalLine.id = "horizontal-blue-line";
      newHorizontalLine.classList.add("horizontal-line");
      newHorizontalLine.style.marginLeft = minY + "px";
      newHorizontalLine.style.top = "0";
      newHorizontalLine.style.backgroundColor = "red";
      newHorizontalLine.style.width = y2 - minY + "px"; // Adjust if needed
      newHorizontalLine.style.height = "20px"; // Adjust the height of the horizontal line
      newHorizontalLine.innerText = formatXAxisValue(xValue); // Content of the horizontal line
      document.getElementById("chart-container").appendChild(newHorizontalLine);
    }

    return;
  } else if (updateNewHorizontaLineFlag) {
    if (newHorizontalLine) {
      const savedMargin = newHorizontalLine.style.marginLeft;
      newHorizontalLine.parentNode.removeChild(newHorizontalLine);
      const y1 = parseFloat(lines[0].style.left) || 0;
      const y2 = parseFloat(lines[1].style.left) || 0;
      const verticalBlueLine = document.getElementById("vertical-blue-line");

      const minY = Math.max(y1, y2);
      const maxY = Math.max(y1, y2);

      const xValue = getXValueForHorizontalLine(minY, maxY);

      newHorizontalLine = document.createElement("div");
      newHorizontalLine.classList.add("horizontal-line");

      newHorizontalLine.style.marginLeft =
        parseFloat(NewHorizontalLineValue) + "px";
      newHorizontalLine.style.top = "0";

      newHorizontalLine.style.backgroundColor = "red";
      newHorizontalLine.style.width =
        y1 - parseFloat(verticalBlueLine.style.left) + "px";
      newHorizontalLine.style.height = "20px"; // Adjust the height of the horizontal line
      newHorizontalLine.innerText = formatXAxisValue(xValue); // Content of the horizontal line
      document.getElementById("chart-container").appendChild(newHorizontalLine);
    }
  }

  if (horizontalLine) {
    horizontalLine.parentNode.removeChild(horizontalLine);
  }

  if (lines.length === 2) {
    const y1 = parseFloat(lines[0].style.left) || 0;
    const y2 = parseFloat(lines[1].style.left) || 0;

    const minY = Math.min(y1, y2);
    const maxY = Math.max(y1, y2);

    const xValue = getXValueForHorizontalLine(minY, maxY);

    horizontalLine = document.createElement("div");
    horizontalLine.classList.add("horizontal-line");

    if (customValueFlag && customValue !== undefined) {
      horizontalLine.style.left = customValue + "px";

      horizontalLine.style.width =
        parseFloat(document.getElementById("vertical-blue-line").style.left) -
        parseFloat(lines[1].style.left) +
        "px";
    } else {
      horizontalLine.style.left = minY + "px";
      horizontalLine.style.width = maxY - minY + "px";
    }
    horizontalLineInititalLeft = minY + "px";
    horizontalLine.style.top = "0";
    // Adjust if needed
    horizontalLineInitialWidth = maxY - minY + "px";
    horizontalLine.style.height = "20px"; // Adjust the height of the horizontal line
    horizontalLine.innerText = formatXAxisValue(xValue); // Content of the horizontal line
    document.getElementById("chart-container").appendChild(horizontalLine);
  }
}

function createVerticalLine(x, over) {
  const div = document.createElement("div");
  div.classList.add("draggable-line");
  div.style.position = "absolute";
  div.style.left = x + "px";
  div.style.top = "0";
  div.style.width = "5px";
  div.style.height = "100%";
  div.style.background = "red";
  div.style.zIndex = "100";
  document.getElementById("chart-container").appendChild(div);

  const handle = document.createElement("div");
  handle.classList.add("handle");
  div.appendChild(handle);

  lines = document.querySelectorAll(".draggable-line");

  let isDragging = false;
  let startX = 0;
  let lineLeft = 0;
  let lineIndex = 0;

  div.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    lineLeft = parseFloat(div.style.left.replace("px", "")) || 0;
    lineIndex = Array.from(div.parentNode.children).indexOf(div);
    div.classList.add("active");
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      if (lineIndex === 5) {
        if (e.clientX - startX < 0) {
          const verticalBlueLine =
            document.getElementById("vertical-blue-line");
          if (verticalBlueLine) {
            div.style.left = e.clientX + "px";

            const updatedLeftMarginVerticalLine =
              parseFloat(verticalBlueLineInititalLeft) -
              Math.abs(parseFloat(startX) - parseFloat(e.clientX));

            verticalBlueLine.style.left = updatedLeftMarginVerticalLine + "px";

            const updatedLeftMarginHorizontalLine =
              parseFloat(horizontalLineInititalLeft) -
              Math.abs(parseFloat(startX) - parseFloat(e.clientX));
            updateHorizontalLine(
              true,
              parseFloat(e.clientX),
              true,
              updatedLeftMarginVerticalLine,
            );
          }
        }
        // restricting the left line dragging
        return;
      }

      const rect = over.getBoundingClientRect();
      const diffX = e.clientX - startX;
      let newX = lineLeft + diffX;

      // Limit the movement of the line within the graph area
      newX = Math.min(Math.max(newX, 0), rect.width);

      if (
        parseFloat(lines[0].style.left) <=
        parseFloat(document.getElementById("vertical-blue-line")?.style?.left)
      ) {
        let elementToRemove = document.getElementById("vertical-blue-line");
        if (elementToRemove) {
          // Remove the element by accessing its parent node and using removeChild
          let parentElement = elementToRemove.parentNode;
          if (parentElement) {
            parentElement.removeChild(elementToRemove);
            blueVerticalLineCreated = false;
          } else {
            console.error("Parent node of the element does not exist.");
          }
        }
        console.log("Anaa", lines[0].style.left);
        console.log(
          "Anaa",
          parseFloat(
            document.getElementById("vertical-blue-line")?.style?.left,
          ),
        );
        newX = 500;
      } else if (
        lineIndex === 5 &&
        lines[1].style.left >= lines[0].style.left
      ) {
        console.log("First");
        // Limit the movement of the left line to the right of the right line
        newX = Math.min(newX, parseFloat(lines[1].style.left) || rect.width);
      } else if (
        lineIndex === 4 &&
        lines[0].style.left <= lines[1].style.left
      ) {
        console.log(
          "Second, newX, parseFloat(lines[0].style.left)",
          newX,
          parseFloat(lines[0].style.left),
        );
        // Limit the movement of the right line to the left of the left line
        newX = newX;
      } else if (lineIndex === 4) {
        console.log("Third");
        if (!blueVerticalLineCreated) {
          console.log("Third internal");
          newX = Math.max(newX, parseFloat(lines[0].style.left) || 0);
          createBlueVerticalLine(newX - 1);
          blueVerticalLineCreated = true;
        }
      }
      console.log("setting value: ", newX);
      newX = newX > 500 ? newX : 500;
      div.style.left = newX + "px";
      updateHorizontalLine();
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    div.classList.remove("active");
    verticalBlueLineInititalLeft =
      document.getElementById("vertical-blue-line")?.style?.left;
    console.log("user stopped dragging");
  });

  lineCount++;
}

function createDefaultLines(u, over) {
  // Create default vertical lines at random positions
  const rect = u.over.getBoundingClientRect();
  const randomX1 = 20 * 5;
  const randomX2 = 30 * 3;

  createVerticalLine(randomX1, over);
  createVerticalLine(randomX2, over);
}

export const tooltipPlugin = () => {
  let over, bound, bLeft, bTop;

  function syncBounds() {
    let bbox = over.getBoundingClientRect();
    bLeft = bbox.left;
    bTop = bbox.top;
  }

  const overlay = document.createElement("div");
  overlay.id = "overlay";
  overlay.style.display = "none";
  overlay.style.position = "absolute";
  document.body.appendChild(overlay);

  return {
    hooks: {
      init: (u) => {
        over = u.over;
        bound = over;
        overlay.style.display = "block"; // Show overlay by default
        // Create default vertical lines
        createDefaultLines(u, over);
        // Add click event listener
        over.onclick = (e) => {};
      },
      setSize: (u) => {
        syncBounds();
        updateHorizontalLine();
      },
      setCursor: (u) => {
        const { left, top, idx } = u.cursor;

        console.log("left, top, idx", left, top, idx);
        const x = u.data[0][idx];
        const y = u.data[1][idx];
        const anchor = {
          left: left + bLeft,
          top: top + bTop,
        };
        overlay.textContent = `${x},${y} at ${Math.round(left)},${Math.round(
          top,
        )}`;
        placement(overlay, anchor, "right", "start", {
          bound,
        });
      },
    },
  };
};
