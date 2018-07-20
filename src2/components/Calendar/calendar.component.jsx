import React, { PureComponent } from 'react';
// import template from './calendar.component.pug';
/* eslint-disabl */
import PropTypes from 'prop-types';
import entries from 'object.entries';
import 'react-virtualized/styles.css';
import { AutoSizer, List } from 'react-virtualized';
import { defaultProps, compose, withPropsOnChange } from 'recompose';
// import moment from 'moment';
import { format, compareAsc, differenceInDays, startOfMonth, getDaysInMonth, differenceInCalendarMonths, addMonths } from 'date-fns';
import Month from '../Month';

differenceInDays(new Date(1970, 0, 1), new Date(1970, 0, 2));

class Calendar extends PureComponent {
  cache = {}

  render() {
    // return template();
    // console.log('test');
    const {
      minDayIndex,
      maxDayIndex,
      months,
    } = this.props;


    return (
      <div>
        <pre>{JSON.stringify(this.props._selected)}</pre>
        <div style={{ width: this.props.width, height: this.props.height }}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                height={height}
                // rowHeight={240}
                rowCount={months.length}

                rowHeight={({ index }) => {
                  const { collapseLabel, weeks } = months[index];

                  return (weeks.length + (collapseLabel ? 0 : 1)) * this.props.rowHeight;
                }}
                rowRenderer={({ index, key, style }) => {
                  const { year, month } = months[index];

                  return (
                    <div key={key} style={style}>
                      {/* <h3></h3> */}
                      <Month 
                        minDayIndex={minDayIndex}
                        maxDayIndex={maxDayIndex}
                      
                        {...months[index]} 

                        width={this.props.width} 

                        rowHeight={this.props.rowHeight} 

                        cache={this.cache}

                        passThrough={this.props.passThrough}

                      
                      />
                    </div>
                    
                  );
                  // return <div key={key} style={style}>{year}.{month}</div>
                }
                
              
              }
                width={width}
              />
            )

          
          }
          </AutoSizer>
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  width: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  passThrough: PropTypes.object.isRequired,
};

const byPass = base => base;
const noop = () => {};

const skeleton = () => ({
  css: byPass,
  renderer: byPass,
  events: {
    click: noop,
    mouseover: noop,
    mouseout: noop,
  },
});

const enhance = compose(
  defaultProps({
    min: new Date(2018, 0, 15),
    max: new Date(2018, 11, 15),
    width: 280,
    height: 400,
    rowHeight: 40,
    renderer: {
      // monthLabel: (base, { year, month }) => `${year}년 ${month}월`,
    },
    styles: {
      // day: ((base, { day, dayOfWeek }) => {
      //   if (dayOfWeek === 0) {
      //     return {
      //       ...base,
      //       color: 'red',
      //       border: '1px solid black',
      //       boxSizing: 'border-box',
      //       // background: 'yellow',
      //     };
      //   }
      //   return {
      //     ...base,
      //     border: '1px solid black',
      //     boxSizing: 'border-box',
      //   };
      // }),
    },
  }),

  withPropsOnChange(['min', 'max'], ({ min, max }) => {
    // alert(min22)
    
    // const min_ = moment(min);
    // const max_ = moment(max);
    // moment(max)
    const minDayIndex = parseInt(min.getTime() / 60 / 60 / 24 / 1000, 10);
    const maxDayIndex = parseInt(max.getTime() / 60 / 60 / 24 / 1000, 10);
    // const monthCount = max_.diff(min_, 'months') + 1;
    const monthCount = differenceInCalendarMonths(max, min) + 1;
    const months = [...Array(monthCount)].map((e, i) => {
      const tmp = startOfMonth(addMonths(min, i));
      const year = tmp.getFullYear();
      const month = tmp.getMonth();


      // const year = parseInt(min_.format('YYYY'), 10);

      
      // const month = parseInt(min_.format('MM'), 10);
      // const startOfMont = min_.startOf('month');
      const dayIndex = parseInt(tmp.getTime() / 60 / 60 / 24 / 1000, 10) - minDayIndex;
      // const dayIndex = parseInt(startOfMont.unix() / 60 / 60 / 24, 10);


      // const startDay = min_.startOf('month').day();

      const startDay = startOfMonth(tmp).getDay();
      // const startDay = min_.startOf('month').day();
      // const daysInMonth = min_.daysInMonth();

      const daysInMonth = getDaysInMonth(tmp);
      // min_.add(1, 'month');

      
      const weeks = [...Array(Math.ceil((startDay + daysInMonth) / 7))]
        .map((e, i) => ({
          start: -startDay + (i * 7) + 1,
        }));

      return {
        // a: 's',
        year,
        month,
        weeks,

        startDay,
        monthIndex: i,
        weekIndex: parseInt(dayIndex / 7, 10),
        dayIndex,
        daysInMonth,
        i,
        collapseLabel: startDay > 3,
      };
    });
     
    return { 
      minDayIndex,
      maxDayIndex,
      months,
    };
  }),

  withPropsOnChange(['styles', 'renderer', 'events'], ({ styles = {}, renderer = {}, events = {} }) => {
    const passThrough = {
      month: skeleton(),
      monthLabel: skeleton(),
      week: skeleton(),
      day: skeleton(),
    };

    Object.keys(styles).forEach((key) => {
      if (passThrough[key]) {
        passThrough[key].css = styles[key];
      }
    });
    Object.keys(renderer).forEach((key) => {
      if (passThrough[key]) {
        passThrough[key].renderer = renderer[key];
      }
    });
    Object.keys(events).forEach((key) => {
      if (passThrough[key]) {
        passThrough[key].events = entries(events[key]).reduce((prev, [name, handler]) => ({
          ...prev,
          [name.toLowerCase()]: handler,
        }), passThrough[key].events);
      }
    });
    return {
      passThrough,
    };
  }),
);

export default enhance(Calendar);
