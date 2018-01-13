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
	graph: {
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
			
		var inp1 = fCreateElement("input", {"type": "number", "id": "a", "className": "term"});
		this.a.target = inp1;
		box.appendChild(inp1);this.a.label = t1;
		inp1.addEventListener("input", function() {$self.checkcorrect($self.a)});
		var inp2 = fCreateElement("input", {"type": "number", "id": "b", "className": "term js-vhidden"});
		this.b.target = inp2;
		box.appendChild(inp2);this.b.label = t2;
		inp2.addEventListener("input", function() {$self.checkcorrect($self.b)});
		var scale1 = fCreateElement("div", {"id": "scale"});
		this.graph.target = scale1;
		box.appendChild(scale1);
		var term1 = fCreateElement("div", {"className": "number" + this.a.val});
		scale1.appendChild(term1);
		var summ = fCreateElement("div", {"className": "number" + this.s.val});
		scale1.appendChild(summ);
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
				fRemoveClass(this.b.target, 'js-vhidden');
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
	}
}

document.addEventListener("DOMContentLoaded", function(event) {
	CalcAndDrawPlugin.init(document.getElementById("CalcAndDraw"));
});