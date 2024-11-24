import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { Timeline } from './components/timeline/Timeline';
import { ScaleRuler } from './components/timeline/ScaleRuler';
import { format } from 'date-fns';
import { Columns } from './components/columns/Columns';
import { genEvents } from './genEvents';

const timelineStart = new Date(2024, 10, 23, 8, 0); // Начало шкалы (8:00)
const timelineEnd = new Date(2024, 10, 23, 18, 0); // Конец шкалы (18:00)

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const timelines = [...Array(10).keys()].map((_, index) => {
  return {
    events: genEvents(timelineStart, timelineEnd),
    title: `Мой таймлайн ${index + 1}`
  }
})

const columns = [
  {
    content: <>{timelines.map((line, index) => {
      return <div className='timeline-title'>{line.title}</div>
    })}</>,
    proportion: 1
  },
  {
    content: <>{[...timelines.map((line, index) => {
      return <Timeline
        events={line.events}
        timelineStart={timelineStart}
        timelineEnd={timelineEnd}
      />
    }), <ScaleRuler start={timelineStart} end={timelineEnd} timeUnit="hours" unitStep={1} />]}</>,
    proportion: 4
  }
]

root.render(
  <React.StrictMode>
    <div>
      <h1>Timeline with Scale Example</h1>
      <Columns columns={columns} />
      {
        timelines.map((line, index) => {
          return <Timeline
            events={line.events}
            timelineStart={timelineStart}
            timelineEnd={timelineEnd}
          />
        })
      }

      <ScaleRuler
        start={timelineStart}
        end={timelineEnd}
        timeUnit="hours"
        unitStep={1}
        dateFormat={(date) => format(date, "HH:mm dd\u2011MM\u2011yyyy")}
      />
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
