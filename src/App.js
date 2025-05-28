import './App.css';
import React, { Component} from 'react';
import Navbar from './Components/Navbar';
import News from './Components/News';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoadingBar from "react-top-loading-bar";


export default class App extends Component {
  
  api ="f4d1fb7f40a54aa498ad6b12cff24aaf"
  state={
    progress : 0,
  }
  setProgress=(progress)=>{
    this.setState({progress:progress})
  }
  
  render() {

    return (
      <Router>
        <div>
          <Navbar />
          <LoadingBar
            color="#f11946"
            height={3}
            progress={this.state.progress}
          />
          <Routes>
            {/* Define routes with different categories */}
            <Route
              path="/"
              element={<News setProgress={this.setProgress} api={this.api}  key="general" pageSize={10} country="us" category="general" />}
            />
            <Route
              path="/entertainment"
              element={<News setProgress={this.setProgress} api={this.api}  key="entertainment" pageSize={10} country="us" category="entertainment" />}
            />
            <Route
              path="/health"
              element={<News setProgress={this.setProgress} api={this.api}  key="health" pageSize={10} country="us" category="health" />}
            />
            <Route
              path="/sports"
              element={<News setProgress={this.setProgress} api={this.api}  key="sports" pageSize={10} country="us" category="sports" />}
            />
            <Route
              path="/business"
              element={<News setProgress={this.setProgress} api={this.api}  key="business" pageSize={10} country="us" category="business" />}
            />
            <Route
              path="/technology"
              element={<News setProgress={this.setProgress} api={this.api}  key="technology" pageSize={10} country="us" category="technology" />}
            />
            <Route
              path="/science"
              element={<News setProgress={this.setProgress} api={this.api}  key="science" pageSize={10} country="us" category="science" />}
            />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    );
  }
}
