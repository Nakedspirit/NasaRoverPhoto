import React from 'react';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';

import { roverNames } from '../constants';
import RoverCard from './RoverCard';


const styles = theme => ({
  tabs: {
    backgroundColor: theme.palette.primary.main,
    height: '40px'
  }
});

class RoversPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rover: roverNames,
    };
  }

  render() {
  let { classes } = this.props;
  let rover = this.state.rover;

  return (
    <div className={classes.tabs}>
      {Object.values(rover).map((props) => <RoverCard {...props} />)}
    </div>
  );
  }
}

const connectedPage = connect(({ rovers }) => ({ rovers }))(RoversPage);
export default withStyles(styles, { withTheme: true })(connectedPage);