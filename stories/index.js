import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';
import { withKnobs, text, boolean, number } from '@storybook/addon-knobs/react';

import { Button, Welcome } from '@storybook/react/demo';

import { SchemaForm } from '../react-schema-form';

import simple from './json-schema/simple.json';

const stories = storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

stories.addDecorator(withKnobs);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}>Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}>😀 😎 👍 💯</Button>);

  storiesOf('Other', module)
  .add('with text', () => {
    return <SchemaForm />
  })
