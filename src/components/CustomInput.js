import React from 'react'
import { Form } from 'react-bootstrap'

const CustomInput = ({
    labelName,
    inputType,
    inputPlaceholder,
    className,
    customOnchange,
    value,
    disabled
}) => {


    return (
        <Form>
            <Form.Group className={`${className}` } controlId="exampleForm.ControlInput1">
                <Form.Label>{labelName}</Form.Label>
                <Form.Control type={inputType} placeholder={inputPlaceholder} onChange={customOnchange} value={value} disabled={disabled} />
            </Form.Group>
        </Form>
    )
}

export default CustomInput
