let nodes = [];
let edgess = [];
let d = 100;
let actors = "fermier => F" + "\n" + "loup => L" + "\n" + "chevre => C" + "\n" + "salade => S"
let kid;
let arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let arr2 = [];
let target = [];
function togglePopup() {
	document.getElementById('popup-1').classList.toggle("active");
}
function setup() {
	createCanvas(windowWidth, 3 * windowHeight);
	background(100);
	textSize(25);
	text(actors, width - 170, 40);
	nodes.push(new Node(width / 2, d, d, "FLCS", "", 4, 1, color(0, 0, 255), true));
	arr2.push([nodes[0].left.split("").sort().join(""), nodes[0].right.split("").sort().join(""), nodes[0].d]);
}
function valid(col) {
	return ((col.levels[0] == 255 && col.levels[1] == 0 && col.levels[2] == 0) ||
		(col.levels[0] == 0 && col.levels[1] == 255 && col.levels[2] == 0));
}
function validNode(node) {
	if (node == null) {
		return color(0, 0, 255);
	}
	if (node.left.includes('F')) {
		if ((node.right.includes('C') && node.right.includes('S')) ||
			(node.right.includes('L') && node.right.includes('C'))) {
			return color(0, 255, 0);
		}
	} else {
		if ((node.left.includes('C') && node.left.includes('S')) ||
			(node.left.includes('L') && node.left.includes('C'))) {
			return color(0, 255, 0);
		}
	}
	let a = node.left.split("").sort().join("");
	let b = node.right.split("").sort().join("");
	for (let i = 0; i < arr2.length; i++) {
		if (arr2[i][0] == a && arr2[i][1] == b && node.d > arr2[i][2]) {
			return color(255, 0, 0);
		}
	}
	return color(0, 0, 255);
}
function targetEdges() {
	let arr10 = [];
	for (let i = 0; i < target.length; i++) {
		let arr11 = [];
		let x = target[i][0];
		let y = target[i][1];
		for (let j = edgess.length - 1; j >= 0; j--) {
			if (edgess[j][2] == x && edgess[j][3] == y) {
				arr11.push(edgess[j][0]);
				arr11.push(edgess[j][1]);
				arr11.push(edgess[j][2]);
				arr11.push(edgess[j][3]);
				x = edgess[j][0];
				y = edgess[j][1] - d;
			}
		}
		arr10.push(arr11);
	}
	return arr10;
}
function drawEdges() {
	edgess.forEach((ele) => {
		line(ele[0], ele[1], ele[2], ele[3]);
	});
	targetEdges().forEach((elem) => {
		push();
		stroke(115, 61, 223);
		strokeWeight(5);
		for (let i = 0; i < elem.length; i += 4) {
			line(elem[i], elem[i + 1], elem[i + 2], elem[i + 3]);
		}
		pop();
	});
}
function mousePressed() {
	let edges = [];
	nodes.forEach((ele) => {
		if (dist(mouseX, mouseY, ele.x, ele.y) < ele.r / 2 && ele.clickable) {
			let temp = [];
			edges.push([ele.x, ele.y]);
			kid = ele.generateNextKid(arr[ele.d]);
			while (kid != null) {
				edges.push([kid.x, kid.y]);
				arr[ele.d]++;
				kid.col = validNode(kid);
				if (valid(kid.col)) {
					kid.clickable = false;
				}
				if (kid.right.split("").sort().join("") == "CFLS") {
					kid.clickable = false;
					target.push([kid.x, kid.y - d / 2]);
				}
				temp.push([kid.left.split("").sort().join(""), kid.right.split("").sort().join(""), kid.d]);
				nodes.push(kid);
				kid = ele.generateNextKid(arr[ele.d]);
			}
			temp.forEach((elem) => {
				arr2.push(elem);
			});
		}
	});
	if (edges.length > 0) {
		let x = edges[0][0];
		let y = edges[0][1];
		for (let i = 1; i < edges.length; i++) {
			edgess.push([x, y + d / 2, edges[i][0], edges[i][1] - d / 2]);
		}
	}
}
function draw() {
	cursor('auto');
	nodes.forEach((ele) => {
		ele.show();
		if (dist(mouseX, mouseY, ele.x, ele.y) < ele.r / 2) {
			cursor('pointer');
		}
	});
	drawEdges();
	fill(255, 0, 0);
	rect(10, 10, 25, 25);
	text("visited", 45, 35);
	fill(0, 255, 0);
	rect(10, 45, 25, 25);
	text("🐺🍴🐐 or 🐐🍴🥗", 45, 65);
}
