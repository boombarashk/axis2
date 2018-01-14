function fAddClass(obj, cls) {
  var classes = obj.className ? obj.className.split(' ') : [];
  for (var i = 0; i < classes.length; i++) {
    if (classes[i] == cls) return;
  }
  classes.push(cls);
  obj.className = classes.join(' ');
}
function fRemoveClass(obj, cls) {
  var classes = obj.className.split(' ');
  for (var i = 0; i < classes.length; i++) {
    if (classes[i] == cls) {
      classes.splice(i, 1);
      i--;
    }
  }
  obj.className = classes.join(' ');
}
function fCreateElement(){
	var el = document.createElement(arguments[0]);
	if (arguments.length > 1 && typeof arguments[1] == 'object') {
		for (var param in arguments[1]){
			el[param] = arguments[1][param];
		}
	}
	return el;
}
var CalcAndDrawPlugin = {
	a: {
		min: 6,
		max: 9
		//val
		//target,
		//label
	},
	b: {},
	s: {
		min: 11,
		max: 14
	},
	init: function(box){
		this.setterms();
		var $self = this,
			f = fCreateElement("div", {"id": 'formula'}),
			t1 = fCreateElement('span', {'className': '','innerHTML': this.a.val}),
			t2 = fCreateElement('span', {'innerHTML': this.b.val}),
			result = fCreateElement('input', {"type": "number", 'disabled': true, 'className': 'term metamorphosis', 'placeholder': '?'});

		box.appendChild(f);
		f.appendChild(t1); 
			f .appendChild(document.createTextNode(' + ')); 
		f.appendChild(t2); 
			f .appendChild(document.createTextNode(' = '));
		f.appendChild(result); this.s.target = result;
		result.addEventListener("input", function() {$self.checkcorrect($self.s)});
			
		var scale1 = fCreateElement("div", {"id": "scale"});
		box.appendChild(scale1);
		var term1 = fCreateElement("div", {"className": "number" + this.a.val});
		scale1.appendChild(term1);
		var inp1 = fCreateElement("input", {"type": "number", "id": "a", "className": "term"});
		this.a.target = inp1;
		term1.appendChild(inp1);this.a.label = t1;
		inp1.addEventListener("input", function() {$self.checkcorrect($self.a)});
		this.drawarrow(term1);
		
		var summ = fCreateElement("div", {"className": "number" + this.s.val});
		scale1.appendChild(summ);
		var inp2 = fCreateElement("input", {"type": "number", "id": "b", "className": "term"});
		this.b.target = inp2;
		summ.appendChild(inp2);this.b.label = t2;
		inp2.addEventListener("input", function() {$self.checkcorrect($self.b)});
		this.drawarrow(summ);
		this.a.target.focus();
	},
	setterms: function(){
		this.a.val = this.randomize(this.a.min, this.a.max);
		this.s.val = this.randomize(this.s.min, this.s.max);
		this.b.val = this.s.val - this.a.val;
	},
	randomize: function(min, max){
		return Math.round(min - 0.5 + Math.random() * (max - min + 1))
	},
	checkcorrect: function(ref) {
		var subj = ref.target;
		if (+subj.value == ref.val) { 
			fRemoveClass(subj, 'error');
			if (typeof ref.label != 'undefined') fRemoveClass(ref.label, 'error');
			fAddClass(subj, 'metamorphosis');
			subj.disabled = true;
			if (ref == this.a) {
				fRemoveClass(this.b.target.parentNode, 'js-vhidden');
				this.b.target.focus();
			} else {
				if (ref == this.b) {
					fRemoveClass(this.s.target, 'metamorphosis');
					this.s.target.disabled = null;
					this.s.target.placeholder = '';
					this.s.target.focus();
				} else {
					alert('Congratulations!');
				}
			}
		} else { 
			fAddClass(subj, 'error');
			if (typeof ref.label != 'undefined') fAddClass(ref.label, 'error');
		}
	},
	drawarrow: function(box){
		var id = box.className.substr(6),
			cssw = {
				'6': 235,
				'7': 274,
				'8': 313,
				'9': 352,
				'11': 430,
				'12': 469,
				'13': 508,
				'14': 547
			};
		var w = cssw[id] ;//box.offsetWidth;
		if (box.previousSibling !== null) { w -= cssw[box.parentNode.childNodes[0].className.substr(6)]; /*box.parentNode.childNodes[0].offsetWidth; */}
		var h = Math.round(w / 2);
		//if (svg detect) - modernizr
		box.style.marginTop = "-"+Math.round(h/2 - 26)+"px";
		var w05 = Math.round(w/2),
			h05 = Math.round(h/2),
			svg = SVG.createElement('svg', {'width': w, 'height':h, 'class':'halfclip'}),
			el = SVG.createElement('ellipse', {'rx': w05, 'ry': h05,'cx': w05, 'cy':h05, 'strock':'#da2f59', 'strock-width':2});
			arr = SVG.createElement('polygon', {'points': [(w-8)+','+(h05 -13), (w-2)+','+(h05-7), w+','+(h05-16)].join(' '), "fill":'#da2f59'});
		box.appendChild(svg);
		svg.appendChild(el); svg.appendChild(arr);
		if (box.previousSibling !== null) {
			var shiftval = cssw[box.parentNode.childNodes[0].className.substr(6)]//box.parentNode.childNodes[0].offsetWidth;
			svg.style.marginLeft = shiftval + "px";
			box.childNodes[0].style.marginLeft = shiftval + Math.round(w/2 - 10) + "px";
			fAddClass(box,'js-vhidden');
		}
	}
}
	var SVG = {
		svgns: 'http://www.w3.org/2000/svg',
		xlink: 'http://www.w3.org/1999/xlink',
		createElement: function(name, attrs){
			var element = document.createElementNS(SVG.svgns, name);
			
			if(attrs) {
				SVG.setAttr(element, attrs);
			}
			return element;
		},
		setAttr: function(element, attrs) {
			//if (attr.href){ element.setAttributeNS(SVG.xlink,'href',attr.href); delete attr.href;}
			for(var i in attrs) {
				element.setAttribute(i, attrs[i]);
			}
			return element;
		}
	}

document.addEventListener("DOMContentLoaded", function(event) {
	CalcAndDrawPlugin.init(document.getElementById("CalcAndDraw"));
});