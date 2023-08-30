import "./Grid.css";
import isWinner from "../Helpers/isWinner";
import { useState } from "react";
import Card from "./Card";

function Grid({ numbeOfCards }) {

    const [board, setBoard] = useState(Array(numbeOfCards).fill(""));
    const [turn, setTurn] = useState(true);  // true => O , false => X
    const [winner, setWinner] = useState(null);

    function play(index) {
        if (turn == true) board[index] = "O";
        else board[index] = "X";

        const win = isWinner(board, turn ? "O" : "X");
        if (win) {
            setWinner(win);
        }

        setBoard([...board]);
        setTurn(!turn);
    }

    function reset() {
        setTurn(true);
        setWinner(null);
        setBoard(Array(numbeOfCards).fill(""));
    }

    return (
        <div className="grid-wrapper">
            {
                winner && (
                    <>
                        <h1 className="turn-highlight">Winner is {winner}</h1>
                        <button className="reset" onClick={reset}>ResetGame</button>
                    </>
                )

            }
            <h1 className="turn-highlight">Current Turn: {(turn) ? "O" : "X"}</h1>
            <div className="grid">
                {board.map((element, index) => <Card gameEnd={winner ? true : false} key={index} onPlay={play} player={element} index={index} />)}
            </div>
        </div>

    )

}

export default Grid;