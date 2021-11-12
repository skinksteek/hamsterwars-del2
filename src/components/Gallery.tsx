import { useState, useEffect } from "react";
import Hamster from "../models/HamsterInterface";
import NewHamsterForm from "./NewHamsterForm";
import ErrorMessage from "./ErrorMessage";

const Gallery = () => {
  const [allHamsters, setAllHamsters] = useState<Hamster[] | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const getHamsters = async () => {
    try {
      const response = await fetch('/hamsters');
      const data = await response.json();
      setAllHamsters(data);
    } catch (e:any) {
      setErrorMessage('ojdu nu');
    }
  };

  useEffect(() => {
    getHamsters();
  }, []);

  const handleDelete = (hamsterToDelete: Hamster) => {
    const filteredHamsters = allHamsters
      ?.filter( hamster => hamster.id !== hamsterToDelete.id) || [];
    setAllHamsters(filteredHamsters);
    fetch("/hamsters/" + hamsterToDelete.id, { method: 'delete' });
  };

  const getImgUrl = (imgName:string) => {
    // tänk på att denna kan bugga om imgName inte skulle innehåll https utan http.
    if (imgName.includes('https') || imgName.includes('http')){
      return imgName;
    }
    return '/img/' + imgName;
  };

  return (
    <>
    <section className="hamster-form">
      <NewHamsterForm setAllHamsters={setAllHamsters} />
    </section>
    <section className="hamster-gallery-grid">
      {allHamsters?.map(hamster => (
        <article key={hamster.id} className="hamster-card">
          <img src={getImgUrl(hamster.imgName || '')} alt={hamster.name}/>
          <dl>
            <dt>Namn</dt>
            <dd>{hamster.name}</dd>
            <dt>Ålder</dt>
            <dd>{hamster.age}</dd>
            <div className="hamster-info">
              <dt>Favorit mat</dt>
              <dd>{hamster.favFood}</dd>
              <dt>Älskar</dt>
              <dd>{hamster.loves}</dd>
              <dt>Antal matcher</dt>
              <dd>{hamster.games}</dd>
              <dt>Vinster: </dt>
              <dd>{hamster.wins}</dd>
              <dt>Förluster: </dt>
              <dd>{hamster.defeats}</dd>
            </div>
          </dl>
          <button className={'remove-gallery-card'} onClick={() => handleDelete(hamster)}>Ta bort</button>
        </article>
      ))}
      <ErrorMessage message={errorMessage} />
    </section>
    </>
  );
};

export default Gallery;
