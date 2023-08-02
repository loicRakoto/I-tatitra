import React from 'react'


export default function AffichageErreur(props) {

    var message = props.notifications;

    console.log(props.statusRep);
    const handleButtonClick = () => {
        // Appel de la fonction pour mettre à jour le state de l'élément parent
        props.affichage(false);
    };

    return (
        <div className="afferror">
            <div className="toast show" style={{ position: "absolute", zIndex: 10, top: 15, right: 15 }}>
                <div className="toast-header">
                    <strong className="me-auto">Information</strong>
                    <button onClick={handleButtonClick} type="button" className={`btn-close`} data-bs-dismiss="toast"></button>
                </div>
                <div className="toast-body">
                    <div className={` ${props.statusRep === 200 ? "alert alert-success" : "alert alert-danger"} `}>
                        <ul>
                            {message.map((messages, index) => (
                                <li key={index}>{messages}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
}