function createNode(value) {
  return ({
    data: value,
    left: null,
    right: null,
  })
}

function createTree(arr) {
  const root = buildTree(arr)

  function sortArr(arr) {
    const noDuplicates = [...new Set(arr)]
    const sortedArr = noDuplicates.sort()
    return sortedArr
  }

  function buildTree(arr) {
    const sortedArr = sortArr(arr)
    const length = sortedArr.length
    const root = arrToBST(arr, 0, length - 1)

    function arrToBST(arr, start, end) {
      if(start > end) return null

      const length = start + end
      const mid = Math.floor(length / 2)
      const node = createNode(arr[mid])
      
      node.left = arrToBST(arr, start, mid - 1)
      node.right = arrToBST(arr, mid + 1, end)

      return node
    }

    return root
  }


  return root
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const test = createTree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])

prettyPrint(test)