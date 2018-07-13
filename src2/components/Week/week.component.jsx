import React, { PureComponent } from 'react';
// import template from './calendar.component.pug';
/* eslint-disable */
import 'react-virtualized/styles.css';
import { AutoSizer, List } from 'react-virtualized';
import {defaultProps, compose, withPropsOnChange} from 'recompose';
import moment from 'moment';
import css from 'emotion';
import Day from '../Day';

class Week extends PureComponent {
  componentDidMount() {
    // console.log('aaa');
  }

  render() {
    // return template();
    // console.log('test');
    const {
      
    } = this.props;

    const days = [...Array(7)];

    // rowHeight={this.props.rowHeight} 

    const width = Math.floor(this.props.width / 7)
    return (

      <div>
        {
          days.map((e, i) => {
            let day = this.props.start + i;
            if (day < 1) { day = '' };
            if (day > this.props.daysInMonth) { day = '' };
            return <Day
              day={day}
              dayOfWeek={i}

              width={width} 
              rowHeight={this.props.rowHeight}  
              cache={this.props.cache}
              dayCss={this.props.dayCss}
              dayRenderer={this.props.dayRenderer}

              onDayClick={this.props.onDayClick}
              onDayMouseover={this.props.onDayMouseover}
              onDayMouseout={this.props.onDayMouseout}
              />
          })
        }
        {/* <h4>week</h4> */}
      {/* <pre>

        {JSON.stringify(this.props)}
        </pre> */}
        </div>
    )
  }
}

export default Week;
