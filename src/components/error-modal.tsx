import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

type ErrorModalProperties = {
    readonly isShow: boolean;
    readonly onHide: () => void;
    readonly message: string;
};

export function ErrorModal({
    isShow,
    onHide,
    message,
}: ErrorModalProperties): React.JSX.Element {
    return (
        <Modal
            centered
            show={isShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
        >
            <Modal.Header closeButton>
                <Modal.Title
                    id="contained-modal-title-vcenter"
                    className="text-danger"
                >
                    Error - Please Try Again Later
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{message}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
