// Find all the subsequences of a given string using backtracking
// Solution class to generate all subsequences using recursion
class Solution {
    // Helper recursive method to generate subsequences
    helper(s, index, current, result) {
        // Base case: if index reaches string length, add current subsequence to result
        if (index === s.length) {
            result.push(current.join(''));
            return;
        }

        // Include current character and recurse
        current.push(s[index]);
        this.helper(s, index + 1, current, result);

        // Exclude current character and recurse
        current.pop();
        this.helper(s, index + 1, current, result);

    }

    // Method to return all subsequences of string s
    getSubsequences(s) {
        // Array to store all subsequences
        const result = [];

        // Array to store current subsequence characters
        const current = [];

        // Start recursion from index 0
        this.helper(s, 0, current, result);

        // Return array of subsequences
        return result;
    }
}

// Driver code
const s = "abc";
// Create Solution object
const sol = new Solution();
// Get all subsequences
const subsequences = sol.getSubsequences(s);
// Print all subsequences
subsequences.forEach(subseq => {
    console.log(`"${subseq}"`);
});


// Find the permutations of a given array using backtracking with map ds. Better Solution but not optimal solution.
var permute = function (nums) {
    let ans = [], ds = [];
    let freq = new Map();
    findPermutation(nums, ds, freq, ans);
    return ans;
};

function findPermutation(nums, ds, freq, ans) {

    if (ds.length === nums.length) {
        ans.push([...ds]);
    }

    for (let i = 0; i < nums.length; i++) {
        if (!freq.has(nums[i])) {
            ds.push(nums[i])
            freq.set(nums[i], true);
            findPermutation(nums, ds, freq, ans);
            ds.pop();
            freq.delete(nums[i]);
        }
    }

}

//n-Queens problem using backtracking better approach
class Solution {
    // Function to check if placing queen is safe
    isSafe(row, col, board, n) {
        // Check same row
        for (let j = 0; j < col; j++) {
            if (board[row][j] === 'Q') return false;
        }

        // Check upper-left diagonal
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === 'Q') return false;
        }

        // Check lower-left diagonal
        for (let i = row, j = col; i < n && j >= 0; i++, j--) {
            if (board[i][j] === 'Q') return false;
        }

        // Safe to place
        return true;
    }

    // Backtracking function
    solve(col, board, ans, n) {
        // If all queens placed
        if (col === n) {
            let temp = board.map(row => row.join(""));
            ans.push(temp);
            return;
        }

        // Try placing queen in each row
        for (let row = 0; row < n; row++) {
            if (this.isSafe(row, col, board, n)) {
                // Place queen
                board[row][col] = 'Q';
                // Recurse
                this.solve(col + 1, board, ans, n);
                // Backtrack
                board[row][col] = '.';
            }
        }
    }

    // Main function
    solveNQueens(n) {
        let board = Array.from({ length: n }, () => Array(n).fill('.'));
        let ans = [];
        this.solve(0, board, ans, n);
        return ans;
    }
}

// // Driver code
// const obj = new Solution();

// // Set board size
// const n = 4;

// // Get all solutions
// const res = obj.solveNQueens(n);

// // Print each solution
// res.forEach(board => {
//     board.forEach(row => console.log(row));
//     console.log("");
// });


//n-quuens problem optimal solution using hashing
class Solution {
    // Function to solve N-Queens
    solve(col, board, n, leftRow, lowerDiag, upperDiag, res) {
        // If all queens are placed
        if (col === n) {
            res.push(board.map(row => row.join("")));
            return;
        }

        // Iterate through rows
        for (let row = 0; row < n; row++) {
            // Check safety
            if (!leftRow[row] && !lowerDiag[row + col] && !upperDiag[n - 1 + col - row]) {
                // Place queen
                board[row][col] = 'Q';
                leftRow[row] = lowerDiag[row + col] = upperDiag[n - 1 + col - row] = true;

                // Recurse
                this.solve(col + 1, board, n, leftRow, lowerDiag, upperDiag, res);

                // Backtrack
                board[row][col] = '.';
                leftRow[row] = lowerDiag[row + col] = upperDiag[n - 1 + col - row] = false;
            }
        }
    }

    // Main function
    solveNQueens(n) {
        const board = Array.from({ length: n }, () => Array(n).fill('.'));
        const leftRow = Array(n).fill(false);
        const lowerDiag = Array(2 * n - 1).fill(false);
        const upperDiag = Array(2 * n - 1).fill(false);
        const res = [];
        this.solve(0, board, n, leftRow, lowerDiag, upperDiag, res);
        return res;
    }
}

// Driver code
// const sol = new Solution();
// const result = sol.solveNQueens(4);
// result.forEach(board => {
//     board.forEach(row => console.log(row));
//     console.log('');
// });


// sudoku solver using backtracking
class Solution {
    // Check if placing char c at board[row][col] is valid
    isValid(board, row, col, charc) {
        for (let i = 0; i < 9; i++) {
            if (board[i][col] === charc) return false;
            if (board[row][i] === charc) return false;
            if (board[(3 * Math.floor(row / 3)) + Math.floor(i / 3)][(3 * Math.floor(col / 3)) + (i % 3)] === charc) {
                return false;
            }
        }
        return true;
    }

    // Recursive function to solve Sudoku using backtracking
    solveSudoku(board) {
        // Iterate over each row
        for (let i = 0; i < 9; i++) {
            // Iterate over each column
            for (let j = 0; j < 9; j++) {
                // If the cell is empty
                if (board[i][j] === '.') {
                    // Try all digits from '1' to '9'
                    for (let c = 1; c <= 9; c++) {
                        let charC = c.toString();
                        // Check if placing this digit is valid
                        if (this.isValid(board, i, j, charC)) {
                            // Place digit tentatively
                            board[i][j] = charC;

                            // Recursively solve rest of the board
                            if (this.solveSudoku(board)) {
                                return true; // Found a valid solution
                            }

                            // Backtrack if no solution found
                            board[i][j] = '.';
                        }
                    }
                    // If no digit fits, backtrack to previous cell
                    return false;
                }
            }
        }
        // All cells filled validly
        return true;
    }
}

// Driver code
const board = [
    ['9', '5', '7', '.', '1', '3', '.', '8', '4'],
    ['4', '8', '3', '.', '5', '7', '1', '.', '6'],
    ['.', '1', '2', '.', '4', '9', '5', '3', '7'],
    ['1', '7', '.', '3', '.', '4', '9', '.', '2'],
    ['5', '.', '4', '9', '7', '.', '3', '6', '.'],
    ['3', '.', '9', '5', '.', '8', '7', '.', '1'],
    ['8', '4', '5', '7', '9', '.', '6', '1', '3'],
    ['.', '9', '1', '.', '3', '6', '.', '7', '5'],
    ['7', '.', '6', '1', '8', '5', '4', '.', '9']
];

// const sol = new Solution();
// // Solve the Sudoku puzzle in-place
// sol.solveSudoku(board);

// // Print the solved Sudoku board
// for (let i = 0; i < 9; i++) {
//     console.log(board[i].join(" "));
// }


// M - Coloring Problem using backtracking
// Function to check if it is safe to assign a color to a node
function isSafe(node, color, graph, n, col) {
    for (let k = 0; k < n; k++) {
        // Check if adjacent node has the same color
        if (k !== node && graph[k][node] === 1 && color[k] === col) {
            return false;
        }
    }
    return true;  // Safe to assign the color
}

// Recursive function to solve the coloring problem
function solve(node, color, m, N, graph) {
    // If all nodes are assigned colors, return true
    if (node === N) {
        return true;
    }

    // Try different colors for the node
    for (let i = 1; i <= m; i++) {
        if (isSafe(node, color, graph, N, i)) {
            color[node] = i;
            // Recursively check for the next node
            if (solve(node + 1, color, m, N, graph)) return true;
            color[node] = 0;  // Backtrack if the color assignment fails
        }
    }
    return false;  // If no solution is found
}

// Function to check if graph can be colored with m colors
function graphColoring(graph, m, N) {
    let color = Array(N).fill(0);
    // Start solving from node 0
    if (solve(0, color, m, N, graph)) return true;
    return false;
}

// Main function to handle input and output
function main() {
    let N = 4;  // Number of nodes
    let m = 3;  // Maximum number of colors

    // Create a sample graph with edges (0,1), (1,2), (2,3), (3,0), (0,2)
    let graph = Array.from({ length: 101 }, () => Array(101).fill(false));
    graph[0][1] = graph[1][0] = true;
    graph[1][2] = graph[2][1] = true;
    graph[2][3] = graph[3][2] = true;
    graph[3][0] = graph[0][3] = true;
    graph[0][2] = graph[2][0] = true;

    // Output if the graph can be colored with at most m colors
    console.log(graphColoring(graph, m, N));
}

// Call the main function
main();



// Palindrome Partitioning using backtracking
class Solution {
    // Function to check if substring is a palindrome
    isPalindrome(s, left, right) {
        // Loop while left < right
        while (left < right) {
            // If mismatch, not a palindrome
            if (s[left] !== s[right]) return false;
            // Move inward
            left++;
            right--;
        }
        // All matched
        return true;
    }

    // Backtracking function to generate partitions
    backtrack(index, s, path, res) {
        // If reached end of string, add current path
        if (index === s.length) {
            res.push([...path]);
            return;
        }

        // Try all substrings from index
        for (let i = index; i < s.length; i++) {
            // If current substring is palindrome
            if (this.isPalindrome(s, index, i)) {
                // Add substring to path
                path.push(s.substring(index, i + 1));
                // Recur for next index
                this.backtrack(i + 1, s, path, res);
                // Backtrack
                path.pop();
            }
        }
    }

    // Main function to return all palindrome partitions
    partition(s) {
        const res = [];
        const path = [];
        this.backtrack(0, s, path, res);
        return res;
    }
}

// Driver code
// const sol = new Solution();
// const s = "aab";
// const result = sol.partition(s);
// result.forEach(part => {
//     console.log(part.join(" "));
// });


/* Find the K-th Permutation Sequence using backtracking */
class Solution {
    getPermutation(n, k) {
        let fact = 1;
        let numbers = [];
        
        // Calculate factorial of n-1
        for (let i = 1; i < n; i++) {
            fact *= i;
            numbers.push(i);
        }
        numbers.push(n);  // Add last element (n)
        
        let ans = '';
        k -= 1;  // Convert k to 0-based index
        
        while (numbers.length) {
            ans += numbers[Math.floor(k / fact)];  // Add the digit at the position
            numbers.splice(Math.floor(k / fact), 1);  // Remove that number from the list
            
            if (numbers.length === 0) {
                break;  // Exit when all numbers are used
            }

            k %= fact;  // Reduce k to fit within the remaining sub-permutation
            fact /= numbers.length;  // Update factorial for the remaining numbers
        }
        
        return ans;  // Return the Kth permutation sequence
    }
}

// Driver code
let n = 3, k = 3;
let obj = new Solution();
let ans = obj.getPermutation(n, k);
console.log(`The Kth permutation sequence is ${ans}`);

// using mathematics
class Solution {
    getPermutation(n, k) {
        let fact = 1;
        let numbers = [];
        
        // Calculate factorial of n-1
        for (let i = 1; i < n; i++) {
            fact *= i;
            numbers.push(i);
        }
        numbers.push(n);  // Add last element (n)
        
        let ans = '';
        k -= 1;  // Convert k to 0-based index
        
        while (numbers.length) {
            ans += numbers[Math.floor(k / fact)];  // Add the digit at the position
            numbers.splice(Math.floor(k / fact), 1);  // Remove that number from the list
            
            if (numbers.length === 0) {
                break;  // Exit when all numbers are used
            }

            k %= fact;  // Reduce k to fit within the remaining sub-permutation
            fact /= numbers.length;  // Update factorial for the remaining numbers
        }
        
        return ans;  // Return the Kth permutation sequence
    }
}

// Driver code
// let n = 3, k = 3;
// let obj = new Solution();
// let ans = obj.getPermutation(n, k);
// console.log(`The Kth permutation sequence is ${ans}`);


/* Rat in a Maze Problem using backtracking */
/**
 * @param {number[][]} maze
 * @return {string[]}
 */
 
class Solution {
    ratInMaze(maze) {
        // code here
        const n = maze.length-1;
        let ans = [];
        const di=[1,0,0,-1];
        const dj=[0,-1,1,0];
        const visited = Array.from({ length: n+1 }, () => Array(n+1).fill(0));
        
        if(maze[0][0] == 1) this.solve(0,0,n,maze,"",visited,di,dj,ans) 
        return ans;
    }
    
    solve(i,j,n,maze,path,visited,di,dj,ans){
        
        if(i==n && j==n){
            ans.push(path);
            return;
        }
        
        let str="DLRU";
        for(let ind =0; ind< 4; ind++){
            let nexti = i+di[ind];
            let nextj = j+dj[ind];
            
            if(nexti >=0 && nextj >=0 && nexti <= n && nextj <= n && visited[nexti][nextj] == 0 && maze[nexti][nextj]==1){
                visited[i][j] = 1;
                this.solve(nexti,nextj,n,maze,path+str[ind],visited,di,dj,ans);
                visited[i][j] = 0;
            }
            
        }
        
    }
}
