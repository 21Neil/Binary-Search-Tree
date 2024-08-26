# Binary Search Tree

使用 JavaScript 製作的 Balance binary search tree，可以插入、刪除、搜尋和遍歷。實作中還包含了檢查樹是否平衡及在必要時進行重新平衡的功能。

## 使用方法

### `createTree(arr)`

從一個排序數組 `arr` 建立一個新的 BST。

- **參數**： 
  - `arr` (數組): 用來初始化 BST 的數組。
- **返回**：一個包含以下方法的物件：

  - **`insert(value)`**：向樹中插入一個值。
  - **`deleteItem(value)`**：從樹中刪除一個值。
  - **`find(value)`**：在樹中查找一個值。
  - **`levelOrderRecursion(callback)`**：使用遞歸進行層序遍歷。
  - **`levelOrderIteration(callback)`**：使用迭代進行層序遍歷。
  - **`inOrder(callback)`**：進行中序遍歷。
  - **`preOrder(callback)`**：進行先序遍歷。
  - **`postOrder(callback)`**：進行後序遍歷。
  - **`height(node)`**：返回樹或特定節點的高度。
  - **`depth(node)`**：返回特定節點的深度。
  - **`isBalance()`**：檢查樹是否平衡。
  - **`reBalance()`**：在必要時重新平衡樹。

### `prettyPrint(node, prefix = '', isLeft = true)`

以可視化的方式打印樹的結構。

- **參數**： 
  - `node` (物件): 要打印的樹的根節點。
  - `prefix` (字串，可選): 樹結構可視化的前綴。
  - `isLeft` (布林值，可選): 指示節點是否為左子節點。
- **返回**：`void`

## 使用示例

以下是如何使用 BST 實作的簡單示例：

```javascript
import { createTree, prettyPrint } from './path/to/your/module';

// 建立一棵樹
const bst = createTree([10, 5, 20, 3, 7, 15, 25]);

// 插入值
bst.insert(8);
bst.insert(18);

// 查找一個值
const node = bst.find(15);
console.log(node); // { data: 15, left: null, right: null }

// 刪除一個值
bst.deleteItem(10);

// 檢查是否平衡
const isBalanced = bst.isBalance();
console.log(`樹是否平衡: ${isBalanced}`);

// 在需要時重新平衡樹
bst.reBalance();

// 打印樹的結構
prettyPrint(bst.root);
```

## Demo
使用 test.js 的demo畫面

![create tree](/demo/createTree.png)
![level order](/demo/levelOrder.png)
![in order and pre order](/demo/inOrder_preOrder.png)
![post order](/demo/postOrder.png)
![insert](/demo/insert.png)
![check_balance](/demo/check_balance.png)
![delete](/demo/delete.png)
