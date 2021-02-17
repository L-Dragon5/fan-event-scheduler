import React from 'react';

const EventsListView = ({ events }) => {
  return (
    <div>
      <ul className="collection schedule-list">
        {events ? (
          Object.entries(events).map((k, index) => {
            const event = k[1];
            return (
              <li className="collection-item schedule-list__item" key={index}>
                <span
                  className="schedule-list__item__title"
                  style={{
                    textDecoration: event.is_cancelled
                      ? 'line-through'
                      : 'none',
                  }}
                >
                  {event.title}
                </span>
                <span
                  className="schedule-list__item__location"
                  style={{
                    textDecoration: event.is_cancelled
                      ? 'line-through'
                      : 'none',
                  }}
                >
                  {event.location}
                </span>
                <span
                  className="schedule-list__item__time"
                  style={{
                    textDecoration: event.is_cancelled
                      ? 'line-through'
                      : 'none',
                  }}
                >
                  {event.time_start} - {event.time_end}
                </span>
              </li>
            );
          })
        ) : (
          <div className="preloader-wrapper big active">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle" />
              </div>
              <div className="gap-patch">
                <div className="circle" />
              </div>
              <div className="circle-clipper right">
                <div className="circle" />
              </div>
            </div>
          </div>
        )}
      </ul>
    </div>
  );
};

export default EventsListView;
