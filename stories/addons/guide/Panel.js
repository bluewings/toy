

import React from 'react';
import PropTypes from 'prop-types';

const styles = {
  notesPanel: {
    margin: 10,
    fontFamily: 'Arial',
    fontSize: 14,
    color: '#444',
    width: '100%',
    overflow: 'auto',
  },
};

class Panel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { schema: {}, value: null };
  }

  componentDidMount() {
    const { channel, api } = this.props;

    // Listen to the notes and render it.
    channel.on('addon:guide:schemaChange', this.onSchemaChange);
    channel.on('addon:guide:valueChange', this.onValueChange);

    // Clear the current notes on every story change.
    this.stopListeningOnStory = api.onStory(() => {
      this.onSchemaChange({});
      this.onValueChange(null);
    });
  }

  // This is some cleanup tasks when the Panel panel is unmounting.
  componentWillUnmount() {
    if (this.stopListeningOnStory) {
      this.stopListeningOnStory();
    }

    this.unmounted = true;
    const { channel } = this.props;
    channel.removeListener('addon:guide:schemaChange', this.onSchemaChange);
    channel.removeListener('addon:guide:valueChange', this.onValueChange);
  }

  onSchemaChange = (text) => {
    this.setState({ schema: text });
  }

  onValueChange = (text) => {
    this.setState({ value: text });
  }

  render() {
    const { value, schema } = this.state;
    return (
      <div style={styles.notesPanel}>
        <pre>{JSON.stringify(value, null, 2)}</pre>
        <hr />
        <pre>{JSON.stringify(schema, null, 2)}</pre>
      </div>
    );
  }
}

Panel.propTypes = {
  channel: PropTypes.object,
  api: PropTypes.object,
};

Panel.defaultProps = {
  channel: {},
  api: {},
};

export default Panel;
