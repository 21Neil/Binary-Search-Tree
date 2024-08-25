function createNode(value) {
  return {
    data: value,
    left: null,
    right: null,
  };
}

function createTree(arr) {
  const root = buildTree(arr);

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
    const q = [root]
    recursion(q);
    function recursion(q) {
      if (q.length === 0) return;
      const curr = q.shift()
      if (curr.left !== null) q.push(curr.left);
      if (curr.right !== null) q.push(curr.right);
      callback(curr.data)
      recursion(q)
    }
  }

  function levelOrderIteration(callback) {
    if (typeof callback !== 'function') throw new Error('callback is require');
    const q = [root];
    while(q.length !== 0) {
      const curr = q.shift()
      if(curr.left !== null) q.push(curr.left)
      if(curr.right !== null) q.push(curr.right)
      callback(curr.data)
    }
  }

  return {
    root,
    insert,
    deleteItem,
    find,
    levelOrderRecursion,
    levelOrderIteration,
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

const test = createTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);
prettyPrint(test.root);
test.insert(100);
test.deleteItem(8);
prettyPrint(test.root);
console.log(test.find(100));
console.log(test.find(101));
test.levelOrderRecursion(x => console.log(x));
test.levelOrderIteration(x => console.log(x))
