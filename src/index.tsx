import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { format } from 'date-fns';
import { Timeline, TimelineEvent } from './components/scalableTimeline/Timeline';
import { generateNonOverlappingDateRanges } from './utlis';

const timelineStart = new Date(2024, 10, 23, 8, 0); // Начало шкалы (8:00)
const timelineEnd = new Date(2024, 10, 29, 18, 0); // Конец шкалы (18:00)
const dateFormat = (date: Date) => format(date, "HH:mm dd\u2011MM\u2011yyyy")

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

type CustomData = { extraInfo: string };

const PopupComponent: React.FC<{ event: TimelineEvent<CustomData> }> = ({
  event,
}) => (
  <div>
    <strong>{event.description}</strong>
    <p>
      {dateFormat(event.start)} - {dateFormat(event.end)}
    </p>
    <p>{event.data.extraInfo}</p>
  </div>
);

const genEvents = (start: Date, end: Date) => generateNonOverlappingDateRanges(start, end, 4).map((ev, index) => {
  return {
    start: ev.start,
    end: ev.end,
    description: `Event ${index + 1}`,
    data: {
      extraInfo: `Extra info for event ${index + 1}`
    }
  };
});

const timelineData = [...Array(10).keys()].map((_, index) => {
  return {
    events: genEvents(timelineStart, timelineEnd),
    name: `Мой таймлайн ${index + 1}`
  }
})

root.render(
  <React.StrictMode>
    <div>
      <h1>Timeline with Scale Example</h1>
      <Timeline
        rows={timelineData}
        start={timelineStart}
        end={timelineEnd}
        PopupComponent={PopupComponent}
        timeMarkers="both"
        rowLabels="left"
        formatTime={dateFormat}
      />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
