function createNode(value) {
  return {
    data: value,
    left: null,
    right: null,
  };
}

function createTree(arr) {
  let root = buildTree(arr);

  function sortArr(arr) {
    const noDuplicates = [...new Set(arr)];
    const sortedArr = noDuplicates.sort((a, b) => a - b);
    return sortedArr;
  }

  function buildTree(arr) {
    const sortedArr = sortArr(arr);
    const length = sortedArr.length;
    const root = arrToBST(sortedArr, 0, length - 1);

    function arrToBST(arr, start, end) {
      if (start > end) return null;

      const length = start + end;
      const mid = Math.floor(length / 2);
      const node = createNode(arr[mid]);

      node.left = arrToBST(arr, start, mid - 1);
      node.right = arrToBST(arr, mid + 1, end);

      return node;
    }

    return root;
  }

  function insert(value) {
    insertNode(root, value);
    function insertNode(node, value) {
      if (node === null) return createNode(value);
      if (value > node.data) node.right = insertNode(node.right, value);
      if (value < node.data) node.left = insertNode(node.left, value);
      return node;
    }
  }

  function deleteItem(value) {
    deleteNode(root, value);
    function deleteNode(root, value) {
      if (root === null) return root;
      if (value > root.data) root.right = deleteNode(root.right, value);
      if (value < root.data) root.left = deleteNode(root.left, value);
      if (value === root.data) {
        if (root.left === null) return root.right;
        if (root.right === null) return root.left;
        if (root.right !== null && root.left !== null) {
          const succ = getSuccessor(root);
          root.data = succ.data;
          root.right = deleteNode(root.right, succ.data);
        }
      }
      return root;
    }

    function getSuccessor(root) {
      let succ = root.right;
      while (succ.left !== null) {
        succ = succ.left;
      }
      return succ;
    }
  }

  function find(value) {
    const target = findNode(root, value);
    function findNode(node, value) {
      if (node === null) return;
      if (value > node.data) return findNode(node.right, value);
      if (value < node.data) return findNode(node.left, value);
      if (value === node.data) return node;
      return;
    }
    return target;
  }

  function levelOrderRecursion(callback) {
    if (typeof callback !== 'function') throw new Error('callback is require');
    const q = [root];
    recursion(q);
    function recursion(q) {
      if (q.length === 0) return;
      const curr = q.shift();
      if (curr.left !== null) q.push(curr.left);
      if (curr.right !== null) q.push(curr.right);
      callback(curr.data);
      recursion(q);
      return;
    }
    return;
  }

  function levelOrderIteration(callback) {
    if (typeof callback !== 'function') throw new Error('callback is require');
    const q = [root];
    while (q.length !== 0) {
      const curr = q.shift();
      if (curr.left !== null) q.push(curr.left);
      if (curr.right !== null) q.push(curr.right);
      callback(curr.data);
    }
    return;
  }

  function inOrder(callback) {
    if (typeof callback !== 'function') throw new Error('callback is require');
    recursion(root);
    function recursion(node) {
      if (node.left !== null) recursion(node.left);
      callback(node.data);
      if (node.right !== null) recursion(node.right);
      return;
    }
  }

  function preOrder(callback) {
    if (typeof callback !== 'function') throw new Error('callback is require');
    recursion(root);
    function recursion(node) {
      callback(node.data);
      if (node.left !== null) recursion(node.left);
      if (node.right !== null) recursion(node.right);
      return;
    }
  }

  function postOrder(callback) {
    if (typeof callback !== 'function') throw new Error('callback is require');
    recursion(root);
    function recursion(node) {
      if (node.left !== null) recursion(node.left);
      if (node.right !== null) recursion(node.right);
      callback(node.data);
      return;
    }
  }

  function height(node) {
    if (node === null) return 0;
    let length = 1;
    let temp = 1;
    recursion(node);
    function recursion(node) {
      if (temp > length) length = temp;
      if (node.left !== null) {
        temp++;
        recursion(node.left);
        temp--;
      }
      if (node.right !== null) {
        temp++;
        recursion(node.right);
        temp--;
      }
      return;
    }
    return length;
  }

  function depth(node) {
    if (node === null) return 0;
    let depth = 1;
    let temp = 1;
    recursion(root);
    function recursion(root) {
      if (root.data === node.data) {
        depth = temp;
        return;
      }
      if (root.left !== null) {
        temp++;
        recursion(root.left);
        temp--;
      }
      if (root.right !== null) {
        temp++;
        recursion(root.right);
        temp--;
      }
    }
    return depth;
  }

  function isBalance() {
    let isBalance = true;
    recursion(root);
    function recursion(node) {
      if (node === null) return;
      let leftHeight = height(node.left);
      let rightHeight = height(node.right);

      if (Math.abs(leftHeight - rightHeight) > 1) {
        isBalance = false;
        return;
      }

      recursion(node.left);
      recursion(node.right);
      return;
    }

    return isBalance;
  }

  function reBalance() {
    if (isBalance()) return console.log('Tree is already Balance');
    const arr = [];
    inOrder(data => arr.push(data));
    const newRoot = buildTree(arr);
    root.data = newRoot.data;
    root.right = newRoot.right;
    root.left = newRoot.left;
    return;
  }

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrderRecursion,
    levelOrderIteration,
    inOrder,
    preOrder,
    postOrder,
    height,
    depth,
    isBalance,
    reBalance,
  };
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

export { createTree, prettyPrint };
