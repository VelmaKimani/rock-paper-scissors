import React, { useEffect, useState } from "react";

import { GameResult } from "../types";
import { User } from "../types";
import httpClient from "../httpClient";

const LandingPage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const logoutUser = async () => {
    await httpClient.post("//localhost:5000/logout");
    window.location.href = "/";
  };

  useEffect(() => {
    (async () => {
      try {
        const resp = await httpClient.get("//localhost:5000/@me");
        setUser(resp.data);
      } catch (error) {
        console.log("Not authenticated");
      }
    })();
  }, []);

  const [gameId, setGameId] = useState<string | null>(null);
  const [playerChoice, setPlayerChoice] = useState<string>('');
  const [result, setResult] = useState<GameResult | null>(null);
  const [computerChoice, setComputerChoice] = useState<string>('');

  const startNewGame = async () => {
    try {
      const response = await fetch('http://localhost:5000/new_game', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      setGameId(data.game_id);
      setResult(null);
      setComputerChoice('');
    } catch (error) {
      console.error('Error while starting a new game:', error);
    }
  };

  const playRound = async () => {
    if (!gameId) {
      console.error('Game ID is missing');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/play/${gameId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ player_choice: playerChoice }),
      });

      const data: GameResult = await response.json();
      setResult(data);
      setComputerChoice(data.computer_choice);
    } catch (error) {
      console.error('Error while playing a round:', error);
    }
  };
  
  
  return (
    <div>
      
      {user != null ? (
        <div>
              <header><h1>Rock👊🏾, Paper🖐🏾, Scissors✌🏾</h1></header>
          {/* <button id="start-new-game" onClick={startNewGame}>Start New Game</button> */}
        {gameId && (
          <div>
            <section className="scoreboard">
          <div className="player-score">
            <p className="player">PLAYER</p>
            <p className="score-human">0</p>
          </div>
          <div className="computer-score">
            <p className="computer">COMPUTER</p>
            <p className="score-computer">0</p>
          </div>
          </section>
          <section className="game-play">
              <p className="choose-option">Choose an option: THE LUCKY ONE WINS😊</p>
             <div className="selections">
              <p className="player">PLAYER</p>
              <p className="computer">COMPUTER</p>
             </div>
          </section>
            <div className="move-container">
              {/* <p>Player</p> */}
              <div id="player-choice" data-value="ROCK">
                <input type="button"  className="btn game-button" value={playerChoice} onChange={(e) => setPlayerChoice(e.target.value)}/>            
              </div>
              {/* <p>Computer</p> */}
              <div id="computer-choice" data-value="SCISSORS">
                <button className="btn game-button" onClick={() => setComputerChoice(computerChoice)}>
                  {/* <img src="../assets/scissors.png" alt="scissors_button" data-value="SCISSORS"></img>  */}
                  {computerChoice}
                </button>
              </div>
            </div>
            <div className="buttons-container">
              
              <div className="button-container" data-value="ROCK">
                <button className="btn game-button" onClick={() => setPlayerChoice('rock')}>
                   <img src="https://imageio.forbes.com/specials-images/imageserve/dv424076/Boulder--Namibia--Africa/960x0.jpg?format=jpg&width=960" 
                   alt="rock_button" 
                   data-value="Rock"></img>  
                </button>
              </div>
              <div className="button-container" data-value="PAPER">
                <button className="btn game-button" onClick={() => setPlayerChoice('paper')}>
                  <img src="https://www.plannettech.co.ke/wp-content/uploads/2020/11/9-1-2-x-11-15lb-blank-carbonless-continuous-computer-paper-3400-case-2-ply-image-1.webp" 
                  alt="paper_button" 
                  data-value="PAPER"></img>  
                </button>
              </div>
              <div className="button-container" data-value="SCISSORS">
                <button className="btn game-button" onClick={() => setPlayerChoice('scissors')}>
                  <img src="https://m.media-amazon.com/images/I/310yF45fAFL._AC_UF894,1000_QL80_.jpg" 
                  alt="scissors_button" 
                  data-value="SCISSORS"></img>  
                </button>
              </div>
            </div>
            <button id="play-round" onClick={playRound}>Play Round</button>
          </div>
        )}
        {result && (
          <div>
            <div className="content">
              <p>Your choice: {result.player_choice}</p>
              <p>Computer's choice: {computerChoice}</p>
            </div>
            <h2> {result.result}</h2>
          </div>
        )}
         
          
          <div className="controllers">
             <div id="start-new-game"> <button type="button" className="btn btn-primary btn-lg" onClick={startNewGame}>Start New Game</button> </div>
             <div id="logout"> <button type="button" className="btn btn-primary btn-lg" onClick={logoutUser}>Logout</button> </div>
          </div>
          
        </div> 
      ) : (
        <div className="intro">
          <p>You are not logged in!</p>
          <div>
            <a href="/login">
              <button className="login-button">Login</button>
            </a>
            <a href="/register">
              <button className="register-button">Register</button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
