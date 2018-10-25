import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import RoverManifest from './RoverManifest';


import Spirit from '../img/Spirit.jpg';
import Opportunity from '../img/Opportunity.jpg';
import Curiosity from '../img/Curiosity.jpg';

const styles = theme => ({
  card: {
    margin: 'auto',
    maxWidth: '600px'
  },
  cardMedia: {
    width: '250px',
    height: '250px',
    float: 'right'
  },
  cardContent: {
    float: 'left',
    margin: '15px'
  },
  contentDetails: {
    marginTop: '15px',
    float: 'rigth',
    fontSize: '12px'
  }
});

const RoverCard = ({classes, name}) => {
  const images = {
    Spirit,
    Opportunity,
    Curiosity
  };

  const path = `/rovers/${name}`

  return (
    <Link to={path}>
    <Card raised className={classes.card}>
      <CardMedia className={classes.cardMedia} image={images[name]} title={name + ' Rover'} />
      <CardContent className={classes.cardContent}>

        <Typography gutterBottom variant="headline" component="h2">
          {name}
        </Typography>
        
        <Typography component="p" className={classes.contentDetails}>
          <RoverManifest rover={name} />
        </Typography>

      </CardContent>
    </Card>
    <br/>
    </Link>
  );
};

export default withStyles(styles)(RoverCard);

