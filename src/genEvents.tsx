import { generateNonOverlappingDateRanges } from "./utlis";

export const genEvents = (start: Date, end: Date) => generateNonOverlappingDateRanges(start, end, 4).map((ev, index) => {
  return {
    start: ev.start,
    end: ev.end,
    label: `Event ${index + 1}`
  };
});
