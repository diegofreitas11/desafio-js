
export function CarList(props){

    return(
        <div className = "car-list-container">
            <div>
                <div>
                    <strong>Modelo</strong>
                </div>

                <div>
                    <strong>Placa</strong>
                </div>

                <div>
                    <strong>É cliente?</strong>
                </div>

                <div>
                    <strong>Vaga</strong>
                </div>

                <div>
                    <strong>Opções</strong>
                </div>

            </div>
            {props.list.length === 0 && <span>Nenhum carro estacionado.</span>}
            {props.list && props.list.map(item => (
                <div>
                    <div>
                        <span>{item.model}</span>
                    </div>

                    <div>
                        <span>{item.licensePlate}</span>
                    </div>

                    <div>
                        <span>{item.isCustomer ? 'Sim' : 'Não'}</span>
                    </div>

                    <div>
                        <span>{item.parkingSpace}</span>
                    </div>

                    <div className = "list-options">
                        <button
                            onClick = {() => {
                                props.editItem(item)
                            }}
                        >
                            <img src = "edit.svg"/>
                        </button>

                        <button onClick = {() => props.deleteItem(item.key)}>
                            <img src = "delete.svg"/>
                        </button>
                    </div>
                    

                </div>
            ))}
        </div>
    )
}