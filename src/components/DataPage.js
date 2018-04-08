import React from 'react';
import moment from 'moment';
import { Bar } from 'react-chartjs-2';
import { connect } from 'react-redux';
import {stringifyTime} from "../api/Run";

class DataPage extends React.Component {

  data = {
    datasets: [{
      label: 'Distance',
      yAxisID: 'B',
      data: this.props.runs.map(run => run.distance),
      borderColor: '#ffffff',
      borderWidth: 3,
      backgroundColor: 'rgba(255,255,255,0.2)',
      type: 'line'
    }, {
      label: 'Pace',
      yAxisID: 'A',
      data: this.props.runs.map(run => run.distance/(run.time / 3600000)),
      borderColor: 'rgba(255,255,255,0.7)',
      borderWidth: 2,
      backgroundColor: ['rgba(255,30,30,0.5)','rgba(13,146,235,0.5)','rgba(183,44,254,0.5)','rgba(255,215,0,0.6)', 'rgba(32,255,80,0.5)'],
    }],
    labels: this.props.runs.map(run => moment(run.date).format('MM/DD'))
  };

  options = {
    elements: {
      point: {
        radius: 5,
        borderWidth: 1,
        pointStyle: 'circle',
        hitRadius: 5,
        hoverRadius: 5
      }
    },
    legend: {
      labels: {
        fontColor: "white",
        fontSize: 12
      }
    },
    maintainAspectRatio: false,
    title: {
      display: true,
      text: `Last ${'5'} runs`,
      fontFamily: 'Avenir, Helvetica sans-serif',
      fontColor: "white",
      fontSize: 20
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Pace  [ mph ]',
          fontFamily: 'Avenir, Helvetica sans-serif',
          fontColor: '#fff',
          fontSize: 15,
        },
        id: 'A',
        type: 'linear',
        position: 'left',
        // ticks:{
        //   callback: (t) => stringifyTime(t),
        //   stepSize: 30000, //add a tick every 5 seconds
        // }
      }, {
        scaleLabel: {
          display: true,
          labelString: 'Distance  [ miles ]',
          fontFamily: 'Avenir, Helvetica sans-serif',
          fontColor: '#fff',
          fontSize: 15,
        },
        id: 'B',
        type: 'linear',
        position: 'right',
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: 'Runs Uploaded',
          fontColor: '#fff',
          fontSize: 15,
        },
        ticks: {
          beginAtZero:true,
          fontColor: "white",
          fontSize: 12
        }
      }]
    }
  };


  render(){
    return(
      <div className="dataPage">
        <div className="dataPage__chart">
          <Bar data={this.data}
                height="200"
                options={this.options}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  runs: state.runs
});


export default connect(mapStateToProps)(DataPage)