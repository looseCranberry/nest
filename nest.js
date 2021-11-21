const nest = {
	index: 0,
	children: null,
	cap: function (tag, nth) {
		if (this.len < 1) throw "Nest is empty";
		if (!tag) tag = null;
		else tag = tag.toUpperCase();
		if (!nth) nth = 0;

		let breakout = false;
		let encounter = 0;
		let iterator = this.index;

		while (iterator > 0) {
			this.index--;

			if (this.children[iterator].tagName === tag)
				if (encounter === nth) breakout = true;

			this.children[this.index].appendChild(this.children[iterator]);
			this.children[iterator--] = null;
			if (breakout) break;
		}
	},
	attr: function (keyvalues) {
		for (let x of keyvalues) {
			let str = x.split("=");
			if (str.length > 1)
				this.children[this.index].setAttribute(str[0], str[1]);
			else this.children[this.index].setAttribute(str[0], "");
		}
	},
	pop: function () {
		if (this.len < 1) throw "Nest is empty";
		let root = this.children[0];
		this.cap();
		this.index = 0;
		this.children = null;
		return root;
	},
	push: function (elements) {
		if (!elements) throw "Cannot push empty element";
		else if (!this.children) {
			this.index = 0;
			this.children = [];
		}

		if (elements.indexOf(" ") > 0) {
			elements = elements.split(" ");
			for (let x of elements) this.push(x);
			return;
		} else if (this.children[this.index]) this.index++;

		if (elements.indexOf(".") > 0) {
			elements = elements.split(".");
			if (elements[1].indexOf(",") > 0) elements[1].replace(/,/g, " ");
			this.children[this.index] = document.createElement(elements[0]);
			this.children[this.index].setAttribute("class", elements[1]);
		} else this.children[this.index] = document.createElement(elements);
	},
	get len() {
		return this.children ? this.children.length : 0;
	},
	set text(val) {
		if (this.len < 1) throw "Nest is empty";
		val = (" " + val).substr(1);
		this.children[this.index].innerText = val;
	},
};
