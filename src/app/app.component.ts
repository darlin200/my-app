import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  delay: number = 1000;
  playerScore: number = 0;
  computerScore: number = 0;
  isGameRunning: boolean = false;
  cellColors: string[] = new Array(100).fill('blue');
  showModal: boolean = false;

  timeoutId: any;

  startGame(delay: number) {
    this.playerScore = 0;
    this.computerScore = 0;
    this.isGameRunning = true;
    this.nextRound(delay);
  }

  private nextRound(delay: number) {
    if (this.playerScore >= 10 || this.computerScore >= 10) {
      this.isGameRunning = false;
      this.showResult();
      return;
    }

    this.clearPreviousTimeout();

    this.cellColors = this.cellColors.map((color) => (color === 'yellow' ? 'red' : color));

    const randomIndex = Math.floor(Math.random() * 100);
    this.cellColors[randomIndex] = 'yellow';

    this.timeoutId = setTimeout(() => {
      const yellowIndex = this.cellColors.indexOf('yellow');
      if (yellowIndex !== -1) {
        this.cellColors[yellowIndex] = 'red';
        this.computerScore++;
      }
      if (this.isGameRunning) {
        this.nextRound(delay);
      }
    }, delay);
  }

  clickCell(index: number) {
    if (this.isGameRunning && this.cellColors[index] === 'yellow') {
      this.cellColors[index] = 'green';
      this.playerScore++;
    }
  }

  private clearPreviousTimeout() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  private showResult() {
    this.showModal = true;
  }

  resetGame() {
    this.isGameRunning = false;
    this.playerScore = 0;
    this.computerScore = 0;
    this.cellColors = new Array(100).fill('blue');
    this.showModal = false;
  }
}
