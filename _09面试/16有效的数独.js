/**
 * @param {character[][]} board
 * @return {boolean}
 */
var isValidSudoku = function (board) {
    let rows = []
    let columns = []
    let boxes = []
    for (let i = 0; i < 9; i++) {
        rows.push({})
        columns.push({})
        boxes.push({})
    }
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3)
            if (board[i][j] !== '.') {
                if (rows[i].hasOwnProperty(board[i][j]) ||
                    columns[j].hasOwnProperty(board[i][j]) ||
                    boxes[boxIndex].hasOwnProperty(board[i][j])) {
                    return false
                }
                rows[i][board[i][j]] = 1
                columns[j][board[i][j]] = 1
                boxes[boxIndex][board[i][j]] = 1
            }
        }
    }
    return true
};

let item = [["5", "3", ".", ".", "7", ".", ".", ".", "."], ["6", ".", ".", "1", "9", "5", ".", ".", "."], [".", "9", "8", ".", ".", ".", ".", "6", "."], ["8", ".", ".", ".", "6", ".", ".", ".", "3"], ["4", ".", ".", "8", ".", "3", ".", ".", "1"], ["7", ".", ".", ".", "2", ".", ".", ".", "6"], [".", "6", ".", ".", ".", ".", "2", "8", "."], [".", ".", ".", "4", "1", "9", ".", ".", "5"], [".", ".", ".", ".", "8", ".", ".", "7", "9"]]
console.log(isValidSudoku(item));
