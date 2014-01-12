#pragma strict

import System.IO;
var fileName : String;
var cue = Array();
	
var destination:Vector3;
var speed: float = 0.1;
var pos: int = 1;
var smoothRotation:float = 10;
var dstFromStart: int = 0;

public var teorico: loadCircuitNorm;

function loadLoop(){
	
    var sr = new StreamReader(fileName + "/Tramo_0_car_" + gameObject.name + "_interpolated.csv");
	    var fileContents = sr.ReadToEnd();
	    sr.Close();
	    var lines = fileContents.Split("\n"[0]);
	    
	    var n = 0;
	    for (line in lines) {
	    	if(n == 0){
	    		n += 1;
	    	}
	    	else if(line.Length > 20){
	    		var tokens = line.Split(","[0]);
 				var pV: Vector3 = Vector3(parseInt(tokens[3]), parseFloat(tokens[5]), parseFloat(tokens[13]));
	    		cue.push(pV);
	    	}
	    }
	    
	    
}

function Start () {
	loadLoop();
	pos = 0;
	teorico = GameObject.Find("teorico").GetComponent("loadCircuitNorm") as loadCircuitNorm;
	updatePos();
	transform.position = destination;
}

function updatePos(){

	if(pos >= cue.length){
		speed = 0;
		dstFromStart = 0;
	}
	else{
		var cuePos:Vector3 = cue[pos];
		destination = teorico.vertices[cuePos[0]];
		speed = cuePos[1];
		if(speed == -1) speed = 1;
		dstFromStart = cuePos[2];
	}
}
function move(){
	var step = speed * Time.deltaTime;
	transform.position = Vector3.MoveTowards(transform.position, destination, step);
	if(transform.position == destination){
		pos = (pos + 1);
		updatePos();
	}
	var targetDir = destination - transform.position;	
	if(destination - transform.position != Vector3.zero){
			var rotation = Quaternion.LookRotation(destination - transform.position);
			transform.rotation = Quaternion.Slerp(transform.rotation, 
								rotation, Time.deltaTime * smoothRotation);	
		}
}

function Update () {
	move();
}

