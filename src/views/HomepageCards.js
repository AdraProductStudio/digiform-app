import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import Image from '../utils/images'
import { NavLink, useNavigate } from 'react-router-dom'
import CustomButton from '../components/CustomButton'
import Cookies from 'js-cookie';


const HomepageCards = () => {

    const navigate = useNavigate();


    const cardsArray = [
        {
            id: 1,
            cardImage: Image.KYCIndividualForm,
            cardTitle: "KYC form",
            cardButtonText: "Use"
        },
        // {
        //     id: 2,
        //     cardImage: Image.KYCIndividualForm,
        //     cardTitle: "Loan app",
        //     cardButtonText: "Use"
        // },
        // {
        //     id: 3,
        //     cardImage: Image.KYCIndividualForm,
        //     cardTitle: "Loan app",
        //     cardButtonText: "Use"
        // },
        // {
        //     id: 4,
        //     cardImage: Image.KYCIndividualForm,
        //     cardTitle: "Loan app",
        //     cardButtonText: "Use"
        // },
        // {
        //     id: 5,
        //     cardImage: Image.KYCIndividualForm,
        //     cardTitle: "Loan app",
        //     cardButtonText: "Use"
        // },
        // {
        //     id: 6,
        //     cardImage: Image.KYCIndividualForm,
        //     cardTitle: "Loan app",
        //     cardButtonText: "Use"
        // },
        // {
        //     id: 7,
        //     cardImage: Image.KYCIndividualForm,
        //     cardTitle: "Loan app",
        //     cardButtonText: "Use"
        // },
        // {
        //     id: 8,
        //     cardImage: Image.KYCIndividualForm,
        //     cardTitle: "Loan app",
        //     cardButtonText: "Use"
        // },

    ]

    const handleUse = () => {
        navigate("/update-information")
        Cookies.set("selectedPdf",`${process.env.PUBLIC_URL}/Individual_form.pdf`)
        // Cookies.set("selectedPdf",`https://digiformcdn.adraproductstudio.com/KYC_ApplForm_fillable_final-1.pdf`)
    }

    return (
        <Container className='main-section' fluid >
            <Container >
                <Row>
                    {
                        cardsArray.map((item, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <Col xs={6} xl={4} xxl={3} className='px-2'>
                                        <Card style={{ width: '18rem' }} className='my-3'>
                                            <Card.Img variant="top" src={item.cardImage} />
                                            <Card.Body>
                                                <Card.Title className='card-title'>{item.cardTitle}</Card.Title>
                                                <div onClick={handleUse}>
                                                    <CustomButton
                                                        buttonName={item.cardButtonText}
                                                        className="btn custom-button-sm"
                                                    />
                                                </div>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                </React.Fragment>
                            )
                        })
                    }
                </Row>
            </Container>
        </Container >
    )
}

export default HomepageCards
