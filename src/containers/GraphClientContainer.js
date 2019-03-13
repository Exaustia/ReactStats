import React, { Component } from 'react';
import '../../node_modules/react-vis/dist/style.css';
import {XYPlot, LineSeries} from 'react-vis';
import './stylesheets/graphClient.css'


class GraphClientContainer extends Component {
   
  // Sort tab with time
    sortTab =( a,b) => {
        if (a.time < b.time)
          return -1;
        if (a.time > b.time)
          return 1;
        return 0;
      }


  render() {
    let distanceFinal = []
    let path = []
    let time = []
   //Mutable props
    let data = Object.assign({}, this.props.data[0]) 
    //Sort data
    let dataSort = data.points.sort(this.sortTab)
  
    dataSort.map((d)=> {   
            path.push({x: d.x, y: d.y})
            time.push(d.time)
     
    });
    // calcule distance and time with pythagore and time1 - time2 etc.
    for (let i = 0; i < dataSort.length - 1 ; i++){
        let distance = Math.sqrt(Math.pow(dataSort[i + 1 ].x - dataSort[i].x, 2 )  + Math.pow(dataSort[i + 1].y - dataSort[i].y, 2 ) )
        distanceFinal.push(distance)

        let timeTemp = dataSort[i + 1].time - dataSort[i].time
        time.push(timeTemp)
       
    }

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalTime = time.reduce(reducer)
    const averageTime = totalTime / time.length
    distanceFinal = distanceFinal.reduce(reducer)
    const averageSpeed = distanceFinal / totalTime

    return (
    <div className='graph-client'>
        <div className="graph">
            <XYPlot height={300} width={300}>
            <LineSeries data={path} color='red'/>
            </XYPlot>
        </div>
        <div className='stats'>
            <div className='nb total-time'>Temps total : {totalTime} unités</div>
            <div className='nb average-time'>Temps moyen d'un trajet entre deux arrêts : {Math.round(averageTime)} unités</div>
            <div className='nb total-stop'>Nombres d'arrêts : {path.length}</div>
            <div className='nb total-distance'>Distance parcouru : {distanceFinal} unités</div>
            <div className='nb speed-average'>Vitesse moyenne : {averageSpeed} unités</div>
        </div>
    </div>
    );
  }
}

export default GraphClientContainer;
