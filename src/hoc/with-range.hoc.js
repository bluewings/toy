import { compose, withPropsOnChange } from 'recompose';
import { differenceInDays, differenceInCalendarDays } from 'date-fns';

const withRange = compose(withPropsOnChange(['selected'], ({ selected }) => {
  console.log(selected);
  console.log(differenceInDays(new Date(2018, 0, 2), new Date(1970, 0, 1)));
  console.log(differenceInCalendarDays(new Date(2018, 0, 2), new Date(1970, 0, 1)));
  return {
    _selected: selected,
  };
}));

export default withRange;
