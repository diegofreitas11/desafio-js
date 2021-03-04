import { useEffect, useState } from "react";
import { Button } from "./Button";

export function Form(props){
    const [model, setModel] = useState(props.itemToEdit ? props.itemToEdit.model : '');
    const [licensePlate, setLicensePlate] = useState(props.itemToEdit ? props.itemToEdit.licensePlate : '');
    const [isCustomer, setIsCustomer] = useState(props.itemToEdit && props.itemToEdit.isCustomer);
    const [parkingSpace, setParkingSpace] = useState(props.itemToEdit ? props.itemToEdit.parkingSpace : null);

    const [avaliableParkingSpaces, setAvaliableParkingSpaces] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        let newAvaliableParkingSpaces = [1,2,3,4,5];
        
        for(let [key, value] of Object.entries(localStorage)){
            let parkingSpaceValue = JSON.parse(value).parkingSpace;
            let index = newAvaliableParkingSpaces.indexOf(+parkingSpaceValue);
            if(parkingSpaceValue !== parkingSpace) newAvaliableParkingSpaces.splice(index, 1);
        }

        if(!props.itemToEdit) setParkingSpace(newAvaliableParkingSpaces[0]);

        setAvaliableParkingSpaces(newAvaliableParkingSpaces);
    }, []);

    const saveCarEntry = async (key) => {
        if(model !== "" && licensePlate.length === 7){
            localStorage.setItem(key, 
                JSON.stringify({
                    model: model,
                    licensePlate: licensePlate,
                    isCustomer: isCustomer,
                    parkingSpace: parkingSpace 
                })
            );
            props.showAlert(!!props.itemToEdit ? 'Alteração salva com sucesso.' : 'Entrada registrada com sucesso');
            props.closeForm(); 
        }else if(model === ""){
            setError('Preencha todos os campos');
        }else{
            setError('A placa deve ter 7 dígitos');
        }
    }



    return(
        <div className = "form-container">

            {error && <span>{error}</span>}
            <input 
                type = "text" 
                placeholder = "Insira o modelo do veículo"
                value = {model}
                onChange = {(e) => setModel(e.target.value)}
            />

            <input 
                type = "text"
                placeholder = "Insira a placa do veículo (sem traço)"
                maxLength = "7"
                value = {licensePlate}
                onChange = {(e) => setLicensePlate(e.target.value)}
            />


            <div className = "row">

                <div>
                    <input 
                        type = "checkbox" 
                        id = "check"
                        defaultChecked = {isCustomer}
                        onChange = {(e) => setIsCustomer(e.target.checked)}
                    />

                    <label for = "check">É cliente?</label>
                </div>

                <div>
                    <label>Vaga</label>

                    <select
                        onChange = {(e) => setParkingSpace(e.target.value)}
                        value = {parkingSpace}
                    >
                        {avaliableParkingSpaces !== null && 
                        avaliableParkingSpaces.map((item, index) => <option key={index}>{item}</option>)}
                        
                    </select>
                </div>

            </div>

            <Button 
                onClick = {() => saveCarEntry(!!props.itemToEdit ? props.itemToEdit.key : localStorage.length)} 
                isAnUpdate = {!!props.itemToEdit}
            />

            <button
                onClick = {props.closeForm}
            >
                Cancelar
            </button>

        </div>
    )
}

