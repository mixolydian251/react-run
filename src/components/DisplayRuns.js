import React from 'react';
import moment from 'moment'
import { stringifyTime } from '../api/Run'
import { connect } from 'react-redux';
import {startRemoveRun} from "../actions/run";

const DisplayRuns = (props) => {

  const removeRun = (e) => {
    const id = e.target.value;
    props.startRemoveRun({id})
  };

  const generateRuns = () => {
    console.log(props.runs);

    return props.runs.map((run) => {
      return(
      <div key={run.id} className="runContainer">
        <span className="runContainer__data">{moment(run.date).format("MM/DD/YYYY hh:mm A")}</span>
        <span className="runContainer__data">{stringifyTime(run.time)}</span>
        <span className="runContainer__data">{`${run.distance.toFixed(2)} miles`}</span>
        <button className="runContainer__remove" value={run.id} onClick={removeRun}>x</button>
      </div>
      )
    })
  };

  return(
    <div className="displayRuns">
      <div className="displayRuns__container">
        {
          props.runs.length !== 0 ?
          (
            <div style={{width: '100%'}}>{generateRuns()}</div>
            ):(
            <h2> You have 0 saved runs </h2>
          )
        }
      </div>

      <button className="login-modal__close"
              onClick={props.handleRunModal}>close</button>
    </div>
  )
};

const mapStateToProps = (state) => ({
  runs: state.runs
});

const mapDispatchToProps = dispatch => ({
  startRemoveRun: (id) => dispatch(startRemoveRun(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(DisplayRuns)