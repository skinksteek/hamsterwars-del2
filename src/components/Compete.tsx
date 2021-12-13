import ErrorMessage from "./ErrorMessage";
import { useState, useEffect } from "react";
import Hamster from "../models/HamsterInterface";
import ResultsInfoOverlay from "./ResultsInfoOverlay";

const Compete = () => {
  const [contestants, setContestants] = useState<Hamster[] | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [winner, setWinner] = useState<Hamster | null>(null);
  const [loser, setLoser] = useState<Hamster | null>(null);
  const [doneLoadingUpdate, setDoneLoadingUpdate] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const requestRandom = async (saveData: any) => {
    try {
      const firstContestant = await fetch('/hamsters/random');
      const firstContestantData = await firstContestant.json();
      let secondContestant = await fetch('/hamsters/random');
      let secondContestantData = await secondContestant.json();

      while (firstContestantData.id === secondContestantData.id) {
        secondContestant = await fetch('/hamsters/random');
        secondContestantData = await secondContestant.json();
      }
      setShowResult(false);
      saveData([firstContestantData, secondContestantData]);
    } catch (e: any) {
      setErrorMessage('Något gick fel.. testa ladda om sidan');
    }
  };


  useEffect(() => {
    requestRandom(setContestants)
  }, []);


  const updateMatches = async (winner: Hamster, loser: Hamster) => {
    await fetch("/matches/", {
      method: 'post',
      body: JSON.stringify({ winnerId: winner.id, loserId: loser.id }),
      headers: {
        "Content-Type": "application/json"
      },
    });
  };


  const newGame = () => {
    requestRandom(setContestants);
    setWinner(null);
    setLoser(null);
    setDoneLoadingUpdate(false);
  };


  const updateLoser = async (y: Hamster) => {
    setLoser(y);
    await fetch("/hamsters/" + y.id, {
      method: 'put',
      body: JSON.stringify({ defeats: y.defeats + 1, games: y.games + 1 }),
      headers: {
        "Content-Type": "application/json"
      },
    });
  };

  const updateWinner = async (x: Hamster) => {
    setWinner(x);
    await fetch("/hamsters/" + x.id, {
      method: 'put',
      body: JSON.stringify({ wins: x.wins + 1, games: x.games + 1 }),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };


  const handleClick = async (x: Hamster, y: Hamster) => {
    await updateMatches(x, y);
    await updateLoser(y);
    await updateWinner(x);
    setDoneLoadingUpdate(true);
  };


  return (
    <section className='contest-container'>
      {winner ?
        <>
          <div className="h2-contest"><h2>Och vinnaren är... </h2>
            <h2 className="winner-is-header"> {winner?.name}!</h2>
            <button onClick={() => newGame()}>Ny match</button></div>
        </> : <>
          <h2 className="h2-contest"> Klicka på ett hamster kort </h2>
        </>
      }
      <section className='contestants'>
        {contestants ?
          <>
            {
              !doneLoadingUpdate && !winner && !loser ?
                contestants.map(x => (
                  <article onClick={!showResult ? () => handleClick(x, contestants?.filter(l => l !== x)[0]) : undefined} className={showResult ? 'hamster-card' : 'hamster-card game-card'} key={x.id} >
                    <img src={`/img/${x.imgName}`} alt={x.name} />
                    <h2 className="hamster-name">{x.name}</h2>
                  </article>
                ))
                : null
            }
            {
              winner && loser ?
                <>
                  {
                    <>
                      <article className={'hamster-card'} key={winner.id} >
                        <img src={`/img/${winner.imgName}`} alt={winner.name} />
                        <h2 className="hamster-name">{winner.name}</h2>
                        <ResultsInfoOverlay hamster={winner} place={'winner'} />
                      </article>
                      <article className={'hamster-card'} key={loser.id} >
                        <img src={`/img/${loser.imgName}`} alt={loser.name} />
                        <h2 className="hamster-name">{loser.name}</h2>
                        <ResultsInfoOverlay hamster={loser} place={'loser'} />
                      </article>
                    </>
                  }
                </>
                : null
            }
          </> : 'Laddar ...'
        }
      </section>
      <ErrorMessage message={errorMessage} />
    </section>
  );
};

export default Compete;
