import { render } from '@testing-library/react';
import React from 'react';
import {Modal, Button, FormControl} from 'react-bootstrap';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import { confirmable, createConfirmation } from 'react-confirm';

class complexConfirmation extends React.Component{
    constructor(){
        super();
        this.state = {inPutData: ''}
    }

    handleOnClick(){
        const { proceed } = this.props;
        return() => {
            proceed({
                input: this.state.inPutData
            })
        }
    }


    render(){
        const { show, dismiss, cancel, message} = this.props;
        return(
            <div className='static-modal'>
                <Modal show={show} onHide={dismiss}>
                    <Modal.Header>
                        Eliminar Cuenta
                    </Modal.Header>
                    <Modal.Body>Para eliminar tu cuenta deberás ingresar tu contraseña.</Modal.Body>
                    <Modal.Footer>
                        <FormControl type='password' 
                        value={this.state.inPutData}
                        onChange={(e)=>{
                            this.setState({'inPutData': e.target.value})
                        }}
                        />
                        <Button onClick={cancel}>Cancelar</Button>
                        <Button className='alert alert-danger'
                        onClick={this.handleOnClick()}>Eliminar Cuenta</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export const confirm = createConfirmation(confirmable(complexConfirmation));
