import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Timeline } from './Timeline';
import { generateNonOverlappingDateRanges } from './utlis';
import { ScaleRuler } from './ScaleRuler';
import { title } from 'process';
import { Columns } from './Columns';

const timelineStart = new Date(2024, 10, 23, 8, 0); // Начало шкалы (8:00)
const timelineEnd = new Date(2024, 10, 23, 18, 0); // Конец шкалы (18:00)

const genEvents = () =>
  generateNonOverlappingDateRanges(timelineStart, timelineEnd, 4).map((ev, index) => {
    return {
      start: ev.start,
      end: ev.end,
      label: `Event ${index + 1}`
    }
  });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const timelines = [...Array(10).keys()].map((_, index) => {
  return {
    events: genEvents(),
    title: `Мой таймлайн ${index + 1}`
  }
})

const columns = [
  {
    content: <>{timelines.map((line, index) => {
      return <div className='timeline-title'>{line.title}</div>
    })}</>
  },
  {
    content: <>{[...timelines.map((line, index) => {
      return <Timeline
        events={line.events}
        timelineStart={timelineStart}
        timelineEnd={timelineEnd}
      />
    }), <ScaleRuler start={timelineStart} end={timelineEnd} timeUnit="hours" unitStep={1} />]}</>
  }
]

root.render(
  <React.StrictMode>
    <div>
      <h1>Timeline with Scale Example</h1>
      {/* <Columns columns={columns} /> */}
      {
        timelines.map((line, index) => {
          return <Timeline
            events={line.events}
            timelineStart={timelineStart}
            timelineEnd={timelineEnd}
          />
        })
      }

      <ScaleRuler start={timelineStart} end={timelineEnd} timeUnit="hours" unitStep={1} />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
