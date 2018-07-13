import React from 'react';
import addonAPI from '@storybook/addons';
import Panel from './Panel';

addonAPI.register('storybook-addon-guide', (storybookAPI) => {
  addonAPI.addPanel('storybook-addon-guide', {
    title: 'schema',
    render: () => <Panel channel={addonAPI.getChannel()} api={storybookAPI} />,
  });
});
