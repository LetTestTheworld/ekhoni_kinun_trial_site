import { useEffect, useState } from "react";

function Modal(props) {
    const [isActive, setIsActive] = useState(false);

    useEffect(() => {
        if (props.message) {
            setIsActive(true);
        }
    }, [props.message]); // run only when props.message changes

    return (
        <>
            <div className={`modal-overlay ${isActive ? 'active' : ''}`} id="modalOverlay">
                <div className="modal-container text-center">
                    <div className="modal-content">
                        <div className="d-flex justify-content-center align-items-center ">
                            <div className="position-relative" style={{ width: '75px', height: '75px' }}>
                                <div className="circle"></div>
                                <div className="checkmark"></div>
                            </div>
                        </div>
                        <p className="mt-3">{props.message} !</p>
                        <div>
                            <button className="btn btn-danger" onClick={() => setIsActive(false)}>Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Modal;
