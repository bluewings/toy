import React, { PureComponent } from 'react';
// import template from './calendar.component.pug';
/* eslint-disable */
import 'react-virtualized/styles.css';
import { AutoSizer, List } from 'react-virtualized';
import {defaultProps, compose, withPropsOnChange} from 'recompose';
import moment from 'moment';
import MonthLabel from '../MonthLabel';
import Week from '../Week';

class Month extends PureComponent {
  componentDidMount() {
    // console.log('aaa');
  }

  handleEvent = (type, event) => {
const {
    year,
    month,
    weeks,
    startDay,
    monthIndex,
    weekIndex,
    dayIndex,
    daysInMonth,
    collapseLabel,
} = this.props;

    this.props.passThrough.month.events[type](event, {

      year,
      month,
      weeks,
      startDay,
      monthIndex,
      weekIndex,
      dayIndex,
      daysInMonth,
      collapseLabel,
    });
  }

  handleClick = (event) => {
    this.handleEvent('click', event);
    
  }

  handleMouseOver = (event) => {
    this.handleEvent('mouseover', event);
  }

  handleMouseOut = (event) => {
    this.handleEvent('mouseout', event);
  }

  render() {
    // return template();
    // console.log('test');
    const {
      year,
      month,
    } = this.props;



    return (
      // <div style={{ border: "1px solid blue", position: "relative" }}>
      <div style={{ position: "relative" }}
      onClick={this.handleClick}
      onMouseOver={this.handleMouseOver}
      onMouseOut={this.handleMouseOut}
      
      >
        {/* <h4>{this.props.year} {this.props.month} { this.props.startDay}</h4> */}
  {/* <h4>{this.props.dayIndex}</h4> */}
        <MonthLabel 
        year={year}
        month={month}
        rowHeight={this.props.rowHeight} 
        collapseLabel={this.props.collapseLabel} 

        passThrough={this.props.passThrough}

        cache={this.props.cache}
        monthLabelCss={this.props.monthLabelCss}
        monthLabelRenderer={this.props.monthLabelRenderer}
        />
        {
          this.props.weeks.map(week => {
            return <Week {...week}

            minDayIndex={this.props.minDayIndex}
            maxDayIndex={this.props.maxDayIndex}
              daysSince={this.props.dayIndex}
              daysInMonth={this.props.daysInMonth}
              width={this.props.width} 
              rowHeight={this.props.rowHeight} 

              passThrough={this.props.passThrough}

              cache={this.props.cache}
              monthCss={this.props.monthCss}
              monthLabelCss={this.props.monthLabelCss}
              weekCss={this.props.weekCss}
              dayCss={this.props.dayCss}

              // monthRenderer={this.props.monthRenderer}
              // weekRenderer={this.props.weekRenderer}
              // dayRenderer={this.props.dayRenderer}


              // onDayClick={this.props.onDayClick}
              // onDayMouseover={this.props.onDayMouseover}
              // onDayMouseout={this.props.onDayMouseout}

            />
          })
        }
        </div>
    )


  }
}

export default Month;
