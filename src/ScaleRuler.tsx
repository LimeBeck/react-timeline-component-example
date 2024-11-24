import React from "react";
import "./ScaleRuler.css";

interface ScaleRulerProps {
  start: Date;
  end: Date;
  timeUnit: "seconds" | "minutes" | "hours" | "days" | "months";
  unitStep: number; // Единица дробления
}

export const ScaleRuler: React.FC<ScaleRulerProps> = ({ start, end, timeUnit, unitStep }) => {
  const calculateMarks = (): Date[] => {
    const marks: Date[] = [];
    const current = new Date(start);

    while (current <= end) {
      marks.push(new Date(current));
      switch (timeUnit) {
        case "seconds":
          current.setSeconds(current.getSeconds() + unitStep);
          break;
        case "minutes":
          current.setMinutes(current.getMinutes() + unitStep);
          break;
        case "hours":
          current.setHours(current.getHours() + unitStep);
          break;
        case "days":
          current.setDate(current.getDate() + unitStep);
          break;
        case "months":
          current.setMonth(current.getMonth() + unitStep);
          break;
        default:
          throw new Error("Unsupported time unit");
      }
    }

    return marks;
  };

  const marks = calculateMarks();

  return (
    <div className="scale-ruler">
      {marks.map((mark, index) => (
        <div className="scale-mark" key={index} style={{ left: `${(index / (marks.length - 1)) * 100}%` }}>
          <div className="mark-line"></div>
          <div className="mark-label">{mark.toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
};
