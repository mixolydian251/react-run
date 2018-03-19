import React from 'react';
import DisplayRuns from './DisplayRuns'

class SettingsPage extends React.Component{

  state = {
    runModal: false
  };

  handleRunModal = () => {
    this.setState((prevState) => ({ runModal: !prevState.runModal }));
    console.log(this.state.runModal)
  };

  render(){
    return(
      <div className="settingsContainer">
        <div className="settingsPage">

          <button className="login-modal__close" onClick={this.handleRunModal}>Vew all runs</button>

          { this.state.runModal &&
          <DisplayRuns handleRunModal={this.handleRunModal}/> }

        </div>
      </div>
    )
  }
}

export default SettingsPage