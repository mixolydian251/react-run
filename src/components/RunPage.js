import React from 'react';
import { stringifyTime, calculateDistance } from '../api/Run';
import { startAddRun } from "../actions/run"
import { connect } from 'react-redux';

class HomePage extends React.Component{

  state = {
    running: true,
    timer: undefined,
    startTime: 0,
    timeRef: 0,
    relativeTime: 0,
    time: 0,
    speed: 0,
    distRef: 0,
    distance: 0,
    signInModal: false,
  };

  runTimer = () => {
    this.setState((prevState) => ({
      startTime: new Date().getTime(),
      running: !prevState.running
    }), () =>{
      if (this.state.running === false) {
        const timer = setInterval(() => {
          this.setState((prevState) => ({
            time: this.state.timeRef + new Date().getTime() - this.state.startTime,
            relativeTime: new Date().getTime() - this.state.startTime,
            distance: (this.state.relativeTime/3600000) * this.state.speed + this.state.distRef
          }))
        }, 41);
        this.setState({timer})
      } else {
        this.setState((prevState) => ({
          timeRef: this.state.time,
          distRef: this.state.distance
        }));
        clearInterval(this.state.timer)
      }
    });
  };

  reset = () => {
    clearInterval(this.state.timer);
    this.setState({
      running: true,
      timer: undefined,
      startTime: 0,
      relativeTime: 0,
      timeRef: 0,
      distRef: 0,
      time: 0,
      distance: 0
    })
  };

  handleIncrease = () => this.setState((prevState) => ({
    timeRef: this.state.time,
    startTime: new Date().getTime(),
    relativeTime: 0,
    distRef: this.state.distance,
    speed: prevState.speed + 0.5
  }));

  handleDecrease = () => this.setState((prevState) => ({
    timeRef: this.state.time,
    startTime: new Date().getTime(),
    relativeTime: 0,
    distRef: this.state.distance,
    speed: this.state.speed > 0 ? prevState.speed - 0.5 : 0
  }));

  handleUpload = () => {
    if(this.props.uid && this.state.distance){
      this.props.startUpload({
        date: Number(new Date().getTime()),
        time: this.state.time,
        distance: this.state.distance,
      })
    } else if (!this.props.uid){
      this.setState({signInModal: true })
    }
  };

  render () {
    return(
      <div className="runPage">
        <button className="runPage__button runPage__button--reset"
                onClick={this.reset}>
          Reset
        </button>

        <button className="runPage__button runPage__button--upload"
                onClick={this.handleUpload}>
          Upload
        </button>

        <div className="runPage__measurement"
              onClick={this.runTimer}>
          <span className="runPage__measurement--title">Time:</span>
          <button className="runPage__measurement--number runPage__measurement--button">
            {stringifyTime(this.state.time)}
          </button>
        </div>

        <div className="runPage__measurement">
          <span className="runPage__measurement--title">Speed:</span>
          <span className="runPage__measurement--number">
            {this.state.speed.toFixed(1)} mph
            <button className="runPage__measurement--increase runPage__measurement--button"
                  onClick={this.handleIncrease}> + </button>
            <button className="runPage__measurement--decrease runPage__measurement--button"
                  onClick={this.handleDecrease}> - </button>
            </span>
        </div>

        <div className="runPage__measurement">
          <span className="runPage__measurement--title">Distance:</span>
          <span className="runPage__measurement--number">{this.state.distance.toFixed(2)} miles</span>
        </div>



      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  startUpload: (run) => dispatch(startAddRun(run))
});

const mapStateToProps = (state) => ({
  uid: state.auth.uid
});

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)