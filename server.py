from src import app
from flask import Flask, render_template, request, jsonify, abort, make_response, json
import requests

app= Flask(__name__)

@app.route('/map',methods=['post'])
def temp():
    origin= request.form['origin']
    destination= request.form['destination']
    r= requests.get('https://maps.googleapis.com/maps/api/directions/json?origin='+origin+'&destination='+destination+'&key=AIzaSyCn4XGejPnfnYpv36mHd06txKmpWGCIY1Y')
    json_object= r.json()
    distance=json_object['routes'][0]['legs'][0]['distance']['text']
    time=json_object['routes'][0]['legs'][0]['duration']['text']
    directions=json_object['routes'][0]['legs'][0]['steps']
    return render_template('frontend.html',dist=distance,time=time,direct=directions,ori=origin,desti=destination)

@app.route('/')
def index():
    return render_template('places.html')

@app.route('/api', methods = ['POST'])
def postJsonHandler():
    content = request.get_json()
    origin=content['origin']
    destination=content['destination']
    r= requests.get('https://maps.googleapis.com/maps/api/directions/json?origin='+origin+'&destination='+destination+'&key=AIzaSyCn4XGejPnfnYpv36mHd06txKmpWGCIY1Y')
    json_object= r.json()
    if json_object['status']=="INVALID_REQUEST":
        abort(make_response(jsonify({'error': 'Invalid request. Origin or destination parameter is missing'}),400))
    elif json_object['status']=="NOT_FOUND":
        abort(make_response(jsonify({'error': 'Invalid origin or destination'}),400))
    elif json_object['status']=="ZERO_RESULTS":
        abort(make_response(jsonify({'error': 'Multiple locations found, please send an exact location'}),400))
    else:
        array1=[]
        distance=json_object['routes'][0]['legs'][0]['distance']['text']
        time=json_object['routes'][0]['legs'][0]['duration']['text']
        directions=json_object['routes'][0]['legs'][0]['steps']
        for item in directions:
            dist=item['distance']['text']
            dura=item['duration']['text']
            inst=item['html_instructions']
            directdict={'distance':dist,'duration':dura,'html_instructions':inst}
            array1.append(directdict)
        return jsonify(directions=array1,distance=distance,duration=time)

if __name__=='__main__':
    app.run(debug=True)
