import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Clock extends React.Component {
    constructor(props) {
      super(props);
      this.state = {date: new Date()};
    }
  
    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }
  
    componentWillUnmount() {
        clearInterval(this.timerID);
    }
  
    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {
      return (
        <div>
          <h4>Hello, world! It is {this.state.date.toLocaleTimeString()}.</h4>
        </div>
      );
    }
}
ReactDOM.render(
  <Clock />,
  document.getElementById('clock')
);
  