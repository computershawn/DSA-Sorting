/******************************/
// Sorting Algorithms Yay!
/******************************/

const LinkedList = require('./linkedlist')


// LET'S MAKE A TIMER!
let startTime, endTime;

const startTimer = () => {
  startTime = new Date();
};
const endTimer = () => {
  endTime = new Date();
  var timeDiff = endTime - startTime; //in ms
  // get milliseconds 
  var seconds = Math.round(timeDiff);
  console.log(seconds + " milliseconds elapsed");
}

let steps = 0

// ARRAY OF RANDOM VALUES
let arr = []
let count = 10000
for (let i = 0; i < count; i++) {
  arr.push(Math.floor(Math.random() * 100000))
}


/******************************/


// BUBBLE SORT
function swap(array, i, j) {
  // Helper function
  const tmp = array[i];
  array[i] = array[j];
  array[j] = tmp;
};

function bubbleSort(array) {
  let swaps = 0;
  for (let i = 0; i < array.length - 1; i++) {
    if (array[i] > array[i + 1]) {
      swap(array, i, i + 1);
      swaps++;
    }
  }

  if (swaps > 0) {
    return bubbleSort(array);
  }
  endTimer()
  return array;
};


/******************************/


// MERGE SORT
function merge(left, right, array) {
  // Helper function
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      array[outputIndex++] = left[leftIndex++];
    }
    else {
      array[outputIndex++] = right[rightIndex++];
    }
  }

  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }

  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }
  return array;
}

function mergeSort(array) {
  if (array.length <= 1) {
    return array;
  }

  const middle = Math.floor(array.length / 2);
  let left = array.slice(0, middle);
  let right = array.slice(middle, array.length);

  steps++
  if (steps === count - 1) {
    endTimer()
  }
  left = mergeSort(left);
  right = mergeSort(right);
  return merge(left, right, array);
}


/******************************/


//  QUICK SORT
function partition(array, start, end) {
  // Helper function
  const pivot = array[end - 1];
  let j = start;
  for (let i = start; i < end - 1; i++) {
    if (array[i] <= pivot) {
      swap(array, i, j);
      j++;
    }
  }
  swap(array, end - 1, j);
  return j;
};

function quickSort(array, start = 0, end = array.length) {
  if (start >= end) {
    return array;
  }
  steps++
  if (steps === count) {
    endTimer()
  }
  const middle = partition(array, start, end);
  array = quickSort(array, start, middle);
  array = quickSort(array, middle + 1, end);
  return array;
};

const splitLinkedList = (linkedList) => {
  let middle = Math.floor(linkedList.size / 2)
  let left = new LinkedList()
  let right = new LinkedList()

  let currentNode = linkedList.head;
  let idx = 0
  while (currentNode) {
    if(idx < middle) {
      left.insertAtLastPosition(currentNode.data)
    } else {
      right.insertAtLastPosition(currentNode.data)
    }
    currentNode = currentNode.next;
    idx++
  }
  return [left, right]
}

function mergeLinkedList(left, right, linkedList) {
  // Helper function
  let leftIndex = 0;
  let rightIndex = 0;
  let outputIndex = 0;

  // RE-FACTOR THIS TO WORK WITH LINKED LISTS
 
  // let currentNode = linkedList.head;
  // let idx = 0
  // while (currentNode) {
  //   if(idx < middle) {
  //     left.insertAtLastPosition(currentNode.data)
  //   } else {
  //     right.insertAtLastPosition(currentNode.data)
  //   }
  //   currentNode = currentNode.next;
  //   idx++
  // }

  let currentLeft = left.head
  let currentRight = right.head
  while (currentLeft && currentRight) {
    if (currentLeft.value < currentRight.value) {
      linkedList.insertAtLastPosition(currentLeft.value)
    }
    else {
      linkedList.insertAtLastPosition(currentRight.value)
    }
    currentLeft = currentLeft.next
    currentRight = currentRight.next
  }

  // RE-FACTOR THIS TO WORK WITH LINKED LISTS
  for (let i = leftIndex; i < left.length; i++) {
    array[outputIndex++] = left[i];
  }

  // RE-FACTOR THIS TO WORK WITH LINKED LISTS
  for (let i = rightIndex; i < right.length; i++) {
    array[outputIndex++] = right[i];
  }

  return linkedList;
};

const mergeSortLinkedList = (linkedList) => {
  if (linkedList.size <= 1) {
    return linkedList
  }
  let [left, right] = splitLinkedList(linkedList)
  console.log('\nSplitting Linked List')
  linkedList.printListData()
  console.log('----------------------------------------------------------------')
  left.printListData()
  right.printListData()
  console.log('----------------------------------------------------------------\n')
  
  // THIS STUFF DOESN'T WORK YET...
  //left = mergeSortLinkedList(left)
  //right = mergeSortLinkedList(right)
  //return mergeLinkedList(left, right, linkedList);
}



// To test sort algorithms, type 'node dsa-sorting.js X'
// at the command line. Replace X with
//    1 to test Bubble Sort
//    2 to test Merge Sort or
//    3 to test Quick Sort
const main = () => {
  let option = process.argv[2] || 1
  switch (option) {
    case '1':
      console.log(`\nSort ${count} numbers using Bubble Sort:`)
      startTimer()
      bubbleSort(arr)
      break
    case '2':
      console.log(`\nSort ${count} numbers using Merge Sort:`)
      startTimer()
      steps = 0
      mergeSort(arr)
      break
    case '3':
      console.log(`\nSort ${count} numbers using Quick Sort:`)
      startTimer()
      steps = 0
      quickSort(arr)
      break
    case '4':
      let myLinkedList = new LinkedList()
      let allDatData = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2]
      allDatData.forEach(item => myLinkedList.insertAtLastPosition(item))
      mergeSortLinkedList(myLinkedList)
      break
    default:
      console.log(`\nSort ${count} numbers using Bubble Sort:`)
      startTimer()
      bubbleSort(arr)
      break
  }
}
main()


/******************************/