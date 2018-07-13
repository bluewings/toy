/* eslint-disable global-require */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import Calendar from '../../src2';
// import Wizard from '../../src/extensions/Wizard';
import schema from '../assets/schema';
import WithBootstrap from '../WithBootstrap';

storiesOf('Examples', module)
  .addDecorator(withKnobs)
  .addWithGuide('Wizard', () => (
    <WithBootstrap>
      <h3>Wizard</h3>
      <Calendar />
    </WithBootstrap>
  ), { 
    schema: schema.createAccount,
    renderProps: {
      name: 'create-account-form',
      size: 'small',
      layout: 'vertical',
    },
  });
