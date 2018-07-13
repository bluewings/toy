/* eslint-disable react/prop-types */
import React from 'react';
import { createStore, compose } from 'redux';
import { Provider } from 'react-redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers();

export default class WithRedux extends React.Component {
  constructor(props) {
    super(props);
    // this.store = createStore(combineForms(), {}, enhancer);
    this.store = createStore({}, enhancer);
  }

  render() {
    return (
      <Provider store={this.store}>
        {this.props.children}
        {/* <div className="row">
          <div className="col-sm-6">
            <div className="card">
              <div className="card-body">
                {this.props.children}
              </div>
            </div>
          </div>
        </div> */}
      </Provider>
    );
  }
}
