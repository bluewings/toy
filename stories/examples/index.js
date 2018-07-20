/* eslint-disable global-require */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs/react';
import Calendar, { withRange } from '../../src';
// import Wizard from '../../src/extensions/Wizard';
import schema from '../assets/schema';
import WithBootstrap from '../WithBootstrap';

const NewCal = withRange(Calendar);

storiesOf('Examples', module)
  .addDecorator(withKnobs)
  .addWithGuide('Wizard', () => (
    <WithBootstrap>
      <h3>Wizard</h3>
      <NewCal 
        selected={{
          start: new Date(2018, 1, 16),
          end: new Date(2018, 1, 20),
        }}
        events={{
          day: {
            click: () => {
              console.log('wow clicked!!!')
            },
            mouseover: () => {
              console.log('mouseover')
            }
          },
          week: {
            click: () => {
              console.log('week clicked!!!')
            },
    
          },
          month: {
            click: (event, data) => {
              console.log('month clicked!!!', data)
            },
    
          }
        }}
      />
    </WithBootstrap>
  ), { 
    schema: schema.createAccount,
    renderProps: {
      name: 'create-account-form',
      size: 'small',
      layout: 'vertical',
    },
  });
