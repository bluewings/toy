import React, { PureComponent } from 'react';
// import template from './calendar.component.pug';
/* eslint-disable */
import 'react-virtualized/styles.css';
import { AutoSizer, List } from 'react-virtualized';
import {defaultProps, compose, withPropsOnChange} from 'recompose';
import moment from 'moment';
import Month from '../Month';

class Calendar extends PureComponent {
  componentDidMount() {
    // console.log('aaa');
  }

  cache = {}

  handleDayClick = (event) => {
    console.log('handleDayMouseover');
  }

  handleDayMouseover = (event) => {
    
  }

  handleDayMouseout = (event) => {
    
  }

  render() {
    // return template();
    // console.log('test');
    const {
      months
    } = this.props;



    return (
      <div>
        <pre>{JSON.stringify(this.props)}</pre>
      <div style={{ width: this.props.width, height: this.props.height, border: '5px solid red' }}>
        <AutoSizer>
          {({ height, width }) => {
            

            return (
              <List
                height={height}
                rowHeight={240}
                rowCount={months.length}

                rowHeight={({ index }) => {

                  const { collapseLabel, weeks } = months[index];

                  return (weeks.length + (collapseLabel ? 0 : 1)) * this.props.rowHeight

                }}
                rowRenderer={({ index, key, style }) => {
                  const { year, month } = months[index];

                  return (
                    <div key={key} style={style}>
                      {/* <h3></h3> */}
                      <Month 
                      
                      {...months[index]} 

                      width={this.props.width} 

                      rowHeight={this.props.rowHeight} 

                      cache={this.cache}

                      onDayClick={this.handleDayClick}
                      onDayMouseover={this.handleDayMouseover}
                      onDayMouseout={this.handleDayMouseout}

                      monthCss={this.props.monthCss}
                      monthLabelCss={this.props.monthLabelCss}
                      weekCss={this.props.weekCss}
                      dayCss={this.props.dayCss}

                      monthRenderer={this.props.monthRenderer}
                      monthLabelRenderer={this.props.monthLabelRenderer}
                      weekRenderer={this.props.weekRenderer}
                      dayRenderer={this.props.dayRenderer}
                      
                      />
                      </div>
                    
                  )
                  // return <div key={key} style={style}>{year}.{month}</div>
                }
                
                
              
              }
                width={width}
              />
            )
          }
          

          
          }
        </AutoSizer>
      </div>
      </div>
    );
  }
}

const enhance = compose(
  defaultProps({
    min: new Date(2018, 0, 1),
    max: new Date(2020, 11, 31),
    width: 400,
    height: 400,
    rowHeight: 36,
    renderer: {
      monthLabel: (base, { year, month }) => {
        return year + '년 ' + month + '월';
      },
      // day: (base, { day }) => {
      //   return (
      //     <div>
      //       _
      //       {base}
      //     </div>
      //   )
      // }
    },
    styles: {
      day: ((base, { day, dayOfWeek }) => {

        if (dayOfWeek === 0) {
          return {
            ...base,
            color: 'red'
            // background: 'yellow',
          }
        }
        return base;

      })
    }
  }),

  withPropsOnChange(['min', 'max'], ({ min, max }) => {
    const min_ = moment(min)
    const max_ = moment(max)
    // moment(max)

    const monthCount = max_.diff(min_, 'months') + 1;
    const months = [...Array(monthCount)].map((e, i) => {
      const year = parseInt(min_.format('YYYY'), 10);
      
      const month = parseInt(min_.format('MM'), 10);
      const firstDay = min_.startOf('month').day();
      const daysInMonth = min_.daysInMonth();
      min_.add(1, 'month');

      
      const weeks = [...Array(Math.ceil((firstDay + daysInMonth) / 7))]
        .map((e, i) => {
          return {
            start: -firstDay + (i * 7) + 1,
          }
        })

      return {
        // a: 's',
        year,
        month,
        weeks,
        collapseLabel: firstDay > 3,
        firstDay,
        daysInMonth,
        i
      }
    })

     
    return { 
      months,
    };
  }),
  withPropsOnChange(['styles'], ({ styles = {} }) => {
    return Object.keys(styles).reduce((prev, key) => {
      return {
        ...prev,
        [key + 'Css']: styles[key]
      }
    }, {
      monthCss: (base) => base,
      monthLabelCss: (base) => base,
      weekCss: (base) => base,
      dayCss: (base) => base,
    })
  }), 
  withPropsOnChange(['renderer'], ({ renderer = {} }) => {
    return Object.keys(renderer).reduce((prev, key) => {
      return {
        ...prev,
        [key + 'Renderer']: renderer[key]
      }
    }, {
      monthRenderer: (base) => base,
      monthLabelRenderer: (base) => base,
      weekRenderer: (base) => base,
      dayRenderer: (base) => base,
    })
  }), 
);
  // autoFocus: true,
  // DayComponent: Day,
  // display: 'days',
  // displayOptions: {},
  // HeaderComponent: Header,
  // height: 500,
  // keyboardSupport: true,
  // max: new Date(2050, 11, 31),
  // maxDate: new Date(2050, 11, 31),
  // min: new Date(1980, 0, 1),
  // minDate: new Date(1980, 0, 1),
  // onHighlightedDateChange: emptyFn,
  // onScroll: emptyFn,
  // onScrollEnd: emptyFn,
  // onSelect: emptyFn,
  // passThrough: {},
  // rowHeight: 56,
  // tabIndex: 1,
  // width: 400,
  // YearsComponent: Years,
// });

export default enhance(Calendar);
