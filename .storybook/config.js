
import React from 'react';
import { configure, addDecorator, setAddon } from '@storybook/react';
import infoAddon from '@storybook/addon-info';
import guideAddon from '../stories/addons/guide';
import './storybook.scss';
// import WithRedux from './WithRedux';

// addDecorator(story => (
//   // <WithRedux>
//   <div
//     {story()}
//   // </WithRedux>
// ));

function loadStories() {
  require('../stories/examples');
  // require('../stories/type-number');
  // require('../stories/type-string');
  // require('../stories/customize');
  // require('../stories/theme');
}

setAddon(infoAddon);
setAddon(guideAddon);

configure(loadStories, module);
