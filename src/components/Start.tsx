import { Link } from 'react-router-dom'
import Cutest from './Cutest';

const Start = () => {
  return (

    <section className="flex-container-start">
      <article className="flex-item item-1">
        <Cutest />
      </article>
      <section className="flex-group">
        <article className="flex-item item-2">
          <p><Link to="/compete">Du kan välja mellan två hamstrar</Link>. Klicka på den sötaste för att se hur populär hen är.</p> <p>Klicka på knappen "nytt spel" för att köra igen..</p>

          <a href="/" className="btn btn-white btn-   animate"><Link to="/compete" style={{ textDecoration: 'none' }}>Tävla</Link></a>

        </article>
        <article className="flex-item item-3">
          <p>Se alla hamstrar som finns i <Link to="/gallery" >Galleriet</Link>.
            Här kan du även lägga till en ny hamster eller ta bort hamstrar, klicka på en hamster för att ta reda på mer om den!</p>

          <a href="/" className="btn btn-white btn-   animate"><Link to="/gallery" style={{ textDecoration: 'none' }}>Galleri</Link></a>

        </article>
      </section>
    </section>

  )
}

export default Start;
