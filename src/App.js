import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

export default class App extends Component {
  pageSize = 15;

  state = {
    mode: 'light'
  }

  toggleMode = () => {
    if (this.state.mode === 'light') {
      this.setState({ mode: 'dark' });
      document.body.style.backgroundColor = '#2c2934a5'; // Dark background
    } else {
      this.setState({ mode: 'light' });
      document.body.style.backgroundColor = 'white'; // Light background
    }
  }

  render() {
    return (
      <div>
        <Router>
          <NavBar mode={this.state.mode} toggleMode={this.toggleMode} />
          <Routes>
            <Route exact path="/" element={<News key="general" pageSize={this.pageSize} country="in" category="general" mode={this.state.mode} />} />
            <Route exact path="/business" element={<News key="business" pageSize={this.pageSize} country="in" category="business" mode={this.state.mode} />} />
            <Route exact path="/businesses" element={<News key="businesses" pageSize={this.pageSize} country="in" category="business" mode={this.state.mode} />} />
            <Route exact path="/entertainment" element={<News key="entertainment" pageSize={this.pageSize} country="in" category="entertainment" mode={this.state.mode} />} />
            <Route exact path="/general" element={<News key="general" pageSize={this.pageSize} country="in" category="general" mode={this.state.mode} />} />
            <Route exact path="/health" element={<News key="health" pageSize={this.pageSize} country="in" category="health" mode={this.state.mode} />} />
            <Route exact path="/science" element={<News key="science" pageSize={this.pageSize} country="in" category="science" mode={this.state.mode} />} />
            <Route exact path="/sports" element={<News key="sports" pageSize={this.pageSize} country="in" category="sports" mode={this.state.mode} />} />
            <Route exact path="/technology" element={<News key="technology" pageSize={this.pageSize} country="in" category="technology" mode={this.state.mode} />} />
          </Routes>
        </Router>
      </div>
    )
  }
}
