import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import { css } from 'emotion';
import Day from '../Day';

class Week extends PureComponent {
  componentDidMount() {
    // console.log('aaa');
  }

  weekStyle = memoize(() => css({
    display: 'block',
    margin: 0,
    padding: 0,
  }))

  handleClick = (event) => {
    this.props.passThrough.week.events.click(event, {
      
    });
  }

  handleMouseOver = (event) => {
    this.props.passThrough.week.events.mouseover(event, {
      
    });
  }

  handleMouseOut = (event) => {
    this.props.passThrough.week.events.mouseout(event, {
      
    });
  }

  render() {
    // return template();


    const days = [...Array(7)];

    // rowHeight={this.props.rowHeight} 

    const width = Math.floor(this.props.width / 7);

    const weekStyle = this.weekStyle();
    return (

      <ul
        className={weekStyle}
        onClick={this.handleClick}
        onMouseOver={this.handleMouseOver}
        onMouseOut={this.handleMouseOut}
      >
        {
          days.map((e, i) => {
            let day = this.props.start + i;
            let daysSince;
            if (day < 1) {
              day = '';
              daysSince = this.props.daysSince - 0.5;
          } else if (day > this.props.daysInMonth) {
            day = '';
            daysSince = this.props.daysSince + this.props.daysInMonth -  0.5;
         } else {
           daysSince = this.props.daysSince + day - 1;
         }
            return (<Day
              year={this.props.year}
              month={this.props.month}
              day={day}
              daysSince={daysSince}
              dayOfWeek={i}

              width={width} 
              rowHeight={this.props.rowHeight}  
              cache={this.props.cache}
              passThrough={this.props.passThrough}
            />);
          })
        }
      </ul>
    );
  }
}

Week.propTypes = {
  width: PropTypes.number.isRequired,
  rowHeight: PropTypes.number.isRequired,
  passThrough: PropTypes.object.isRequired,
};

export default Week;
