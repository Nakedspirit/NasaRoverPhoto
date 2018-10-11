import React, { Component } from 'react';
import { roverNames } from '../constants';
import { connect } from 'react-redux';
import NotFound from './404';
import PhotoGrid from './PhotoGrid';

import * as actions from '../state/rovers.actions';

class RoverPage extends Component {
  componentWillMount(){
    let { match: {params: {key} }, fetchPhoto} = this.props;
    let date = 100;
    fetchPhoto(key, date);
  }
  
  render() {
    let { match: {params: {key} }, rovers: { [key]: rover = {} } } = this.props;

    if (!roverNames[key]) return <NotFound />

    let { photos } = rover;

    if (null == photos) {
      return null;
    }

    return (
      <div>
        <PhotoGrid photos={ photos } />
      </div>
    );
  } 
}

export default connect(({ rovers }) => ({ rovers }), actions)(RoverPage);