export type Interval = {
  min: number;
  max: number;
  color: string;
};

// colors order matters here
export const generateIntervals = ({
  minValue,
  maxValue,
  intervalsCount,
  colors,
}: {
  minValue: number;
  maxValue: number;
  intervalsCount: number;
  colors: string[];
}): Interval[] | null => {
  // Check if provided values are valid
  if (
    minValue >= maxValue ||
    intervalsCount <= 0 ||
    colors.length !== intervalsCount
  ) {
    return null;
  }

  const intervalSize = (maxValue - minValue) / intervalsCount;
  const intervals: Interval[] = [];

  let currentMin = minValue;
  for (let i = 0; i < intervalsCount; i++) {
    const currentMax = currentMin + intervalSize;
    // first color goes to first interval and so on
    const color = colors[i];
    intervals.push({ min: currentMin, max: currentMax, color });
    currentMin = currentMax;
  }

  // Adjust the last interval's max to be the original maxValue
  intervals[intervalsCount - 1].max = maxValue;

  return intervals;
};

export const generateLabels = ({
  minValue,
  maxValue,
}: {
  minValue?: number;
  maxValue?: number;
}): string[] => {
  const min = minValue ?? 0;
  const max = maxValue ?? 0;
  const mean = max / 2;
  return [min.toFixed(0), mean.toFixed(0), max.toFixed(0)];
};

export const getIntervalForValue = (value: number, intervals: Interval[]) => {
  for (let i = 0; i < intervals.length; i++) {
    if (value >= intervals[i].min && value < intervals[i].max) {
      return intervals[i]; // Returning the interval number (1-indexed)
    }
  }
  return null; // Return -1 if value doesn't belong to any interval
};
