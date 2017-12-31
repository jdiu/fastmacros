import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'material-ui/Button';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import IntroPage from './components/IntroPage.jsx';
import ResultsPage from './components/ResultsPage.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: {}
    }
  }

  setInputVal = (name, val) => {
    this.setState({
      [name]: val
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h2 className="App-title">Fast Macros</h2>
        </header>
        <IntroPage setInputVal={this.setInputVal} />
        <br/><br/>
        <ResultsPage meal={this.state.meal} />
      </div>
    );
  }
}

export default App;
