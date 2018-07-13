/* eslint-disable no-param-reassign */ 
import addons from '@storybook/addons';
import { action } from '@storybook/addon-actions';
import { text, number, boolean, select, object } from '@storybook/addon-knobs/react';
import entries from 'object.entries';

const props = {
  name: (value = 'myForm') => text('NAME', value),
  size: (value = 'default') => select('SIZE', {
    small: 'small (sm)',
    default: 'default',
    large: 'large (lg)',
  }, value),
  layout: (value = 'responsive') => select('LAYOUT', {
    responsive: 'responsive',
    horizontal: 'horizontal',
    vertical: 'vertical',
  }, value),
  labelAlign: (value = 'left') => select('LABEL_ALIGN', {
    left: 'left',
    right: 'right',
  }, value),
  labelWidth: (value = 120) => number('LABEL_WIDTH', value),
  debug: (value = false) => boolean('DEBUG', value),
  readOnly: (value = false) => boolean('READ_ONLY', value),
  displayErrors: (value = 'dirtyOnly') => select('DISPLAY_ERRORS', {
    all: 'all',
    dirtyOnly: 'dirtyOnly (true)',
    none: 'none (false)',
  }, value),
  displayErrorSummary: (value = false) => boolean('DISPLAY_ERROR_SUMMARY', value),
};

export default {
  addWithGuide: function addWithGuide(storyName, description, storyFn, options = {}) {
    if (typeof storyFn !== 'function') {
      if (typeof description === 'function') {
        options = storyFn || {};
        storyFn = description;
        description = '';
      } else {
        throw new Error('No story defining function has been specified');
      }
    }
    const channel = addons.getChannel();
    channel.emit('addon:guide:schemaChange', options.schema || '');
    channel.emit('addon:guide:valueChange', null);
    return this.addWithInfo(storyName, description, (context) => {
      const { renderProps } = options || {};
      context.renderProps = entries(props).reduce((prev, [name, knobFn]) => ({
        ...prev,
        [name]: knobFn(renderProps && renderProps[name]),
      }), {
        onChange: (value) => {
          const valueObj = value && typeof value.toJS === 'function' ? value.toJS() : value;
          channel.emit('addon:guide:valueChange', valueObj);
          action('onChange')(valueObj);
        },
        onFocus: (path) => {
          action('onFocus')(path);
        },
        onBlur: (path) => {
          action('onBlur')(path);
        },
      });
      if (options.schema) {
        context.renderProps.schema = object('SCHEMA', options.schema);
        context.schema = options.schema;
      }
      return storyFn(context);
    }, options);
  },
};

export const withGuide = (storyFn, context) => storyFn(context);
