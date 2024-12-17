import React from 'react'
import { Form } from 'react-bootstrap'

const CustomInput = ({
    labelName,
    inputType,
    inputPlaceholder,
    className
}) => {

    return (
        <Form>
            <Form.Group className={`${className}` } controlId="exampleForm.ControlInput1">
                <Form.Label>{labelName}</Form.Label>
                <Form.Control type={inputType} placeholder={inputPlaceholder} />
            </Form.Group>
        </Form>
    )
}

export default CustomInput
