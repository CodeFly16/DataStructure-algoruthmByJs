function BinarySearchTree() {
  function Node(key) {
    this.key = key
    this.left = null
    this.right = null
  }

  //属性
  this.root = null

  //方法
  //插入操作
  BinarySearchTree.prototype.insert = function (key) {
    //根据key创建节点
    var newNode = new Node(key)

    //判断根节点是否为null
    if (this.root === null) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }

  }
  //递归插入
  BinarySearchTree.prototype.insertNode = function (node, newNode) {
    if (node.key > newNode.key) {//向左查找
      if (node.left === null) {
        node.left = newNode
      } else {
        this.insertNode(node.left, newNode)
      }
    } else {
      if (node.right === null) {//向右查找
        node.right = newNode
      } else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  //树的遍历
  //先序遍历
  BinarySearchTree.prototype.preOrderTraversal = function (handler) {
    this.preOrderTraversalNode(this.root, handler)
  }
  //递归先序
  BinarySearchTree.prototype.preOrderTraversalNode = function (node, handler) {
    if (node !== null) {
      handler(node.key)
      this.preOrderTraversalNode(node.left, handler)
      this.preOrderTraversalNode(node.right, handler)
    }
  }

  //中序遍历
  BinarySearchTree.prototype.midOrderTraversal = function (handler) {
    this.midOrderTraversalNode(this.root, handler)
  }
  //递归中序
  BinarySearchTree.prototype.midOrderTraversalNode = function (node, handler) {
    if (node !== null) {
      this.midOrderTraversalNode(node.left, handler)
      handler(node.key)
      this.midOrderTraversalNode(node.right, handler)
    }
  }

  //后序遍历
  BinarySearchTree.prototype.postOrderTraversal = function (handler) {
    this.postOrderTraversalNode(this.root, handler)
  }
  //递归后序
  BinarySearchTree.prototype.postOrderTraversalNode = function (node, handler) {
    if (node !== null) {
      this.postOrderTraversalNode(node.left, handler)
      this.postOrderTraversalNode(node.right, handler)
      handler(node.key)
    }
  }

  //搜索最大值
  BinarySearchTree.prototype.max = function () {
    //获取根节点
    var node = this.root
    //依次向右查找
    while (node.right !== null) {
      node = node.right
    }
    return node.key
  }
  //搜索最小值
  BinarySearchTree.prototype.min = function () {
    //获取根节点
    var node = this.root
    //依次向左查找
    while (node.left !== null) {
      node = node.left
    }
    return node.key
  }

  //搜索某一个key
  BinarySearchTree.prototype.search = function (key) {
    //设置根节点
    var node = this.root
    while (node !== null) {
      if (node.key > key) {
        if (node.left !== null) {
          node = node.left
        } else {
          return false
        }
      }
      if (node.key < key) {
        if (node.left !== null) {
          node = node.right
        } else {
          return false
        }
      }
      if (node.key === key) {
        return true
      }
    }
    return false
  }

  //删除操作,较复杂
  BinarySearchTree.prototype.remove = function (key) {

    //当前节点
    var current = this.root
    //当前节点父节点
    var parent = null
    //是否是左节点
    var isLeftChild = true

    //寻找要删除的节点
    while (current.key !== key) {
      if (current.key > key) {
        parent = current
        isLeftChild = true
        current = current.left
      } else {
        parent = current
        isLeftChild = false
        current = current.right
      }
      if (current === null) return false
    }

    //所需删除节点的几种情况
    //1.没有子节点
    if (current.left === null && current.right === null) {
      if (current === this.root) {
        this.root = null
      } else if (isLeftChild) {
        parent.left = null
      } else {
        parent.right = null
      }


    }
    //2.有一个子节点
    if (current.left === null || current.right === null) {
      //该节点为左节点
      if (current.left !== null) {
        if (current === this.root) {
          this.root = this.root.left
        } else {
          if (isLeftChild) {
            parent.left = current.left
          } else {
            parent.right = current.left
          }
        }

      }
      //该节点为右节点
      if (current.right !== null) {
        if (current === this.root) {
          this.root = this.root.right
        } else {
          if (isLeftChild) {
            parent.left = current.right
          } else {
            parent.right = current.right
          }
        }

      }
    }
    //3.有两个子节点
    if (current.left !== null && current.right !== null) {
      // 1.获取后继节点
      var successor = this.getSuccessor(current)

      // 2.判断是否是根节点
      if (current === this.root) {
        this.root = successor
      } else if (isLeftChild) {
        parent.left = successor
      } else {
        parent.right = successor
      }

      // 3.将删除节点的左子树赋值给successor
      successor.left = current.left
    }
    return true
  }
  // 找后继的方法
  BinarySearchTree.prototype.getSuccessor = function (delNode) {
    // 1.使用变量保存临时的节点
    var successorParent = delNode
    var successor = delNode
    var current = delNode.right // 要从右子树开始找

    // 2.寻找节点
    while (current != null) {
      successorParent = successor
      successor = current
      current = current.left
    }

    // 3.如果是删除图中15的情况, 还需要如下代码
    if (successor != delNode.right) {
      successorParent.left = successorParent.right
      successor.right = delNode.right
    }
  }
}

var bst = new BinarySearchTree()
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)

var preResult = ""
bst.preOrderTraversal(item => {
  preResult += item + " "
})
console.log('前序遍历', preResult)

var midResult = ""
bst.midOrderTraversal(item => {
  midResult += item + " "
})
console.log("中序遍历", midResult)

var nexResult = ""
bst.postOrderTraversal(item => {
  nexResult += item + " "
})
console.log("后序遍历", nexResult)

console.log('最大值', bst.max())
console.log('最小值', bst.min())

console.log('搜索key值：3', bst.search(3))
console.log('搜索key值：25', bst.search(25))
console.log('搜索key值：26', bst.search(26))

console.log('删除节点',bst.remove(10))
console.log('删除节点',bst.remove(18))

var midResult = ""
bst.midOrderTraversal(item => {
  midResult += item + " "
})
console.log("中序遍历", midResult)


