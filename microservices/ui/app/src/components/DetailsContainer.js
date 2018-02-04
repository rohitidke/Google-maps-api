import React, { Component } from 'react';
import Paper from 'material-ui/Paper';
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
        directions: [],
        status: null
    }
    getDirectionsHandler = () => {
        const presentState = this.state.Divpresent;
        let stat =0;
        this.setState({
            Divpresent: !presentState
        });
        this.props.changeMapStatus;
        axios.post('https://app.brusqueness80.hasura-app.io/api',{
            "origin": this.state.source,
            "destination": this.state.destination
        })
        .then(response  =>  {
            this.setState({
                distance: response.data.distance,
                duration: response.data.duration, 
                directions: response.data.directions,
                status: 500
            });
            console.log(response);            
        })
        .catch(function (error) {
            console.log('error');
            stat= 404;
        });
        this.setState({
            status: stat
        });   
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
            directions: [],
            status: null
        });
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
        const direction= (
            <div>
                <table>
                    <tr>
                        <th> Direction </th>
                        <th> Distance </th>
                        <th> Duration </th>
                    </tr>
                    {this.state.directions.map(ele =>{
                        return (
                            <tr>
                                <td dangerouslySetInnerHTML={{__html: ele.html_instructions}}></td>
                                <td>{ele.distance}</td>
                                <td>{ele.duration}</td>
                            </tr>
                        ); 
                    })}
                 </table> 
            </div>
        );
        let showInput = (
            <GetInput 
                sourceValue={this.getsourcevalue} 
                destinationvalue={this.getdestinationvalue} 
                click={this.getDirectionsHandler} />
        );
        if(this.state.Divpresent) {
            showInput = (<DirectionsDiv 
                source={this.state.source} 
                destination={this.state.destination}  
                distance={this.state.distance} 
                duration={this.state.duration} 
                directions={direction}
                click={this.goBackHandler} 
                status={this.state.status}
                />
            );    
        }
        else {
            showInput = (<GetInput 
                sourceValue={this.getsourcevalue} 
                destinationValue={this.getdestinationvalue} 
                click={this.getDirectionsHandler} />
            );
            
        }
        
        return (
            <div>
                {showInput}
            </div>
        );
    }
}

export default DetailsContainer;