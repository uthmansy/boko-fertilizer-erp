import { Canvg } from "canvg";
import moment from "moment";

export const getRandomBackgroundColor = () => {
  // Generate a random hex color
  const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);

  // Convert hex to RGB
  const hexToRgb = (hex: string) =>
    hex.replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (_, r, g, b) => "#" + r + r + g + g + b + b
    );

  const rgb = hexToRgb(randomColor);

  // Check if rgb is null or undefined
  if (!rgb) {
    // Handle the case where rgb conversion fails
    return "#FFFFFF"; // Fallback to white background color
  }

  // Extract RGB components
  const match = /(\w{2})(\w{2})(\w{2})/.exec(rgb);
  if (!match) {
    // Handle the case where rgb format is unexpected
    return "#FFFFFF"; // Fallback to white background color
  }

  const [, r, g, b] = match;

  // Calculate luminance
  const luminance =
    0.299 * parseInt(r, 16) + 0.587 * parseInt(g, 16) + 0.114 * parseInt(b, 16);

  // Check if luminance is dark or light
  return luminance > 186 ? randomColor : "#FFFFFF";
};

export const formatNumber = (num: number): string => {
  // Convert the number to a string
  let numStr: string = num.toString();

  // Split the number into integer and decimal parts
  const parts: string[] = numStr.split(".");

  // Add commas to the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // If there's a decimal part, round it to 2 decimal places
  if (parts[1]) {
    parts[1] = parseFloat("0." + parts[1])
      .toFixed(2)
      .split(".")[1];
  } else {
    // If there's no decimal part, add .00
    parts.push("00");
  }

  // Join the integer and decimal parts back together
  numStr = parts.join(".");

  return numStr;
};

export const bagsToTons = (bags: number): number => {
  // Convert bags to kilograms
  const kilograms = bags * 50;

  // Convert kilograms to metric tons (1 metric ton = 1000 kilograms)
  const metricTons = kilograms / 1000;

  return metricTons;
};

export const formatDateString = (inputDate: string): string | undefined => {
  // Regular expression to match the format "YYYY-MM-DD"
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateFormatRegex.test(inputDate)) {
    // If the input date format is incorrect, return undefined
    return undefined;
  }

  const date = new Date(inputDate);
  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "long" });
  const year = date.getFullYear();

  // Function to add ordinal suffix to the day
  function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const ordinalSuffix = getOrdinalSuffix(day);

  return `${day}${ordinalSuffix} ${month}, ${year}`;
};

export const getDayFromDate = (dateString: string): string | undefined => {
  // Regular expression to match the format "YYYY-MM-DD"
  const dateFormatRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateFormatRegex.test(dateString)) {
    // If the input date format is incorrect, return undefined
    return undefined;
  }

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date(dateString);
  const dayIndex = date.getDay();

  return daysOfWeek[dayIndex];
};

// Function to get month name from a number (1-based index)
export const getMonthName = (monthNumber: number): string => {
  // Create a moment object for the given month and year (e.g., 2024)
  // Month numbers are 1-based, so we need to adjust for zero-based indexing in Moment.js
  return moment()
    .month(monthNumber - 1)
    .format("MMMM");
};

export const svgToDataUri = async (svgString: string) => {
  try {
    const canvas: HTMLCanvasElement = document.createElement("canvas");
    const context = canvas.getContext("2d");
    if (context) {
      const v = Canvg.fromString(context, svgString.trim());
      await v.render();
      const dataUri = canvas.toDataURL("image/png");
      return dataUri;
    }
  } catch (error) {
    console.error("Error occured:", error);
    return "";
  }
};

export const flattenObject = (
  obj: Record<string, any>,
  parentKey = ""
): Record<string, any> => {
  return Object.entries(obj).reduce(
    (acc: Record<string, any>, [key, value]) => {
      const newKey = parentKey ? `${parentKey}_${key}` : key;

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(acc, flattenObject(value, newKey));
      } else {
        acc[newKey] = value;
      }

      return acc;
    },
    {}
  );
};

export const getDateRange = (
  month: number | null,
  year: number | null
): { start: string; end: string } | null => {
  // Resolve year: if year is null or 0, use the current UTC year.
  const resolvedYear =
    year === null || year === 0 ? new Date().getUTCFullYear() : year;

  // Helper to format dates as 'yyyy-mm-dd' using UTC
  const format = (date: Date): string =>
    [
      date.getUTCFullYear(),
      String(date.getUTCMonth() + 1).padStart(2, "0"),
      String(date.getUTCDate()).padStart(2, "0"),
    ].join("-");

  // If month is null or 0, return the full-year range
  if (month === null || month === 0) {
    const startDate = new Date(Date.UTC(resolvedYear, 0, 1)); // January 1
    const endDate = new Date(Date.UTC(resolvedYear, 11, 31)); // December 31
    return {
      start: format(startDate),
      end: format(endDate),
    };
  }

  // If a month is provided but is outside the valid range (1-12), return null.
  if (month < 1 || month > 12) {
    return null;
  }

  // Otherwise, create the range for the provided month.
  const startDate = new Date(Date.UTC(resolvedYear, month - 1, 1));
  // Using day 0 of next month gives the last day of the current month.
  const endDate = new Date(Date.UTC(resolvedYear, month, 0));

  return {
    start: format(startDate),
    end: format(endDate),
  };
};
