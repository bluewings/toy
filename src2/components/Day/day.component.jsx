import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
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

const getStyle = (width, height, dayCss) => {
  if (!cached[height]) {
    const finale = {
      ...dayCss({
        width: `${width}px`,
        textAlign: 'center',
        lineHeight: `${height}px`,
        fontSize: '14px',
        // float: 'left',
      }),
      // 이 항목들은 임의로 바뀔 수 없음.
      verticalAlign: 'top',
      display: 'inline-block',
      width: '36px',
      height,
    };
    cached[height] = css(finale);
  }
  return cached[height];
};


class Day extends PureComponent {
  componentDidMount() {
    // console.log('aaa');
  }

  dayStyle = memoize((width, height, dayCss) => getStyle(width, height, dayCss))


  _dayStyle = (...data) => {
    const key = data.join(',');
    if (!cached[key]) {
      console.log(`>> ${JSON.stringify(data)}`);
      // console.log(data);
      const state = deserialize(data);
      // console.log(state);
      const finale = {
        ...this.props.passThrough.day.css({
          textAlign: 'center',
          lineHeight: `${state.height}px`,
          fontSize: '14px',
          // float: 'left',
        }, state),
        // 이 항목들은 임의로 바뀔 수 없음.
        verticalAlign: 'top',
        display: 'inline-block',
        // width: '36px',
        width: state.width,
        height: state.height,
      };
      cached[key] = css(finale);
    }
    return cached[key];
  }

  newDayStyle = state => this._dayStyle(...serialize(state))

  handleClick = (event) => {
    this.props.passThrough.day.events.click(event, {
      
    });
  }

  handleMouseOver = (event) => {
    this.props.passThrough.day.events.mouseover(event, {
      
    });
  }

  handleMouseOut = (event) => {
    this.props.passThrough.day.events.mouseout(event, {
      
    });
  }

  // _dayStyle = memoize

  render() {
    // return template();
    // console.log('test');
    const {
      day,
      dayOfWeek,
      daysSince, 
    } = this.props;
  
    const dayStyle = this.newDayStyle({
      day,
      dayOfWeek,
      width: this.props.width,
      height: this.props.rowHeight,
    });

    const org = day ? daysSince : '';
    // const org = day ? <span>{day}</span> : '';
    // const org = day ? day : '';

    const rendered = this.props.passThrough.day.renderer(org, {
      day,
      dayOfWeek,
    });

    return (
      <li
        className={dayStyle}
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {rendered} 
      </li>
    );
  }
}

Day.propTypes = {
  width: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  passThrough: PropTypes.object.isRequired,
};

export default Day;
