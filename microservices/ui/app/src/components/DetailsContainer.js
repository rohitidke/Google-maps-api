import React, { Component } from 'react';
import GetInput from  './GetInput';
import DirectionsDiv from './ShowDirection';
import axios from 'axios';

class DetailsContainer extends Component {
    state = {
        source: '',
        destination: '',
        Divpresent: false,
        distance: null,
        duration: null,
        direction: [],
        status: null
    } 
    getDirectionsHandler = () => {
        const presentState = this.state.Divpresent;
        this.setState({
            Divpresent: !presentState
        });
        axios.post('https://app.brusqueness80.hasura-app.io/api',{
            "origin": this.state.source,
            "destination": this.state.destination
        })
        .then(response  =>  {   
            this.setState({
                distance: response.data.distance,
                duration: response.data.duration,
                direction: response.data.directions,
                dirstring: response.data.directionString,
                status: 500
            });  
            this.props.clicked(this.state.Divpresent,this.state.source,this.state.destination,this.state.dirstring);
            console.log(response.data)
        })
        .catch(function (error) {
            console.log('error');
            let stat=404;
        })
    }
    goBackHandler = () => {
        const presentState = this.state.Divpresent;
        this.setState({
            Divpresent: !presentState
        });
        this.setState({
            source: '',
            destination: '',
            Divpresent: false,
            distance: null,
            duration: null,
            route: null,
            status: null
        });
        const val = true;
        this.props.changeMapBack();
    }
    getsourcevalue = () => {
        var sourceval = document.querySelector("#source").value;
        this.setState({
            source: sourceval
        });
    }
    getdestinationvalue = () => {
        var destinationval = document.querySelector("#destination").value;
        this.setState({
            destination: destinationval
        });
    }
    render() {  
        const direction = (
            <div>
                <table>
                    <tr>
                        <th> Direction </th>
                        <th> Distance </th>
                        <th> Duration </th>
                    </tr>
                    {this.state.direction.map(ele =>{
                        return (
                            <tr>
                                <td dangerouslySetInnerHTML={{__html: ele.html_instructions}}></td>
                                <td>{ele.distance}</td>
                                <td>{ele.duration}</td>
                            </tr>
                        ); 
                    })}
                    <tr>
                        <td style={{color:'#F1F1F1'}}>_ </td>
                        <td style={{color:'#F1F1F1'}}>_ </td>
                        <td style={{color:'#F1F1F1'}}>_</td>
                    </tr>
                 </table> 
            </div>
        );
        let showInput = (
            <GetInput sourceValue={this.getsourcevalue} destinationvalue={this.getdestinationvalue} click={this.getDirectionsHandler} />
        );
        console.log(this.state.status);
        if(this.state.Divpresent) {
            showInput = (<DirectionsDiv 
                source={this.state.source} 
                destination={this.state.destination}  
                distance={this.state.distance} 
                duration={this.state.duration} 
                directions={direction}
                click={this.goBackHandler} 
                status={this.state.status}
            />);    
        }
        else {
            showInput = (<GetInput sourceValue={this.getsourcevalue} destinationValue={this.getdestinationvalue} click={this.getDirectionsHandler} />);
            
        }
        
        return (
            <div>
                {showInput}
            </div>
        );
    }
}

export default DetailsContainer;