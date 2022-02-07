class Node {
    constructor(x, y, r, left, right, nb, d, col, clickable) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.left = left;
        this.right = right;
        this.nb = nb;
        this.d = d;
        this.col = col;
        this.clickable = clickable;
    }
    show() {
        push();
        noStroke();
        fill(this.col);
        circle(this.x, this.y, this.r);
        pop();
        fill(0);
        line(this.x, this.y - this.r / 2, this.x, this.y + this.r / 2);
        const p = this.r * 0.22;
        let d = (this.r - p) / this.left.length;
        textSize(20);
        for (let i = 0; i < this.left.length; i++) {
            text(this.left[i], this.x - p, this.y - this.r / 2 + (i + 1) * p);
        }
        for (let i = 0; i < this.right.length; i++) {
            text(this.right[i], this.x + p * 0.7, this.y - this.r / 2 + (i + 1) * p);
        }
    }

    generateNextKid(num) {
        const arr = this.generateOptions();
        const edgel = 100;
        //const n = widths
        if (this.nb > 0) {
            this.nb--;
            return new Node(num * 150 + this.r,
                ((this.d == 1) ? 2.5 : 2) * this.d * this.r,
                this.r, arr[arr.length - this.nb - 1][0], arr[arr.length - this.nb - 1][1],
                (arr[arr.length - this.nb - 1][0].includes('F')) ? arr[arr.length - this.nb - 1][0].length : arr[arr.length - this.nb - 1][1].length,
                this.d + 1, color(0, 0, 255),
                true);
        } else {
            return null;
        }
    }
    generateOptions() {
        let opts = [];
        if (this.left.includes('F')) {
            for (let i = 0; i < this.left.length; i++) {
                if (this.left[i] == 'F') {
                    opts.push([this.left.replace('F', ''), 'F' + this.right]);
                } else if (this.left[i] == 'L') {
                    opts.push([this.left.replace('L', '').replace('F', ''), 'FL' + this.right]);
                } else if (this.left[i] == 'C') {
                    opts.push([this.left.replace('C', '').replace('F', ''), 'FC' + this.right]);
                } else if (this.left[i] == 'S') {
                    opts.push([this.left.replace('S', '').replace('F', ''), 'FS' + this.right]);
                }
            }
        } else {
            for (let i = 0; i < this.right.length; i++) {
                if (this.right[i] == 'F') {
                    opts.push(['F' + this.left, this.right.replace('F', '')]);
                } else if (this.right[i] == 'L') {
                    opts.push(['FL' + this.left, this.right.replace('L', '').replace('F', '')]);
                } else if (this.right[i] == 'C') {
                    opts.push(['FC' + this.left, this.right.replace('C', '').replace('F', '')]);
                } else if (this.right[i] == 'S') {
                    opts.push(['FS' + this.left, this.right.replace('S', '').replace('F', '')]);
                }
            }
        }
        return opts;
    }

}