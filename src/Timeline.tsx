import React from "react";
import "./Timeline.css";

export interface TimelineEvent {
  start: Date;
  end: Date;
  label: string;
  customPopup?: React.ReactNode;
}

export interface TimelineProps {
  events: TimelineEvent[];
  timelineStart: Date;
  timelineEnd: Date;
}

export const Timeline: React.FC<TimelineProps> = ({ events, timelineStart, timelineEnd }) => {
  const calculatePosition = (date: Date) => {
    const totalDuration = timelineEnd.getTime() - timelineStart.getTime();
    const timeFromStart = date.getTime() - timelineStart.getTime();
    return (timeFromStart / totalDuration) * 100;
  };

  return (
    <div className="timeline-wrapper">
      <div className="timeline">
        {events.map((event, index) => {
          const startPercentage = calculatePosition(event.start);
          const endPercentage = calculatePosition(event.end);
          const eventWidth = endPercentage - startPercentage;

          return (
            <div
              className="timeline-event"
              key={index}
              style={{
                left: `${startPercentage}%`,
                width: `${eventWidth}%`,
              }}
            >
              <div className="timeline-label">{event.label}</div>
              <div className="timeline-popup">
                {event.customPopup ? (
                  event.customPopup
                ) : (
                  <DefaultPopup event={event} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const DefaultPopup: React.FC<{ event: TimelineEvent }> = ({ event }) => (
  <div>
    <p><strong>{event.label}</strong></p>
    <p>Start: {event.start.toLocaleString()}</p>
    <p>End: {event.end.toLocaleString()}</p>
  </div>
);
