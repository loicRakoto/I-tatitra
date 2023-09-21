import React from 'react'


export default function AffichageErreur(props) {

    var message = props.notifications;

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
                    <div style={{ display: 'flex', alignItems: 'center' }} className={` ${props.statusRep === 200 ? "alert alert-success" : "alert alert-danger"} `}>
                        <div>
                            {message.map((messages, index) => (
                                <div key={index}>{messages}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}