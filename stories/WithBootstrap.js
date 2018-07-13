/* eslint-disable react/prop-types */
import React from 'react';

export default function WithBootstrap(props) {
  return (
    <div className="SchemaForm bootstrap4">
      {props.children}
    </div>
  );
}
