import { compose, withState, withPropsOnChange, withProps } from 'recompose';
import { differenceInDays, differenceInCalendarDays } from 'date-fns';

const withRange = compose(
  withState('selStart', 'updateSelStart', null),
  withState('selEnd', 'updateSelEnd', null),



  withPropsOnChange(['selected'], ({ selected, updateSelStart, updateSelEnd }) => {
  // console.log(selected);
  // if (Array.)
    let __selectedStart;
    let __selectedEnd;

    if (selected && selected.start && selected.end) {
      __selectedStart = new Date(selected.start).toISOString();
      __selectedEnd = new Date(selected.end).toISOString();
      updateSelStart(__selectedStart);
      updateSelEnd(__selectedEnd);
    }

    console.log(selected);
    console.log(__selectedStart, __selectedEnd);

    // console.log(differenceInDays(new Date(2018, 0, 2), new Date(1970, 0, 1)));
    // console.log(differenceInCalendarDays(new Date(2018, 0, 2), new Date(1970, 0, 1)));
    return;
    // return {
    //   __selectedStart,
    //   __selectedEnd,
    //   // _selected: selected,
    // };
  }),
  withPropsOnChange(['selStart', 'selEnd'], ({ selStart: __selectedStart, 
    selEnd: __selectedEnd,
    updateSelStart,
    updateSelEnd,
  }) => {
    // new Date();

    const start = differenceInCalendarDays(new Date(__selectedStart), new Date(1970, 0, 1)) - 1;
    const end = differenceInCalendarDays(new Date(__selectedEnd), new Date(1970, 0, 1)) - 1;
  
    const isSelected = ({ daysSince }) => {

      if (start <= daysSince && daysSince <= end) {
        return true;
      }
      return false;

      console.log('>>> isSelected', params);
    };

  
    return {
      _selected: [start, end],
      isSelected,
      events: {
        day: {
          click: (event, { year, month, day }) => {

            if (!__selectedStart || 
              (__selectedStart && __selectedEnd)) {
              updateSelStart(new Date(year, month, day).toISOString());
              updateSelEnd(null);
            } else {
              updateSelEnd(new Date(year, month, day).toISOString());
            }
            
            
          }
        }
      }
    };
  }),

  withProps(({}) => {
    console.log('withProps called');
    return {};
  })
  

);

export default withRange;
