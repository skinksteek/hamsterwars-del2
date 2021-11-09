
import { useState, useEffect } from "react"
import Hamster from '../models/HamsterInterface'

const Cutest = () => {
  const [cutestHamster, setCutestHamster] = useState<Hamster[] | null>(null)

  async function sendRequest() {
    const response = await fetch('/hamsters/cutest')
    if (!response.ok) {
      throw new Error(response.statusText);
    } else {
      const data = await response.json()
      setCutestHamster(data)
    }
  }

  useEffect(() => {
    sendRequest()
  }, [])

  if (cutestHamster && cutestHamster?.length > 1) {
    let getRandomCutie: Hamster = cutestHamster[Math.floor(Math.random() * cutestHamster.length)]
    setCutestHamster([getRandomCutie])
  }

  

  return (
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
        : 'Laddar hamstrar...'}
    </div>
  )
}

export default Cutest
