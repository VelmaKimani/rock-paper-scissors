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


  //  const [result, setResult] = useState<GameResult | null>(null);
  // const [computerChoice, setComputerChoice] = useState<string>('');

  // const playGame = async (playerChoice: string) => {
  //   try {
  //     const response = await fetch('http://localhost:5000/play', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ player_choice: playerChoice }),
  //     })
     

  //     const data: GameResult = await response.json()
  //     setComputerChoice(data.computer_choice);
  //     setResult(data);
  //   } catch (error) {
  //     console.error('Error while fetching data:', error);
  //   }
  // };
 

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
              <h1>Rock Paper Scissors Game</h1>
        <button onClick={startNewGame}>Start New Game</button>
        {gameId && (
          <div>
            <h2>Game ID: {gameId}</h2>
            <label>
              Choose your move:
              <select
                value={playerChoice}
                onChange={(e) => setPlayerChoice(e.target.value)}
              >
                <option value="">-- Select --</option>
                <option value="rock">Rock</option>
                <option value="paper">Paper</option>
                <option value="scissors">Scissors</option>
              </select>
            </label>
            <button onClick={playRound}>Play Round</button>
          </div>
        )}
        {result && (
          <div>
            <h2>Result:</h2>
            <p>Your choice: {result.player_choice}</p>
            <p>Computer's choice: {computerChoice}</p>
            <p>{result.result}</p>
          </div>
        )}
          {/* <h1>Welcome to the Game!</h1>
            <header><h1>Rock👊🏾, Paper🖐🏾, Scissors✌🏾</h1></header>
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

          <section className="game-board-container">
          <div className="game-board">
            <div className="player-choose">
              <p className="player">PLAYER</p>
              <div className="circle">
              <button className="btn game-button">
                <img src="../assets/spongebob.png" alt=""></img>
              </button>
            </div>
            </div>
          </div>
          <img src="../assets/verses.png" alt=""></img>
          <div className="computer-choose">
            <p className="computer">COMPUTER</p>
            <div className="circle">
              <button className="btn game-button">
                <img src="../assets/patrick.png" alt=""></img>
              </button>
            </div>
          </div>
          </section>

          <section className="game-play">
          <p className="win-condition">THE LUCKY ONE WINS😊</p>
          
          <p className="choose-option">Choose an option:</p>
          <div className="buttons-container">
            <div className="button-container" data-value="ROCK">
              <button className="btn game-button" onClick={() => setPlayerChoice('rock')}>
                {/* <img src="../assets/rock.png" alt="rock_button"></img> */}
                {/* Rock👊🏾
              </button>
            </div>
            <div className="button-container" data-value="PAPER">
              <button className="btn game-button" onClick={() => setPlayerChoice('paper')}>
                {/* <img src="../assets/paper.png" alt="paper_button" data-value="PAPER"></img> */}
              {/*  Paper🖐🏾
              </button>
            </div>
            <div className="button-container" data-value="SCISSORS">
              <button className="btn game-button" onClick={() => setPlayerChoice('scissors')}>
                {/* <img src="../assets/scissors.png" alt="scissors_button" data-value="SCISSORS"></img> */}
               {/*} Scissors✌🏾
              </button>
            </div>
          </div>
          </section> 
               {result && (
          <div className="round-results">
            <p className="result-human">Your choice: {result.player_choice}</p>
            <p className="result-computer">Computer's choice: {computerChoice}</p>
            <p className="result-round"></p>
            <p className="final-result">{result.result}</p>
            <button className="btn new-game-button" onClick={startNewGame}>New Game</button>
            <button className="btn new-game-button" onClick={playRound}>New Game</button>

          </div>      
               ) } */}
          <button id="logout" type="button" className="btn btn-primary btn-lg" onClick={logoutUser}>Logout</button> 
        </div> 
      ) : (

        <div className="log-ons">
          <h1>You are not logged in</h1>
          <div>
            <div>
            <a href="/login">
              <button className="button1">Login</button>
            </a>
            </div>

            <div>
            <a href="/register">
              <button className="button2">Register</button>
            </a>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
