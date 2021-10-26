function Slider(options) {
    this.defaultOptions = {
        //存放轮播图的容器
        container: document.body,
        //图片列表
        imgList: null,
        //图片切换转动的时间
        time: 3,
        //图片切换的时间
        delayTime: 5,
        dotColor: '#FFF',
        dotActiveColor: 'red',
        dotRadius: 10
    };
    this.timer = null;
    this.index = 0;
    this.imgWrapper = null;
    this.dotList = [];
    this.itemList = [];
    Object.assign(this, this.defaultOptions, options);
}

Slider.prototype.loop = function () {
    this.index++;
    if (this.index > this.imgList.length) {
        this.index = 1;
        this.imgWrapper.style.transition = this.time + 's';
    } else {
        this.imgWrapper.style.transition = this.time + 's';
    }
    this.imgWrapper.style.transform = 'translateX(' + (-this.index * this.width) + 'px)';
}
Slider.prototype.go = function (i) {
    let that = this;
    return function () {
        window.location.href = that.imgList[i].href;
    }
}
Slider.prototype.init = function () {
    if (!this.imgList || !this.imgList.length) {
        console.warn('you need config imgList.');
        return;
    }
    let initStyle = getComputedStyle(this.container, null);
    this.container.style.position = 'relative';
    this.container.style.overflow = 'hidden';
    this.width = initStyle.width.replace('px', '') - 0;
    this.height = initStyle.height.replace('px', '') - 0;
    this.imgWrapper = document.createElement('div');
    this.imgWrapper.style.width = this.width * this.imgList.length + 'px';
    this.imgWrapper.style.height = this.height + 'px';
    for (let i = 0; i < this.imgList.length; i++) {
        let img = this.imgList[i];
        let div = createDom(img);
        div.style.width = this.width + 'px';
        div.style.height = this.height + 'px';
        div.style.left = this.width * i + 'px';
        div.addEventListener('click', this.go(i));
        this.imgWrapper.appendChild(div);
        this.itemList.push(div);
    }
    let div = this.itemList[0].cloneNode(true);
    this.imgWrapper.appendChild(div);
    div.style.left = this.width * this.imgList.length + 'px';
    div.addEventListener('click', this.go(0));
    this.itemList.push(div);
    this.container.appendChild(this.imgWrapper);
    this.createDot();
    this.dotList[0].style.backgroundColor = this.dotActiveColor;
    this.imgWrapper.style.transition = this.time + 's';
    this.imgWrapper.addEventListener('transitionend', function end() {
        if (this.index == this.imgList.length) {
            this.imgWrapper.style.transition = '';
            this.imgWrapper.style.transform = 'translateX(0px)';
        }
        this.dotList.forEach(item => {
            item.style.backgroundColor = this.dotColor;
        })
        this.dotList[this.index == this.imgList.length ? 0 : this.index].style.backgroundColor = 'red';
        clearTimeout(this.timer);
        this.timer = setTimeout(this.loop.bind(this), this.delayTime * 1000)
    }.bind(this));
    let that = this;
    window.addEventListener('load',
        that.animate.bind(that)
    )
}
Slider.prototype.animate = function () {
    this.timer = setTimeout(this.loop.bind(this), this.delayTime * 1000)
}
Slider.prototype.click = function (i) {
    let that = this;
    return function () {
        that.dotList.forEach(item => {
            item.style.backgroundColor = that.dotColor;
        })
        let current = 0;
        if (that.index == that.imgList.length && i == 0) {
            current = 0;
        } else {
            current = i;
        }
        that.dotList[current].style.backgroundColor = that.dotActiveColor;
        that.imgWrapper.style.transition = '';
        that.index = current;
        that.imgWrapper.style.transform = 'translateX(' + (-that.index * that.width) + 'px)';
        clearTimeout(that.timer);
        that.animate();
    }
}

function createDom(img) {
    let div = document.createElement('div');
    let imgDom = new Image();
    imgDom.src = img.url;
    imgDom.style.display = 'block';
    imgDom.style.width = '100%';
    imgDom.style.height = '100%';
    div.style.cssText = 'font-size:0;position:absolute;left:0;top:0'
    div.appendChild(imgDom);
    return div;
}

Slider.prototype.createDot = function () {
    let ul = document.createElement('ul');
    ul.style.cssText = 'position:absolute;bottom:30px;left:50%;z-index:2;transform:translateX(-50%)';
    for (let i = 0; i < this.imgList.length; i++) {
        let li = document.createElement('li');
        li.style.width = this.dotRadius + 'px'
        li.style.height = this.dotRadius + 'px'
        li.style.borderRadius = this.dotRadius + 'px';
        li.style.float = 'left';
        li.style.marginRight = '10px';
        li.style.backgroundColor = this.dotColor;
        li.style.listStyle = 'none';
        li.addEventListener('click', this.click(i))
        ul.appendChild(li);
        this.dotList.push(li);
    }
    this.container.appendChild(ul);
}
