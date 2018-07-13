import React from 'react';
import PropTypes from 'prop-types';
// import dat from 'dat.gui';
import entries from 'object.entries';

const controls = {
  name: [''],
  labelWidth: [120, 0, 400],
  labelAlign: ['left', ['left', 'right']],
  layout: ['responsive', ['responsive', 'horizontal', 'vertical']],
  size: ['default', ['small', 'default', 'large']],
  debug: [false],
  readOnly: [false],
  displayErrorSummary: [false],
  wizard: [false],
};

export default class WrapStory extends React.Component {
  constructor(props) {
    super(props);
    
    // initialize dat.GUI
    function FormProps(options = {}) {
      entries(controls).forEach(([key, [defaultValue]]) => {
        this[key] = typeof options[key] !== 'undefined' ? options[key] : defaultValue;
      });
    }
    this.formProps = new FormProps(props.context.renderProps);
    // this.gui = new dat.GUI();
    // entries(controls).forEach(([key, [, ...rest]]) => {
    //   this.gui.add(this.formProps, key, ...rest);
    // });
    // this.gui.close();
    // this.watchFormProps();

    this.state = { storyContent: this.props.initialContent };
  }

  componentWillUnmount() {
    this.gui.destroy();
    cancelAnimationFrame(this._animationFrame);
  }

  // watchFormProps = () => {
  //   cancelAnimationFrame(this._animationFrame);
  //   if (this.snapshot !== JSON.stringify(this.formProps)) {      
  //     this.snapshot = JSON.stringify(this.formProps);
  //     const { storyFn, context } = this.props;
  //     context.renderProps = Object.assign(context.renderProps || {}, this.formProps);
  //     this.setState({ storyContent: storyFn(context) });
  //   }
  //   this._animationFrame = requestAnimationFrame(this.watchFormProps);
  // }

  render() {
    return this.state.storyContent;
  }
}

WrapStory.propTypes = {
  context: PropTypes.object,
  initialContent: PropTypes.object,
  storyFn: PropTypes.func,
};

WrapStory.defaultProps = {
  context: {},
  initialContent: {},
  storyFn: context => context,
};
