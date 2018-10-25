import React from 'react';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {Utils} from '../utils';

import ShareButton from 'react-social-share-buttons'

const styles = {
  close: {
    float: 'right',
  },
  img: {
    width: '100%',
    height: 'auto'
  }
};

class PhotoDialog extends React.Component {
  
  render() {
    const { classes, photo, onClose, ...other } = this.props;


    return (
      <Dialog maxWidth={false} onClose={onClose} aria-labelledby="dialog-title" {...other}>
        <DialogTitle id="dialog-title">
            <div>
                <img src={photo.img_src} alt={''} style={styles.img}/>
                <b>Camera:</b> {photo.camera.full_name}<br/>
                <b>Sol/Earth Date:</b> {photo.sol}/{Utils.formatDate(photo.earth_date)}<br/>
            </div>
            <Button
                className={classes.close}
                color="secondary"
                variant="flat"
                size="small"
                onClick={onClose}>
                <CloseIcon/>
            </Button>
            <ShareButton
                compact
                socialMedia={'facebook'}
                url={photo.img_src}
                media={photo.img_src}
                text="Mars photo"
            />
        </DialogTitle>
      </Dialog>
    );
  }
}

PhotoDialog.propTypes = {
  dispatch: PropTypes.func,
  photo: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  classes: PropTypes.object
};

const mapStateToProps = (state, ownProps) => ({
  
});

const connected = connect(mapStateToProps, null)(PhotoDialog);
export default withStyles(styles)(connected);
