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

  render() {
    // return template();
    // console.log('test');
    const {
      year,
      month,
    } = this.props;



    return (
      // <div style={{ border: "1px solid blue", position: "relative" }}>
      <div style={{ position: "relative" }}>
        {/* <h4>{this.props.year} {this.props.month} { this.props.firstDay}</h4> */}

        <MonthLabel 
        year={year}
        month={month}
        rowHeight={this.props.rowHeight} 
        collapseLabel={this.props.collapseLabel} 

        cache={this.props.cache}
        monthLabelCss={this.props.monthLabelCss}
        monthLabelRenderer={this.props.monthLabelRenderer}
        />
        {
          this.props.weeks.map(week => {
            return <Week {...week} daysInMonth={this.props.daysInMonth}

              rowHeight={this.props.rowHeight} 

              cache={this.props.cache}
              monthCss={this.props.monthCss}
              monthLabelCss={this.props.monthLabelCss}
              weekCss={this.props.weekCss}
              dayCss={this.props.dayCss}

              monthRenderer={this.props.monthRenderer}
              weekRenderer={this.props.weekRenderer}
              dayRenderer={this.props.dayRenderer}
            
            />
          })
        }
        </div>
    )


  }
}

export default Month;
