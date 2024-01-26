import React from 'react';

const GameBoard: React.FC = () => {
  return (
    <section className="game-board-container">
            <header><h1>Rock👊🏾, Paper🖐🏾, Scissors✌🏾</h1></header>
    <div className="game-board">
      <div className="player-choose">
        <p className="player">PLAYER</p>
        <div className="circle">
        <button className="btn game-button">
          <img src="Assets/spongebob_PNG38.png.crdownload" alt=""> </img>
        </button>
      </div>
        <div className="image-container empty"></div>
      </div>
    </div>
    <img src="Assets/pngtree-luxury-vs-versus-transparent-vector-png-image_6405569.png" alt=""></img>
    <div className="computer-choose">
      <p className="computer">COMPUTER</p>
      <div className="circle">
        <button className="btn game-button">
          <img src="Assets/cf7e545a200916345c62901f3606a8f0.png" alt=""></img>
        </button>
        <div className="image-container empty"></div>
      </div>
    </div>
  </section>
    );
}
export default GameBoard;