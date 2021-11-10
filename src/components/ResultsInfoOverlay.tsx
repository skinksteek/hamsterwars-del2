import ResultsProps from "../models/ResultsProps";
import { useEffect, useState } from "react";
import Hamster from "../models/HamsterInterface";

const ResultsInfoOverlay = ({hamster, place}:ResultsProps) => {
	const [info, setInfo] = useState<Hamster|null>(null);

  const sendRequest = async (hamster:Hamster) => {
    const response = await fetch("/hamsters/" + hamster.id, {
      method: 'get',
    });
    if (!response.ok) {
      throw new Error('Något gick snett, kontakta fnörsk');
    } else {
      const data = await response.json();
      setInfo(data);
    }
  };

  useEffect(() => {
    sendRequest(hamster);
  }, [hamster]);

	return (
		<>
		{info ?
		<article className="info-overlay competition-overlay">
			<h1> {place} </h1>
			<h2>{ hamster.name }</h2>
			<h3>Wins: </h3> { info.wins }
			<h3>Defeats: </h3> { info.defeats }
			<h3>Games: </h3> { info.games}
		</article>
		: 'Laddar...' }
		</>
	);
};

export default ResultsInfoOverlay;
