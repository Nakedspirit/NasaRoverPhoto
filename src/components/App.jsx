import 'babel-polyfill';
import 'typeface-roboto';
import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { Header } from '../components/Header';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';

import RoverPage from '../components/RoverPage';
import RoversPage from '../components/RoversPage';

import rovers from '../state/reducers';
import { loadAllManifests } from '../state/actions.manifests';
import {
  manifestsReducer as manifests,
  photosReducer as photos
} from '../state/reducers';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#263238",
      main: "#263238",
      dark: "#263238",
    },
    secondary: {
      light: "#bf360c",
      main: "#bf360c",
      dark: "#bf360c"
    },
    text: {
      primary: "#000000",
      secondary: "#ffc107"
    },
    background: {
      paper: "#a1887f",
      default: "#a1887f"
    },
    action: {
      disabled: "rgba(255, 255, 255, 0.54)"
    },
  }
});

const styles = theme => ({
});

const store = createStore(
  combineReducers({
    rovers,
    manifests,
    photos
  }),
  applyMiddleware(thunk)
);

class App extends Component {
  componentDidMount() {
    store.dispatch(loadAllManifests());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <MuiThemeProvider theme={theme}>
            <div className={this.props.classes.root}>
              <Header/>
              <Route path='/rovers/:key' component={RoverPage} render={ (props) => <RoverPage {...props} /> }/>
              <Route exact={true} path='/' render={ (props) => <RoversPage {...props} /> }/>
            </div>
          </MuiThemeProvider>
        </Router>
      </Provider>
    )
  }
}

export default withStyles(styles)(App);
