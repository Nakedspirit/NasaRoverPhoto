import React, { Component } from 'react';
import { roverNames } from '../constants';
import { connect } from 'react-redux';
import NotFound from './404';
import PhotoSearch from './PhotoSearch';

class RoverPage extends Component {
  
  render() {
    
    let { match: {params: {key} } } = this.props;

    if (!roverNames[key]) return <NotFound />

    let { manifests } = this.props;
    let manifest = manifests[key];

    return (
      <div>
        <PhotoSearch key={key} rover={key} manifest={manifest} />
      </div>
    );
  } 
}

const mapStateToProps = (state, ownProps) => ({
  manifests: state.manifests
});

export default connect(mapStateToProps)(RoverPage);