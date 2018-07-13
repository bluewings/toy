import React, { PureComponent } from 'react';
// import template from './calendar.component.pug';
/* eslint-disable */
import 'react-virtualized/styles.css';
import { AutoSizer, List } from 'react-virtualized';
import { defaultProps, compose, withPropsOnChange } from 'recompose';
import moment from 'moment';
// import Week from '../Week';
import memoize from 'memoize-one';
import { css } from 'emotion';

const cached = {};

const serialize = (state) => {
  const keys = Object.keys(state);
  const values = Object.values(state);
  return [...keys, ...values];
};

const deserialize = (serialized) => {
  const size = serialized.length / 2;
  const deserialized = {};

  for (let i = 0; i < size; i += 1) {
    deserialized[serialized[i]] = serialized[size + i];
  }
  return deserialized;
};

const getStyle = (height, dayCss) => {
  if (!cached[height]) {
    const finale = {
      ...dayCss({
        textAlign: 'center',
        lineHeight: height + 'px',
        fontSize: '14px',
        // float: 'left',
      }),
      // 이 항목들은 임의로 바뀔 수 없음.
      verticalAlign: 'top',
      display: 'inline-block',
      width: '36px',
      height,
    }
    ;

    cached[height] = css(finale);
  }
  return cached[height]
}


class Day extends PureComponent {
  componentDidMount() {
    // console.log('aaa');
  }

  // dayStyle = memoize(() => {

  // }

  dayStyle = memoize((height, dayCss) => {
    return getStyle(height, dayCss);
  })



  _dayStyle = (...data) => {
    const key = data.join(',');
    if (!cached[key]) {
      console.log('>> ' + JSON.stringify(data))
      // console.log(data);
      const state = deserialize(data);
      // console.log(state);
      const finale = {
        ...this.props.dayCss({
          textAlign: 'center',
          lineHeight: state.height + 'px',
          fontSize: '14px',
          // float: 'left',
        }, state),
        // 이 항목들은 임의로 바뀔 수 없음.
        verticalAlign: 'top',
        display: 'inline-block',
        width: '36px',
        height: state.height
      }
      ;
      cached[key] = css(finale);

    }
    return cached[key];
  }

  newDayStyle = (state) => {
    return this._dayStyle(...serialize(state))
  }

  // _dayStyle = memoize

  render() {
    // return template();
    // console.log('test');
    const {
      day,
      dayOfWeek,
    } = this.props;

    // console.log(this.dayStyle);
    const state = {
      day,
    }


  
    const dayStyle = this.newDayStyle({
      day,
      dayOfWeek,
      height: this.props.rowHeight
    })



    // const dayStyle = this.dayStyle(this.props.rowHeight, this.props.dayCss);

    const org = <em>{day}</em>
    const rendered = this.props.dayRenderer(org, {
      day,
      dayOfWeek
    })

    return (
<span className={dayStyle}
    
    > {rendered} </span>
    )
    



    // return <span className={dayStyle}
    
    // > {day} </span>


  }
}

export default Day;
