import React from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import Image from '../utils/images'

const CardComponent = () => {

    const cardsArray = [
        {
            id: 1,
            cardImage: Image.KYCIndividualForm,
            cardTitle: "Loan app",
            cardButtonText: "Use"
        },
        {
            id: 2,
            cardImage: Image.KYCIndividualForm,
            cardTitle: "Loan app",
            cardButtonText: "Use"
        },
        {
            id: 3,
            cardImage: Image.KYCIndividualForm,
            cardTitle: "Loan app",
            cardButtonText: "Use"
        },
        {
            id: 4,
            cardImage: Image.KYCIndividualForm,
            cardTitle: "Loan app",
            cardButtonText: "Use"
        },
        {
            id: 5,
            cardImage: Image.KYCIndividualForm,
            cardTitle: "Loan app",
            cardButtonText: "Use"
        },
        {
            id: 6,
            cardImage: Image.KYCIndividualForm,
            cardTitle: "Loan app",
            cardButtonText: "Use"
        },
        {
            id: 7,
            cardImage: Image.KYCIndividualForm,
            cardTitle: "Loan app",
            cardButtonText: "Use"
        },
        {
            id: 8,
            cardImage: Image.KYCIndividualForm,
            cardTitle: "Loan app",
            cardButtonText: "Use"
        },

    ]

    return (
        <Container className='main-section' >
            <Row>
                {
                    cardsArray.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Col xs={6} xl={4} xxl={3} className='px-2'>
                                    <Card style={{ width: '18rem' }} className='my-3'>
                                        <Card.Img variant="top" src={item.cardImage} />
                                        <Card.Body>
                                            <Card.Title>{item.cardTitle}</Card.Title>
                                            <Card.Text>
                                                {item.cardTitle}
                                            </Card.Text>
                                            <Button variant="primary">{item.cardButtonText}</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            </React.Fragment>
                        )
                    })
                }
            </Row>
        </Container >
    )
}

export default CardComponent
