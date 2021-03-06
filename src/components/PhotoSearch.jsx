import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {requestPhotos} from '../state/actions.photos';
import PhotoForm from './PhotoForm';
import PhotoGrid from './PhotoGrid';
import {Utils} from '../utils';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

const styles = theme => ({
  root: {
    margin: '20px',
  },
  form: {
    margin: '30px 15px',
    padding: '15px',
    float: 'left',
    backgroundColor: '#efefef',
    border: '1px solid #ddd'
  },
  results: {
    margin: '30px 5px'
  },
  solDropdown: {
    minWidth: '215px'
  }
});

class PhotoSearch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedSol: '',
      selectedSolObj: { cameras: [] },
      selectedCamera: ''
    };
    this.handleSolChange = this.handleSolChange.bind(this);
    this.handleCameraChange = this.handleCameraChange.bind(this);
    this.requestPhotos = this.requestPhotos.bind(this);
    
  }

  handleSolChange (event) {
    let solNum = event.target.value;
    let photos = this.props.manifest.photos;
    let objForSol = photos.find(item => (item.sol.toString() === solNum));
    this.setState({
      selectedSol: solNum,
      selectedSolObj: objForSol,
      selectedCamera: ''
    });
  }

  handleCameraChange (event) {
    this.setState({
      selectedCamera: event.target.value
    })
  }

  requestPhotos() {
    const params = {
      sol: this.state.selectedSol,
      camera: this.state.selectedCamera,
      page: 1
    };
    /* TODO implement real paging */
    this.props.requestPhotos(this.props.rover, params);
  }

  render() {
    const { manifest, photos, classes } = this.props;
    const { selectedSol, selectedSolObj, selectedCamera } = this.state;
    let aPhoto = photos[0];
    let earthDate = aPhoto && Utils.formatDate(aPhoto.earth_date);
    let cameraName = aPhoto && aPhoto.camera.full_name;
    let manifestsLoaded = Object.keys(manifest).length > 0;

    return (
      <div className={classes.root}>
        { aPhoto &&
          <div className={classes.results}>
            <Typography variant="headline" color="textSecondary" gutterBottom>{cameraName}, {earthDate} </Typography>
            <PhotoGrid photos={photos} />
          </div>
        }
        {
          !manifestsLoaded ? <LinearProgress size={100} className={classes.progress} /> :
            <div>
              <PhotoForm
                manifest={manifest}
                selectedSol={selectedSol}
                selectedSolObj={selectedSolObj}
                handleSolChange={this.handleSolChange}
                selectedCamera={selectedCamera}
                handleCameraChange={this.handleCameraChange}
                requestPhotos={this.requestPhotos} />
            </div>
        }
      </div>
    );
  }
}

PhotoSearch.propTypes = {
  rover: PropTypes.string,
  manifest: PropTypes.object,
  photos: PropTypes.arrayOf(PropTypes.object),
  classes: PropTypes.object
};

const mapStateToProps = (state, ownProps) => ({
    photos: state.photos
});

const mapDispatchToProps = dispatch => ({
  requestPhotos: (rover, params) => dispatch(requestPhotos(rover, params))
});

const connected = connect(mapStateToProps, mapDispatchToProps)(PhotoSearch);
export default withStyles(styles)(connected);