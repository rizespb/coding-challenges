class CNode {
  constructor(value, left = null, right = null) {
    this.value = value
    this.left = left
    this.right = right
  }
}

// function solution(root) {
//   const stack = [root]

//   while (stack.length) {
//     const current = stack.pop()
//     const left = current.left
//     const right = current.right

//     if (left !== null) {
//       if (left.value >= current.value) {
//         return 'False'
//       } else {
//         stack.push(left)
//       }
//     }

//     if (right !== null) {
//       if (right.value <= current.value) {
//         return 'False'
//       } else {
//         stack.push(right)
//       }
//     }
//   }

//   return 'True'
// }

function solution(root) {
  const isValidBST = (root, min = null, max = null) => {
    if (!root) return true

    if (min && root.value <= min.value) return false
    if (max && root.value >= max.value) return false

    return isValidBST(root.left, min, root) && isValidBST(root.right, root, max)
  }

  return isValidBST(root) ? 'True' : 'False'
}

const left = new CNode(5)
const right = new CNode(3)

const root = {
  value: 2,
  left,
  right,
}

console.log(solution(root))
