export function AlertModal(props){
    return(
        <div className = 'modal-container'>
            <div>
                <strong>{props.alert}</strong>
                <button
                    onClick = {props.closeAlert}
                >
                    Ok
                </button>

            </div>
        </div>
    )
}