import { useState, useEffect } from "react";
import Hamster from '../models/HamsterInterface';
import ErrorMessage from './ErrorMessage';

const Cutest = () => {
  const [cutestHamster, setCutestHamster] = useState<Hamster[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const sendRequest = async () => {
    try {
      const response = await fetch('/hamsters/cutest');
      if (!response.ok) {
        throw new Error('Något gick snett, kontakta fnörsk');
      } else {
        const data = await response.json();
        setCutestHamster(data);
      }
    } catch (e:any) {
      setErrorMessage(e.message);
    }
  };

  useEffect(() => {
    sendRequest();
  }, []);

  if (cutestHamster && cutestHamster?.length > 1) {
    let getRandomCutie: Hamster = cutestHamster[Math.floor(Math.random() * cutestHamster.length)];
    setCutestHamster([getRandomCutie]);
  }

  return (
    <>
    <div className="cutest-div">
      {cutestHamster ?
        cutestHamster.map(hamster => (
          <article className='hamster-card cutest-hamster' key={hamster.id} >
            <img src={`/img/${hamster.imgName}`} alt={hamster.name} />
            <h2> Defending Champion </h2>
            <h3>Detta är {hamster.name}</h3>
            <p>{hamster.name} har spelat {hamster.games} matcher och vunnit hela {hamster.wins}! </p>
            <h4>{hamster.name} är riktigt duktig!</h4>
          </article>
        ))
        : 
        <ErrorMessage message={errorMessage} />}
    </div>
    </>
  );
};

export default Cutest;
