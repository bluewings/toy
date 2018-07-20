import React, { PureComponent } from 'react';
// import template from './calendar.component.pug';
/* eslint-disable */
import 'react-virtualized/styles.css';
import { AutoSizer, List } from 'react-virtualized';
import {defaultProps, compose, withPropsOnChange} from 'recompose';
import moment, { months } from 'moment';
import Week from '../Week';
import { css } from 'emotion';
import memoize from 'memoize-one';


class MonthLabel extends PureComponent {
  componentDidMount() {
    // console.log('aaa');
  }

  monthLabel = memoize((height, collapseLabel) => {
    return css({
      height,
      fontSize: '14px',
      fontWeight: 'bold',
      // background: 'yellow',
      // opacity: 0.3,
      lineHeight: height + 'px',

      position: collapseLabel ? 'absolute' : 'relative'
    })
  })

  render() {
    // return template();
    // console.log('test');
    const {
      year,
      month,
    } = this.props;

    const rowHeight = this.monthLabel(this.props.rowHeight, this.props.collapseLabel);





//     return (
//       <div className={rowHeight}>
// {year} {month}
//         </div>
//     )


    const org = <em>{year} {month}</em>
    const rendered = this.props.passThrough.monthLabel.renderer(org, {
      year,
      month,
    })
// const monthLabelStyle = '';
    return (
<span className={rowHeight}
    
    > {rendered} </span>
    )

  }
}

export default MonthLabel;
