import { Link } from 'react-router-dom'
import Cutest from './Cutest';


const Start = () => {
  return (

    <section className="flex-container-start">
      <article className="flex-item item-1">
        <Cutest />
      </article>
      <article className="flex-item item-2">
        <p><Link to="/compete">Du kan välja mellan två hamstrar</Link>. Klicka på den sötaste för att se hur populär hen är.</p> <p>Klicka på knappen "nytt spel" för att köra igen..</p>

        <div className="button-div start-page-button"><Link to="/compete" style={{ textDecoration: 'none' }}>Tävla</Link></div>

      </article>
      <article className="flex-item item-3">
        <p>Se alla hamstrar som finns i <Link to="/gallery" >Galleriet</Link>.
          Här kan du även lägga till en ny hamster eller ta bort hamstrar.</p> <p>Klicka på en hamster för att ta reda på mer om den!</p>

        <div className="button-div start-page-button"><Link to="/gallery" style={{ textDecoration: 'none' }}>Galleri</Link></div>

      </article>
    </section>

  )
}

export default Start;
