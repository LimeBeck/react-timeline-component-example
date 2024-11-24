import React, { useState } from "react";
import "./Timeline.css";

export type TimelineEvent<T> = {
  start: Date;
  end: Date;
  description: string;
  data: T;
};

export type TimelineRow<T> = {
  name: string;
  events: TimelineEvent<T>[];
};

export type TimelineProps<T> = {
  rows: TimelineRow<T>[];
  start: Date;
  end: Date;
  PopupComponent?: React.ComponentType<{ event: TimelineEvent<T> }>;
  timeMarkers?: "top" | "bottom" | "both" | "none";
  rowLabels?: "left" | "right" | "both" | "none";
  formatTime?: (time: Date) => string; // Функция для форматирования времени
};

export const Timeline = <T,>({
  rows,
  start,
  end,
  PopupComponent,
  timeMarkers = "both",
  rowLabels = "left",
  formatTime = (time) => time.toISOString(), // Формат по умолчанию
}: TimelineProps<T>) => {
  const [hoveredEvent, setHoveredEvent] = useState<TimelineEvent<T> | null>(
    null
  );

  const totalDuration = end.getTime() - start.getTime();

  const calculatePosition = (time: Date) =>
    Math.max(0, Math.min(100, ((time.getTime() - start.getTime()) / totalDuration) * 100));

  // Вычисляем отступы для временных меток
  const getTimeMarkersStyle = () => {
    const paddingLeft = ["left", "both"].includes(rowLabels) ? "120px" : "0";
    const paddingRight = ["right", "both"].includes(rowLabels) ? "120px" : "0";
    return { paddingLeft, paddingRight };
  };

  const renderTimeMarkers = () => {
    const markers = [];
    const markerCount = 10; // Количество временных меток
    for (let i = 0; i <= markerCount; i++) {
      const markerTime = new Date(
        start.getTime() + (totalDuration * i) / markerCount
      );
      markers.push(
        <div
          key={i}
          className="time-marker"
          style={{ left: `${(i * 100) / markerCount}%` }}
        >
          {formatTime(markerTime)}
        </div>
      );
    }
    return markers;
  };

  return (
    <div className="timeline-container">
      {["top", "both"].includes(timeMarkers) && (
        <div className="time-markers-wrapper">
          <div className="time-markers" style={getTimeMarkersStyle()}>
            {renderTimeMarkers()}
          </div>
        </div>
      )}

      {rows.map((row, rowIndex) => (
        <div className="timeline-row" key={rowIndex}>
          {["left", "both"].includes(rowLabels) && (
            <div className="timeline-row-label timeline-row-label-left">
              {row.name}
            </div>
          )}

          <div className="timeline-events">
            {row.events.map((event, eventIndex) => {
              const eventStartPosition = calculatePosition(event.start);
              const eventEndPosition = calculatePosition(event.end);
              const eventWidth = eventEndPosition - eventStartPosition;

              if (eventWidth <= 0) return null; // Скрыть события полностью за границами

              return (
                <div
                  key={eventIndex}
                  className="timeline-event"
                  style={{
                    left: `${eventStartPosition}%`,
                    width: `${eventWidth}%`,
                  }}
                  onMouseEnter={() => setHoveredEvent(event)}
                  onMouseLeave={() => setHoveredEvent(null)}
                >
                  {hoveredEvent === event && PopupComponent && (
                    <div className="timeline-popup">
                      <PopupComponent event={event} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {["right", "both"].includes(rowLabels) && (
            <div className="timeline-row-label timeline-row-label-right">
              {row.name}
            </div>
          )}
        </div>
      ))}

      {["bottom", "both"].includes(timeMarkers) && (
        <div className="time-markers-wrapper">
          <div className="time-markers" style={getTimeMarkersStyle()}>
            {renderTimeMarkers()}
          </div>
        </div>
      )}
    </div>
  );
};
