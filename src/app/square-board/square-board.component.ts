import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-square-board',
  template: `
  
  <div class="container border border-primary rounded">
    <div class='row'>
      <div class="col">
        <div class="p-2" ><h1>Next player: {{ player }}</h1></div>
        <div class="p-2"><h1>Winner: {{ winner }}</h1></div>
        <div class="p-2">
          <button type="button" class="btn btn-primary" (click)="newGame()">Reset</button>
      </div>

      </div>
      <div class="mx-auto col padding" style='padding: 20px'>
        <main>
          <app-square class="border border-danger rounded"
            *ngFor = "let val of squares; let i=index"
            [value] = "val"
            (click) = "makeMove(i)">
          </app-square>
        </main>
      </div>
    </div>
  </div>

  `,
  styles: [`main {
      display: grid;  
      grid-template-columns: 200px 200px 200px;
      grid-gap: 0px;
    }`,
    
    `app-square{
      height: 200px;
      padding: 5px 5px 5px 5px;
    }`,    
  ]
})

//smart component here to manage states. 
export class SquareBoardComponent implements OnInit {
  squares: any[]
  x_plays: boolean
  winner: string

  constructor(){
    this.squares = Array(9).fill('')
    this.winner = "";
    this.x_plays = true
  }

  ngOnInit(){
    this.newGame();
  }

  newGame(){
    this.squares = Array(9).fill(null)
    this.winner = "";
    this.x_plays = true
  }

  get player(){
    return this.x_plays ? 'X':'O';
  }
  
  makeMove(idx:number){
    if (!this.squares[idx]){
      this.squares.splice(idx,1,this.player);
      this.x_plays =!this.x_plays //flip the turn
    }
    this.winner = this.calculateWinner();
  }

  //full disclosure: https://stackoverflow.com/questions/1056316/algorithm-for-determining-tic-tac-toe-game-over -> readed up on this for algorithm
  calculateWinner(){
    const rows = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    let i=0
    while (i < rows.length) {
      const [a, b, c] = rows[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[a] === this.squares[c]
      ) {
        alert("Game finished! Winner: "+ this.squares[a])
        return this.squares[a];
      }
      i+=1
    }
    return "";
  }
}
