// 创建字典的构造函数
function Dictionary() {
  // 字典属性
  this.items = {}

  // 字典操作方法
  // 在字典中添加键值对
  Dictionary.prototype.set = function (key, value) {
    this.items[key] = value
  }

  // 判断字典中是否有某个key
  Dictionary.prototype.has = function (key) {
    return this.items.hasOwnProperty(key)
  }

  // 从字典中移除元素
  Dictionary.prototype.remove = function (key) {
    // 1.判断字典中是否有这个key
    if (!this.has(key)) return false

    // 2.从字典中删除key
    delete this.items[key]
    return true
  }

  // 根据key去获取value
  Dictionary.prototype.get = function (key) {
    return this.has(key) ? this.items[key] : undefined
  }

  // 获取所有的keys
  Dictionary.prototype.keys = function () {
    return Object.keys(this.items)
  }

  // 获取所有的value
  Dictionary.prototype.values = function () {
    return Object.values(this.items)
  }

  // size方法
  Dictionary.prototype.size = function () {
    return this.keys().length
  }

  // clear方法
  Dictionary.prototype.clear = function () {
    this.items = {}
  }
}

// 自定义队列
function Queue() {
  var items = []

  // 队列操作的方法
  // enter queue方法
  this.enqueue = function (element) {
    items.push(element)
  }

  // delete queue方法
  this.dequeue = function () {
    return items.shift()
  }

  // 查看前端的元素
  this.front = function () {
    return items[0]
  }

  // 查看队列是否为空
  this.isEmpty = function () {
    return items.length == 0
  }

  // 查看队列中元素的个数
  this.size = function () {
    return items.length
  }
}

//封装图结构
function Graph() {
  //属性：顶点(数组)/边(字典)
  this.vertexes = []
  this.adjList = new Dictionary()

  //方法
  //添加顶点
  Graph.prototype.addVertex = function (v) {
    this.vertexes.push(v)
    this.adjList.set(v, [])
  }

  //添加边
  Graph.prototype.addEdge = function (v1, v2) {
    this.adjList.get(v1).push(v2)
    this.adjList.get(v2).push(v1)
  }

  //实现toString方法
  Graph.prototype.toString = function () {
    var resultString = ''

    this.vertexes.forEach(item => {
      resultString += item + '→'
      var vEdges = this.adjList.get(item)
      vEdges.forEach(val => {
        resultString += val + ' '
      })
      resultString += '\n'
    })
    return resultString
  }

  //图的遍历
  //初始化状态颜色
  Graph.prototype.initializeColor = function () {
    var colors = []
    this.vertexes.forEach(item => {
      colors[item] = 'white'
    })
    return colors
  }
  //广度优先搜索 BFS Breadth-First Search
  Graph.prototype.bfs = function (initV, handler) {
    // 1.初始化颜色
    var color = this.initializeColor()

    // 2.创建队列
    var queue = new Queue()

    // 3.将传入的顶点放入队列中
    queue.enqueue(initV)

    // 4.从队列中依次取出和放入数据
    while (!queue.isEmpty()) {
      // 4.1.从队列中取出数据
      var qv = queue.dequeue()

      // 4.2.获取qv相邻的所有顶点
      var qAdj = this.adjList.get(qv)

      // 4.3.将qv的颜色设置成灰色
      color[qv] = "gray"

      // 4.4.将qAdj的所有顶点依次压入队列中
      for (var i = 0; i < qAdj.length; i++) {
        var a = qAdj[i]
        if (color[a] === "white") {
          color[a] = "gray"
          queue.enqueue(a)
        }
      }

      // 4.5.因为qv已经探测完毕, 将qv设置成黑色
      color[qv] = "black"

      // 4.6.处理qv
      if (handler) {
        handler(qv)
      }
    }
  }

  // dfs的递归调用方法
  Graph.prototype.dfsVisit = function (u, color, handler) {
    // 1.将u的颜色设置为灰色
    color[u] = "gray"

    // 2.处理u顶点
    if (handler) {
      handler(u)
    }

    // 3.u的所有邻接顶点的访问
    var uAdj = this.adjList.get(u)
    for (var i = 0; i < uAdj.length; i++) {
      var w = uAdj[i]
      if (color[w] === "white") {
        this.dfsVisit(w, color, handler)
      }
    }

    // 4.将u设置为黑色
    color[u] = "black"
  }

  //深度优先搜索 DFS Depth-First Search
  Graph.prototype.dfs = function (handler) {
    // 1.初始化颜色
    var color = this.initializeColor()

    // 2.遍历所有的顶点, 开始访问
    for (var i = 0; i < this.vertexes.length; i++) {
      if (color[this.vertexes[i]] === "white") {
        this.dfsVisit(this.vertexes[i], color, handler)
      }
    }
  }
}

var graph = new Graph()
var myVertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
//添加顶点
myVertexes.forEach(item => {
  graph.addVertex(item)
})

//添加边
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');
console.log(graph.toString())

var bfsResult = ""
graph.bfs(graph.vertexes[0],function (v) {
  bfsResult += v+ " "
})
console.log('广度优先遍历',bfsResult)

var dfsResult = ""
graph.dfs(function (v) {
  dfsResult += v+ " "
})
console.log('广度优先遍历',dfsResult)

