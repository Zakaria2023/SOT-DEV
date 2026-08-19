/**
 * A statistic mid-count, rendered the way its final value will be.
 *
 * `decimals` is taken from the target rather than from the value in flight, so
 * 99.9 counts through 41.3 and 82.7 instead of flickering between integers and
 * one-place decimals on its way up. Grouping matters for the same reason: 1400
 * has to pass through "1,218" rather than "1218", or the number changes width
 * and shape at the moment it lands.
 */
export const formatCount = (value: number, decimals: number): string =>
  value.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

/** How many decimal places a target number is written with. */
export const decimalPlaces = (value: number): number => {
  const [, fraction] = value.toString().split(".");

  return fraction ? fraction.length : 0;
};
