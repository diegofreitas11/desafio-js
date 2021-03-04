export function ConfirmationModal(props){
    return(
        <div className = 'modal-container'>
            <div>
                <strong>Deseja mesmo excluir essa entrada?</strong>
                <div>
                    <button
                        onClick = {() => {
                            localStorage.removeItem(props.itemToDelete);
                            props.closeConfirmation();
                        }}
                    >
                        Sim
                    </button>

                    <button
                        onClick = {props.closeConfirmation}
                    >
                        Cancelar
                    </button>
                </div>

            </div>
        </div>
    )
}