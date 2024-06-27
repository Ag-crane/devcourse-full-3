import React from "react";
import { Modal, Button } from "react-bootstrap";

type Todo = {
    id: number;
    text: string;
    isChecked: boolean;
};

type TodoModalProps = {
    show: boolean;
    todo: Todo | null;
    onClose: () => void;
};

const TodoModal: React.FC<TodoModalProps> = ({ show, todo, onClose }) => {

    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header>
                <Modal.Title>할 일 상세</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>{todo?.text}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>닫기</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default TodoModal;