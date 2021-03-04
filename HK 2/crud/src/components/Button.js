export function Button(props){
    return(
        <div className = "button-container">
            <button
                onClick = {props.onClick}
            >
               {props.isAnUpdate ? 'Salvar alterações' : 'Adicionar carro'}
            </button>
        </div>
    )
}