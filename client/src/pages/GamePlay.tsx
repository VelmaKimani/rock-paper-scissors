import React from "react"

const GamePlay: React.FC = () => {
  return (
        <section className="game-play">
        <p className="win-condition">THE LUCKY ONE WINS😊</p>
        <div className="round-results">
          <p className="result-human"></p>
          <p className="result-computer"></p>
          <p className="result-round"></p>
          <p className="final-result"></p>
          <button className="btn new-game-button">New Game</button>
        </div>
        <p className="choose-option">Choose an option:</p>
        <div className="buttons-container">
          <div className="button-container" data-value="ROCK">
            <button className="btn game-button">
              <img src="Assets/rock-emoji-2041x2048-28yo01im.png" alt="rock_button"></img>
              Rock
            </button>
          </div>
          <div className="button-container" data-value="PAPER">
            <button className="btn game-button">
              <img src="Assets/428-4288905_thumb-image-paper-emoji.png" alt="paper_button" data-value="PAPER"></img>
              Paper
            </button>
          </div>
          <div className="button-container" data-value="SCISSORS">
            <button className="btn game-button">
              <img src="Assets/download (1).png" alt="scissors_button" data-value="SCISSORS"></img>
              Scissors
            </button>
          </div>
        </div>
      </section>
    );
}
export default GamePlay;