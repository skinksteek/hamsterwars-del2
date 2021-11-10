import { useState } from "react"
import AddFormProps from "../models/AddFormProps"
import AddHamster from "../models/AddHamster"

const NewHamsterForm = ({show, set, allHamsters, setAllHamsters}:AddFormProps) => {
  const [ name, setName ] = useState<string>('')
	const [ loves, setLoves ] = useState<string>('')
	const [ favFood, setFavFood ] = useState<string>('')
	const [ imgName, setImgName ] = useState<string>('')
	const [ age, setAge ] = useState<number>(0)

  const handleAddHamster = async () => {
    let newHamster = {
			name,
			age,
			favFood,
			loves,
			imgName,
			wins: 0,
			defeats: 0,
			games: 0,
		}
		await updateWinner(newHamster)
		await updateGallery(setAllHamsters)
		console.log('newHamster:', newHamster);
	}

	const updateWinner = async(x:AddHamster) => {
		//PUT update wins ++, games ++
		await fetch("/hamsters/", {
			method: 'post', 
			body:JSON.stringify(x),
			headers: {
				"Content-Type": "application/json"
			}
		})
	}

	async function updateGallery(hamsterData:any) {
		const response = await fetch('/hamsters')
		const data = await response.json()
		setAllHamsters(data)
	}

  const validateName = () => {
    return name.length >= 2
  }

  const validateLoves = () => {
    return loves.length >= 2
  }

  const validateFood = () => {
    return favFood.length >= 2
  }

  const validateAge = () => {
    return Number(age) >= 0
  }

  const validateImg = () => imgName.match(/.(jpeg|jpg|gif|png)$/) !== null;

  return (
    <form className="add-hamster-form">
      <h3>Lägg till din egna hamster!</h3>
      <label htmlFor="name_input">Namn</label>
      <input type="text" name="name" id="name_input" onChange={(e) => setName(e.target.value)} placeholder="Hamsterns namn" className={validateName() ? 'name-inut valid' : 'name-inut not-valid'} />

      <label htmlFor="loves_input">Älskar</label>
      <input type="text" name="loves" id ="loves_input" placeholder="Hamstern älskar att..." onChange={(e) => setLoves(e.target.value)} className={validateLoves() ? 'valid' : ' not-valid'} />

      <label htmlFor="age_input">Ålder</label>
      <input type="number" name="age" id="age_input" placeholder="Hamsterns ålder" onChange={(e) => setAge(Number(e.target.value))} className={validateAge() ? 'age-inut valid' : 'age-inut not-valid'} />
      
      <label htmlFor="favFood_input">Favoritmat</label>
      <input type="text" name="favFood" id="favFood_input" placeholder="Hamsterns favorit mat" onChange={(e) => setFavFood(e.target.value)} className={validateFood() ? 'valid' : ' not-valid'} />
      
      <label htmlFor="img_input">Bild</label>
      <input type="text" name="imgName" id="img_input" placeholder="Hamster bild url" onChange={(e) => setImgName(e.target.value)} className={validateImg() ? 'valid' : ' not-valid'} />
      
      <button type="button" value="Add" onClick={() => handleAddHamster()}> Lägg till </button>
    </form>
  )
}



export default NewHamsterForm;