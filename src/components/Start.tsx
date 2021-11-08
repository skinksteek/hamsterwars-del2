import { Link } from 'react-router-dom'
import Cutest from './Cutest';

const Start = () => {
  return (
    <section className="start-page">
      <section className="flex-container">
        <article className="flex-item item-1">
          <Cutest />
        </article>
        <article className="flex-item item-2">
          <p><Link to="/compete">Du kan välja mellan två hamstrar</Link>. Klicka på den sötaste för att se hur populär hen är.</p> <p>Klicka på knappen "nytt spel" för att köra igen..</p>
          <button>
            <Link to="/compete">Tävla</Link>
          </button>
        </article>
        <article className="flex-item item-3">
          <p>Se alla hamstrar som finns i <Link to="/gallery">Galleriet</Link>.
            Här kan du även lägga till en ny hamster eller ta bort hamstrar, klicka på en hamster för att ta reda på mer om den!</p>
          <button>
            <Link to="/gallery">Galleri</Link>
          </button>
        </article>
      </section>
    </section>
  )
}

export default Start;
