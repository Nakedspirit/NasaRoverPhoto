import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../state/rovers.actions';


const capitalize = (word = '') => {
  let splitWord = word.split('');
  let firstLetter = splitWord[0].toUpperCase();
  splitWord.splice(0, 1, firstLetter);
  return splitWord.join('');
};

const formatDate = date => new Date(date).toDateString()

class RoverManifest extends Component {
  componentDidMount() {
    let { rover: key, fetchManifest } = this.props;
    console.log('fetch ' + key);
    fetchManifest(key);
  }

  render() {
    let { rover: key, rovers: { [key]: rover = {} } } = this.props;
    let { manifest } = rover;
    if (null == manifest) {
      return null;
    }

    return (
      <div>  
          <h2>Mission Manifest</h2><br/>
          <b>Launch Date:</b> {formatDate(manifest.launch_date)}<br/>
          <b>Landing Date:</b> {formatDate(manifest.landing_date)}<br/>
          <b>Days on Mars:</b> {manifest.max_sol}<br/>
          <b>Last Photo Taken On:</b> {formatDate(manifest.max_date)}<br/>
          <b>Rover Status:</b> {capitalize(manifest.status)}
      </div>
    );
  }
}

export default connect(({ rovers }) => ({ rovers }), actions)(RoverManifest);