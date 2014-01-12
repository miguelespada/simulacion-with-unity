#pragma strict

var fileName: String;
var lineRenderer: LineRenderer;
public var vertices = Array();

function Start () {
 var sr = new StreamReader(fileName);
 var fileContents = sr.ReadToEnd();
 sr.Close();
 var lines = fileContents.Split("\n"[0]);
 lineRenderer = GetComponent(LineRenderer);
 lineRenderer.SetVertexCount(lines.length - 1);
 var n = 0;
 var pV : Vector3;
 for (line in lines) {
 		var tokens = line.Split(" "[0]);
 		if(tokens.length != 3) 
 			continue;
 		//pV = Vector3(-parseFloat(tokens[2]),  parseFloat(tokens[0]), -parseFloat(tokens[1]));
 		pV = Vector3(-parseFloat(tokens[1]), parseFloat(tokens[2]), -parseFloat(tokens[0]));

		lineRenderer.SetPosition(n, pV);
		vertices.push(pV);
  		n += 1;
  }
 
}
