import React from 'react';

const ScoreBoard: React.FC = () => {
    return (
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
    );
}

export default ScoreBoard;