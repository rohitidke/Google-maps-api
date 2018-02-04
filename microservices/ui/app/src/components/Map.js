import React, { Component } from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

const MapStyle ={
    width: '100%',
    height: '100%',
    margin: '0px',
}
export class MapContainer extends Component {
  state = {
        mapSelect:  this.props.mapStatus,
  }
  //<Map google={this.props.google} zoom={12} style ={MapStyle}  initialCenter={{lat: 13.027271,lng: 80.271369}}>
 // </Map>
  render() {
    console.log(this.state.mapSelect);
    let map = (
      <Map 
        google={this.props.google} 
        zoom={12} 
        style ={MapStyle}  
        initialCenter={{lat: 13.027271,lng: 80.271369}}>
      </Map>
    );
    if(this.state.mapSelect === false) {
      map =(
      <Map 
        google={this.props.google} 
        zoom={12} 
        style ={MapStyle}  
        initialCenter={{lat: 13.027271,lng: 80.271369}}>
      </Map>);
    }
    else if(this.state.mapSelect === true) { 
      map =(
        <iframe
          title="maps"     
          width="600"
          height="450"
          frameborder="0" style={{border: 0}}
          src="https://www.google.com/maps/embed/v1/directions?key=AIzaSyBaeKOjXEG3Cce-YRsqxieRZ5HRy2MVTh0&origin=chennai&destination=mumbai" >
        </iframe>
      );
    }
    return(
      <div>
        {map}
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyBGkDumezTWqlCXMjnog68fqh_-TrSxmVw')
})(MapContainer)