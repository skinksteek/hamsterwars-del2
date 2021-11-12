import { useState } from "react";
import AddFormProps from "../models/AddFormProps";
import AddHamster from "../models/AddHamster";

const NewHamsterForm = ({setAllHamsters}:AddFormProps) => {
  const [ name, setName ] = useState<string>('');
	const [ loves, setLoves ] = useState<string>('');
	const [ favFood, setFavFood ] = useState<string>('');
	const [ imgName, setImgName ] = useState<string>('');
	const [ age, setAge ] = useState<number>(0);

  const handleAddHamster = async () => {
    const newHamster = {
			name,
			age,
			favFood,
			loves,
			imgName,
			wins: 0,
			defeats: 0,
			games: 0,
		};
		await updateWinner(newHamster);
		await updateGallery(setAllHamsters);
		console.log('newHamster:', newHamster);
	};

	const updateWinner = async(x:AddHamster) => {
		//PUT update wins ++, games ++
		await fetch("/hamsters/", {
			method: 'post', 
			body:JSON.stringify(x),
			headers: {
				"Content-Type": "application/json",
			},
		});
	};

	async function updateGallery(hamsterData:any) {
		const response = await fetch('/hamsters');
		const data = await response.json();
		setAllHamsters(data);
	};

  const validateName = () => name.length >= 2;

  const validateLoves = () => loves.length >= 2;

  const validateFood = () => favFood.length >= 2;

  const validateAge = () => Number(age) >= 0;

  const validateImg = () => imgName.match(/.(jpeg|jpg|gif|png)$/) !== null;
  
  const formIsValid = () => validateName()
      && validateLoves()
      && validateFood()
      && validateAge()
      && validateImg();

  return (
    <form className="add-hamster-form">
      <h3>Lägg till din egna hamster!</h3>
      <label htmlFor="name_input">Namn</label>
      <input type="text" name="name" id="name_input" onChange={(e) => setName(e.target.value)} placeholder="Steffe" className={validateName() ? 'name-inut valid' : 'name-inut not-valid'} />

      <label htmlFor="loves_input">Älskar</label>
      <input type="text" name="loves" id ="loves_input" placeholder="älskar att..." onChange={(e) => setLoves(e.target.value)} className={validateLoves() ? 'valid' : ' not-valid'} />

      <label htmlFor="age_input">Ålder</label>
      <input type="number" name="age" id="age_input" placeholder="ålder" onChange={(e) => setAge(Number(e.target.value))} className={validateAge() ? 'age-inut valid' : 'age-inut not-valid'} />
      
      <label htmlFor="favFood_input">Favoritmat</label>
      <input type="text" name="favFood" id="favFood_input" placeholder="favorit mat" onChange={(e) => setFavFood(e.target.value)} className={validateFood() ? 'valid' : ' not-valid'} />
      
      <label htmlFor="img_input">Bild</label>
      <input type="text" name="imgName" id="img_input" placeholder="Bildadress (URL)" onChange={(e) => setImgName(e.target.value)} className={validateImg() ? 'valid' : ' not-valid'} />
      {formIsValid() && (
        <button type="button" value="Add" onClick={() => handleAddHamster()}>
          Lägg till
        </button>
      )}
      <p>Håll över en hamster för att se mer info</p>
    </form>
  )
}



export default NewHamsterForm;
