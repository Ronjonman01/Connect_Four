/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

 let WIDTH = 7;
 let HEIGHT = 6;
 
 let currPlayer = 1; // active player: 1 or 2
 let board = []; // array of rows, each row is array of cells  (board[y][x])
 


 /** makeBoard: create in-JS board structure:
  *    board = array of rows, each row is array of cells  (board[y][x])
  */
 function makeBoard() {
   // TODO: set "board" HEIGHT x WIDTH matrix array containing 0's
   for(y=0;y<HEIGHT;y++){
     board[y]=[]
   }
   for(x=0;x<WIDTH;x++){
     for(y=0;y<HEIGHT;y++){
       board[y][x]=0
     }
 
   }
 }
 
 /** makeHtmlBoard: make HTML table and row of column tops. */
 
 function makeHtmlBoard() {
   // TODO: get "htmlBoard" variable from the item in HTML w/ID of "board"
   const htmlBoard = document.querySelector('#board')
 
 
   // TODO: Creates "top" variable and uses it to create the top row of the board. Click events on this row will place tokens in board.
   const top = document.createElement("tr");
   top.setAttribute("id", "column-top");
   top.addEventListener("click", handleClick);
 
   // TODO: Puts each cell in the "top" row. Each cell's id will be set to the column it is associated with.
   for (x = 0; x < WIDTH; x++) {
     const headCell = document.createElement("td");
     headCell.setAttribute("id", x);
     top.append(headCell);
   }
   //Adds Top row to table
   htmlBoard.append(top);
 
   // TODO: Creates each row, adds cells to each row (given an id of their x-y coordinates), adds each row to the table.
   for (y = 0; y < HEIGHT; y++) {
     const row = document.createElement("tr");
     for (x = 0; x < WIDTH; x++) {
       const cell = document.createElement("td");
       cell.setAttribute("id", `${y}-${x}`);
       row.append(cell);
     }
     htmlBoard.append(row);
   }
 }
 
 /** findSpotForCol: given column x, return top empty y (null if filled) */
 function findSpotForCol(x) {
   // TODO: Checks every row in the given column (x), searching for a nonzero entry. Once it has found a nonzero entry. It returns the y value of the row above. If the entire column is zero, it returns the y value of the bottom row.
   let emptyColumn = true
   for(i=0;i<=5;i++){
     if(board[i][x]!=0){
       emptyColumn = false
       return i-1
     }
   }
   if (emptyColumn===true) {
     return 5
   }
 }
 
 /** placeInTable: update DOM to place piece into HTML table of board */
 function placeInTable(y, x) {
   // TODO: make a div and insert into correct table cell
   const piece = document.createElement("div")
   piece.classList.add("piece")
   piece.classList.add('player'+`${currPlayer}`)
   const destination = document.getElementById(`${y}-${x}`)
   destination.appendChild(piece)
 }
 
 /** endGame: announce game end */
 
 function endGame(msg) {
   alert(msg)
 }
 
 /** handleClick: handle click of column top to play piece */
 
 function handleClick(evt) {
   // get x from ID of clicked cell
   const x = +evt.target.id;
 
   // get next spot in column (if none, ignore click)
   const y = findSpotForCol(x);
   if (y === -1) {
     throw alert("That column is full, try another.")
   }

   //Updates the board array
   board[y][x]=currPlayer

   // place piece in board and add to HTML table
   // TODO: add line to update in-memory board
   placeInTable(y, x);
 
   // check for win
   if (checkForWin()) {
     return endGame(`Player ${currPlayer} won!`);
   }
 
   // check for tie
   // TODO: check if all cells in board are filled; if so call, call endGame
   if (checkForFullBoard()) {
     return endGame('Sorry, the game has ended without a winner. Refresh to play again.')
   }
   // switch players
   // TODO: switch currPlayer 1 <-> 2
   switch(currPlayer){
     case 1:currPlayer=2
     break
     case 2:currPlayer=1
     break
   }
 }
 
 
 /** checkForWin: check board cell-by-cell for "does a win start here?" */
 function checkForWin() {

  //Defines function to check for win conditon. Function accepts an array where each element is an array conatining (x,y) coordinates. 
   function _win(cells) {
     // Check four cells to see if they're all color of current player
     //  - cells: list of four (y, x) cells
     //  - returns true if all are legal coordinates & all match currPlayer
 
     return cells.every(
       ([y, x]) =>
         y >= 0 &&
         y < HEIGHT &&
         x >= 0 &&
         x < WIDTH &&
         board[y][x] === currPlayer
     );
   }
 
   // This iterates through each (x,y) coordinate, and generates four arrays for each to send to the _win function. These are defined in as the point and: the three points to the right, the three points above, the three points diagonally up and to the right, and the three point diagonally up and to the left.
   for (y = 0; y < HEIGHT; y++) {
     for (x = 0; x < WIDTH; x++) {
       const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
       const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
       const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
       const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
      //Sends each of the four arrays to the _win function. If any of them find a win, returns true and triggers the win message.
       if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
         return true;
       }
     }
   }
 }
 
 
 //This function iterates through each row of the 'board' array. If each of them is nonzero (i.e. has been assigned to player 1 or player 2), this returns true and triggers the full board message.
 function checkForFullBoard() {
   let fullRow = 0
   const notZero = (currentValue)=> currentValue!=0;
   for(i=0;i<HEIGHT;i++){
     console.log(board[i])
     console.log(board[i].every(notZero))
   if(board[i].every(notZero)){fullRow++}
   }
   if(fullRow===HEIGHT){return true}
 }


 //Once the rest of the JS has been read this initializes the board 
 makeBoard();
 makeHtmlBoard();
 