import { defaultProps } from 'recompose';


const noop = () => {};

// const withDefaultProps = defaultProps({
//   autoFocus: true,
//   // DayComponent: Day,
//   display: 'days',
//   displayOptions: {},
//   // HeaderComponent: Header,
//   height: 500,
//   keyboardSupport: true,
//   max: new Date(2050, 11, 31),
//   maxDate: new Date(2050, 11, 31),
//   min: new Date(1980, 0, 1),
//   minDate: new Date(1980, 0, 1),
//   onHighlightedDateChange: noop,
//   onScroll: noop,
//   onScrollEnd: noop,
//   onSelect: noop,
//   passThrough: {},
//   rowHeight: 56,
//   tabIndex: 1,
//   width: 400,
//   // YearsComponent: Years,
// });
const withDefaultProps = defaultProps({
  min: new Date(2018, 0, 15),
  max: new Date(2018, 11, 15),
  width: 280,
  height: 400,
  rowHeight: 40,
  // isSelected: returnFalse,
  // isSelected: returnFalse,
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
});


export default withDefaultProps;

