import { useState, useEffect } from "react"
import Hamster from "../models/HamsterInterface"
import NewHamsterForm from "./NewHamsterForm"

const Gallery = () => {
  const [allHamsters, setAllHamsters] = useState<Hamster[] | null>(null)

  async function getHamsters() {
    const response = await fetch('/hamsters')
    const data = await response.json()
    setAllHamsters(data)
  }

  useEffect(() => {

    getHamsters()
  }, [])

  const handleDelete = (hamsterToDelete: Hamster) => {
      const filteredHamsters = allHamsters?.filter( hamster => hamster.id !== hamsterToDelete.id) || []
      setAllHamsters(filteredHamsters)
      fetch("/hamsters/" + hamsterToDelete.id, { method: 'delete' })
    
  }

  return (
    <>
    <section className="hamster-form">
    <NewHamsterForm show={true} set={true} allHamsters={allHamsters} setAllHamsters={setAllHamsters} />
    </section>
    <section className="hamster-group">
      {allHamsters?.map(hamster => (
        <article key={hamster.id} className="hamster-card">
          <img src={`/img/${hamster.imgName}`} alt={hamster.name} />
          <dl>
            <dt>Namn</dt>
            <dd>{hamster.name}</dd>
            <dt>Ålder</dt>
            <dd>{hamster.age}</dd>
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
          </dl>
          <button className={'remove-gallery-card'} onClick={() => handleDelete(hamster)}>Ta bort</button>
        </article>
      ))}
    </section>
    </>
  )
}

export default Gallery

