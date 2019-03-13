import React, { Component } from 'react';
import data from '../data.json'
import GraphClientContainer from './GraphClientContainer'
import './stylesheets/graphContainer.css'

class GraphContainer extends Component {
  constructor(props){
    super(props)
   // this.handleClickOnClientId = this.handleClickOnClientId.bind(this)

   this.state = {
    currentData: null
   }
  }

  // Click on client, return client id on state
  handleClickOnClientId(id) {
    const clientData = data.filter(data => data.id === id)
    this.setState({
      currentData: clientData
    })   
  }


  render() {
    // map on client list 
   const clientsIds = data.map((i, key) => {
    return (<button className='client' key={key} onClick={() => this.handleClickOnClientId(i.id)}>Client n°{i.id}</button>)
  }) 

    return (
      <div className="App">
        <div className='list-clients'>{clientsIds}</div>
        {this.state.currentData&& <GraphClientContainer data={this.state.currentData} /> }
      </div>
    );
  }
}



export default GraphContainer;
