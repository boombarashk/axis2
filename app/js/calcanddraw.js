var CalcAndDrawPlugin = {
	a: null,
	b: null,
	graph: null,
	init: function(box){
		var inp1 = document.createElement("input");
		inp1.type = "number";
		inp1.id = "a";
		inp1.className = "term";
		this.a = inp1;
		var inp2 = document.createElement("input");
		inp2.type = "number";
		inp2.id = "b";
		inp2.className = "term";
		this.b = inp2;
		box.appendChild(inp1);
		box.appendChild(inp2);
		var scale1 = document.createElement("div");
		scale1.id = "scale";
		this.graph = scale1;
		box.appendChild(scale1);
		console.log(this);
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	var wrapbox = document.getElementById("CalcAndDraw");
	CalcAndDrawPlugin.init(wrapbox);
});