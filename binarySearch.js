// Aggressive Cows Problem

// Input: arr[] = [1, 2, 4, 8, 9], k = 3
// Output: 3
// Explanation: The first cow can be placed at arr[0], the second at arr[2], and the third at arr[3]. The minimum distance between any two cows is 3 (between arr[0] and arr[2]), which is the maximum possible among all valid arrangements.

class Solution {
    aggressiveCows(arr, k) {
        arr.sort((a,b)=> a-b);
        let low =1, high = arr[arr.length -1]-arr[0];
        let ans = 0;
        while(low <= high){
            let mid = Math.floor((high+low)/2);
            if(this.canweplacecows(arr,mid,k)){
                ans = mid;
                low = mid+1;
            }
            else
                high = mid-1;
        }
        return ans;  
    }
    
    canweplacecows(arr,dist,cows){
        let cowsCnt =1, lastPos = arr[0];
        for(let i =1;i<arr.length;i++){
            if(arr[i]-lastPos >= dist){
                cowsCnt++;
                lastPos = arr[i];
            }
        }
        return cowsCnt >= cows ? true : false; 
    }   
}


// Book Allocation Problem

// Input: arr[] = [10, 20, 30, 40], k = 2
// Output: 60
// Explanation: The first student can be allocated books with pages [10, 20, 30] and the second student can be allocated the book with pages [40]. The maximum number of pages assigned to a student is 60, which is the minimum possible among all valid arrangements.

class Solution {
    findPages(arr, k) {
        const n = arr.length;
        if(n < k) return -1;
        
        let low = Math.max(...arr), high = this.sumOfArray(arr);
        
        while(low <= high){
            let mid = Math.floor((low+high)/2);
            let noOfStudents = this.countStudents(arr,mid);
            if( noOfStudents > k){
                low = mid+1;
            }
            else{
                high = mid-1
            }
        }
        
        return low;
        
    }
    
    sumOfArray(arr){
        let sum =0;
        for(let i =0; i< arr.length;i++){
            sum += arr[i];
        }
        return sum;
    }
    
    countStudents(arr,pages){
        let student =1, studentPages = 0;
        
        for(let i=0; i< arr.length; i++){
            if(studentPages + arr[i] <= pages){
                studentPages += arr[i];
            }
            else{
                student++;
                studentPages = arr[i];
            }
        }
        
        return student;
    }
}


// Minimise maximum distance between gas stations

// Input: arr[] = [1, 2, 3, 4, 5], k = 2
// Output: 1.00000
// Explanation: We can place the two additional gas stations at positions 1.5 and 3.5. The maximum distance between any two adjacent gas stations is now 1.0 (between positions 2 and 3, or between positions 4 and 5), which is the minimum possible among all valid arrangements.


//Better solution using Priority Queue

// Custom Max Heap class to simulate C++ priority_queue
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  // Insert an element into the heap
  push(value) {
    this.heap.push(value);
    this._heapifyUp();
  }

  // Remove and return the max element (root)
  pop() {
    if (this.heap.length === 0) return null;
    const max = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this._heapifyDown();
    }
    return max;
  }

  // Return the max element without removing
  top() {
    return this.heap[0];
  }

  // Get the number of elements
  size() {
    return this.heap.length;
  }

  // Maintain heap property after insertion
  _heapifyUp() {
    let index = this.heap.length - 1;
    while (
      index > 0 &&
      this.heap[Math.floor((index - 1) / 2)][0] < this.heap[index][0]
    ) {
      const parentIdx = Math.floor((index - 1) / 2);
      [this.heap[parentIdx], this.heap[index]] = [this.heap[index], this.heap[parentIdx]];
      index = parentIdx;
    }
  }

  // Maintain heap property after removal
  _heapifyDown() {
    let index = 0;
    const length = this.heap.length;

    while (true) {
      let left = 2 * index + 1;
      let right = 2 * index + 2;
      let largest = index;

      if (left < length && this.heap[left][0] > this.heap[largest][0]) {
        largest = left;
      }
      if (right < length && this.heap[right][0] > this.heap[largest][0]) {
        largest = right;
      }

      if (largest === index) break;

      [this.heap[index], this.heap[largest]] = [this.heap[largest], this.heap[index]];
      index = largest;
    }
  }
}

// Main class containing the logic to minimize max distance
class GasStationPlacer {
  /**
   * Minimizes the maximum distance between gas stations
   * by placing 'k' additional stations between existing points.
   *
   * @param {number[]} arr - Sorted array of station positions
   * @param {number} k - Number of gas stations to add
   * @returns {number} - Minimum possible maximum distance
   */
  static minimizeMaxDistance(arr, k) {
    const n = arr.length;
    const howMany = new Array(n - 1).fill(0); // Tracks #stations between each pair
    const pq = new MaxHeap();

    // Insert all sections into the priority queue
    for (let i = 0; i < n - 1; i++) {
      const dist = arr[i + 1] - arr[i];
      pq.push([dist, i]); // [section length, index]
    }

    // Place 'k' gas stations
    for (let station = 0; station < k; station++) {
      const [maxDist, idx] = pq.pop(); // Get section with max length
      howMany[idx]++; // Add a station in this section

      // Recalculate the new max section length for this index
      const totalDist = arr[idx + 1] - arr[idx];
      const newLen = totalDist / (howMany[idx] + 1);
      pq.push([newLen, idx]); // Push updated section length
    }

    // Final answer is the largest section length in the heap
    return pq.top()[0];
  }
}

// Example usage
const arr1 = [1, 2, 3, 4, 5];
const k1 = 4;

const result1 = GasStationPlacer.minimizeMaxDistance(arr1, k1);
console.log("The answer is:", result1);


//Optimal Solution using Binary Search
class GasStationOptimizer {
  // Calculates the number of gas stations required for a given max distance
  numberOfGasStationsRequired(dist, arr) {
    let count = 0;
    for (let i = 1; i < arr.length; i++) {
      let numberInBetween = Math.floor((arr[i] - arr[i - 1]) / dist);
      if ((arr[i] - arr[i - 1]) === dist * numberInBetween) {
        numberInBetween--; //Decrement the numberInBetween
      }
      count += numberInBetween;
    }
    return count;  //total number of additional gas stations required
  }

  // Finds the minimum possible maximum distance using binary search
  minimiseMaxDistance(arr, k) {
    let low = 0;
    let high = 0;

    // Find initial upper bound for binary search
    for (let i = 0; i < arr.length - 1; i++) {
      high = Math.max(high, arr[i + 1] - arr[i]);
    }

    const diff = 1e-6;

    // Binary search loop
    while (high - low > diff) {
      const mid = (low + high) / 2.0;
      const count = this.numberOfGasStationsRequired(mid, arr);
      if (count > k) {
        low = mid;
      } else {
        high = mid;
      }
    }

    return high;
  }
}

// Example usage
const arr = [1, 2, 3, 4, 5];
const k = 4;

const optimizer = new GasStationOptimizer();
const result = optimizer.minimiseMaxDistance(arr, k);

console.log("The answer is:", result);