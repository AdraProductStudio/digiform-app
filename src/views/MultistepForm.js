import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { BsFiletypePdf } from 'react-icons/bs';
import { FiUpload } from 'react-icons/fi';
import CommonContext from '../hooks/CommonContext';
import CustomModal from '../components/CustomModal';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Icon from '../utils/icons';

const MultistepForm = () => {

    const {

    } = useContext(CommonContext)
    const [show, setShow] = useState(false)
    const [showSecondModal, setShowSecondModal] = useState(false)

    const [numPages, setNumPages] = useState(Number);
    const [pageNumber, setPageNumber] = useState(1);
    const [documentAadhar, setDocumentAadhar] = useState(null)
    const [documentPan, setDocumentPan] = useState(null)
    const [isAadhaarUploaded, setIsAadhaarUploaded] = useState(false)
    const [isPanUploaded, setIsPanUploaded] = useState(false)
    const [documentsUploaded, setDocumentsUploaded] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [modalName, setModalName] = useState("")
    const [step, setStep] = useState(1);

    function onDocumentLoadSuccess(pdf) {
        setNumPages(pdf?.numPages);
    }

    const handleCardClick = (e, value) => {

    }

    // Upload adhar card
    const handleAadhaarCardUpload = (e) => {

    }

    // Upload pan card

    const handlePanCardUpload = (e) => {

    }



    // Aadhaar PAN documents upload
    const handleDocumentsUpload = async (e) => {

    }



    // Previous button click api
    // Mapping area
    const handlePreviewClick = async () => {

    };


    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleDownload = (e) => {
        e.preventDefault();
    };

    const handleUpdateInformation = () => {

    }

    const handleAadhaarSubmit = () => {
        setShowSecondModal(true)
        setModalName("OTPVerification")
    }



    const handleOTPSubmit = () => {
        alert('OTP submitted')
        setIsAadhaarUploaded(true)
        handleHideModal(true)
    }
    const handlePANSubmit = () => {
        alert('PAN submitted')
        setIsPanUploaded(true)
        handleHideModal(true)
    }

    const handleShowModal = (value) => {
        setShow(true)
        setModalName(value)
    }

    const handleHideModal = () => {
        setShow(false)
    }

    const handleModalName = (name) => {
        switch (name) {
            case "aadhaarModal":
                return <h5 className='mb-0'>Digi locker sign in</h5>;
            case "panModal":
                return <h5 className='mb-0'>PAN upload</h5>;
            case "OTPVerification":
                return <h5 className='mb-0'>Enter your OTP</h5>;
            default:
                return null
        }
    }

    const handleModalBody = (name) => {
        switch (name) {
            case "aadhaarModal":
                return (
                    <>
                        <CustomInput
                            labelName="Aadhaar card number"
                            inputType="number"
                            inputPlaceholder="Enter aadhaar"
                            className="mx-3 mb-4"
                        />
                        <CustomInput
                            labelName={<p className='mb-0'>Mobile number<span className='text-secondary text12'> (Aadhaar linked mobile number)</span></p>}
                            inputType="number"
                            inputPlaceholder="Enter mobile number"
                            className="mx-3 mb-3"
                        />
                    </>
                );
            case "panModal":
                return (
                    <>
                        <CustomInput
                            labelName="PAN number"
                            inputType="text"
                            inputPlaceholder="Enter PAN number"
                            className="mx-3 mb-3"
                        />

                    </>
                );
            case "OTPVerification":
                return (
                    <>
                        <CustomInput
                            labelName="OTP"
                            inputType="number"
                            inputPlaceholder="Enter OTP"
                            className="mx-3 mb-3"
                        />
                        <div className='text-end text12 mx-3'>
                            <p className='mb-0'>Resend OTP : 60s</p>
                        </div>

                    </>
                );
            default:
                return null

        }
    }

    const handleModalFooter = (name) => {
        switch (name) {
            case "aadhaarModal":
                return (
                    <div className='d-flex gap-3 my-2 mx-4'>
                        <CustomButton
                            className="btn btn-outline-secondary w-50"
                            buttonName="Cancel"
                            customOnclick={handleHideModal}
                        />
                        <CustomButton
                            className="btn btn-primary w-50"
                            buttonName="Submit"
                            customOnclick={handleAadhaarSubmit}
                        />
                    </div>
                );
            case "panModal":
                return (
                    <div className='d-flex gap-3 my-2 mx-4'>
                        <CustomButton
                            className="btn btn-outline-secondary w-50"
                            buttonName="Cancel"
                            customOnclick={handleHideModal}
                        />
                        <CustomButton
                            className="btn btn-primary w-50"
                            buttonName="Submit"
                            customOnclick={handlePANSubmit}
                        />
                    </div>
                );
            case "OTPVerification":
                return (
                    <div className='d-flex gap-3 my-2 mx-4'>
                        <CustomButton
                            className="btn btn-outline-secondary w-50"
                            buttonName="Cancel"
                            customOnclick={handleHideModal}
                        />
                        <CustomButton
                            className="btn btn-primary w-50"
                            buttonName="Submit"
                            customOnclick={handleOTPSubmit}
                        />
                    </div>
                );
            default:
                return null

        }
    }

    return (
        <>
            <Container className='main-section'>
                <div className='p-5  h-100 '>
                    <Row className='card  h-100'>
                        <div className='d-flex flex-row h-100 '>
                            <Col className="preview-column">
                                preview
                            </Col>
                            <Col className="multistep-form-column position-relative">
                                <div style={{ padding: "20px" }}>
                                    {/* Progress Indicator */}
                                    <div className="progress-container mb-5">
                                        <div className="progress-step">
                                            <div className={`circle ${step >= 1 ? "active" : ""}`}>1</div>
                                            <div className={`line ${step >= 2 ? "filled" : ""}`}></div>
                                            <div className={`circle ${step >= 2 ? "active" : ""}`}>2</div>
                                            <div className={`line ${step >= 3 ? "filled" : ""}`}></div>
                                            <div className={`circle ${step >= 3 ? "active" : ""}`}>3</div>
                                        </div>
                                    </div>
                                    <hr />
                                    {/* Steps */}
                                    <div className='d-flex flex-column h-100'>
                                        {step === 1 && (
                                            <>
                                                <div className='mt-5'>
                                                    <h4>Document checklist</h4>
                                                    <label htmlFor="field1" className="form-label text-grey">Please upload the following documents</label>
                                                    <div className="row mb-2">
                                                        <div className="col-lg-6 my-3">
                                                            <div
                                                                className={`card h-100 ${isAadhaarUploaded ? "border-success" : "border-primary"} border-2 shadow rounded-3 py-3 cup messageRelative ${documentsUploaded === true ? `pe-none disabled opacity-50` : ``} ${documentAadhar !== null ? "pe-none " : " "}`}
                                                                onClick={() => handleShowModal('aadhaarModal')}>
                                                                <div className="card-body d-flex align-items-center"   >
                                                                    <p className='mb-0 mx-3'><FiUpload className='fs-3' /></p>
                                                                    <p className='mb-0 me-2' >Aadhaar card</p>
                                                                    {isAadhaarUploaded && Icon.tickMark}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-6 my-3">
                                                            <div
                                                                className={`card h-100 ${isPanUploaded ? "border-success" : "border-primary"} border-2  shadow rounded-3 py-3 cup messageRelative ${documentsUploaded ? `pe-none disabled opacity-50` : ``} ${documentPan !== null ? "pe-none  " : " "}`}
                                                                onClick={() => handleShowModal('panModal')}>
                                                                <div className="card-body d-flex align-items-center"  >
                                                                    <p className='mb-0 mx-3'><FiUpload className='fs-3' /></p>
                                                                    <p className='mb-0 me-2'>PAN card</p>
                                                                    {isPanUploaded   && Icon.tickMark}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={`d-flex gap-3 justify-content-end ${(isAadhaarUploaded && isPanUploaded) ? "" : "pe-none opacity-25"} navigation-buttons `}>
                                                    <button className='btn btn-primary' onClick={nextStep}>Next</button>
                                                </div>
                                            </>
                                        )}

                                        {step === 2 && (
                                            <>
                                                <div className='mt-5'>
                                                    <label htmlFor="field1" className="form-label text-grey">
                                                        There are few Questions that need to be answered. We will call your number ending +91-XXXXX XXX91 registered with your aadhaar card to complete your form  &nbsp;
                                                        <a href="">(Do you have an alternate number)</a>
                                                    </label>
                                                </div>
                                                <div className="d-flex gap-3 justify-content-between navigation-buttons ">
                                                    <button className='btn btn-outline-secondary' onClick={prevStep}>Previous</button>
                                                    <button className='btn btn-primary' onClick={nextStep}>Next</button>
                                                </div>
                                            </>

                                        )}

                                        {step === 3 && (
                                            <>
                                                <div className='mt-5'>
                                                    <label htmlFor="field1" className="form-label text-grey">
                                                        Please check and verify the form before downloading.
                                                    </label>
                                                </div>
                                                <div className="d-flex gap-3 justify-content-between  navigation-buttons">
                                                    <button className='btn btn-outline-secondary' onClick={prevStep}>Previous</button>
                                                    <button className='btn btn-success' onClick={handleDownload}>Download</button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </Col>
                        </div>
                    </Row>
                </div>
            </Container>

            <CustomModal
                modalHeader={handleModalName(modalName)}
                modalBody={handleModalBody(modalName)}
                modalFooter={handleModalFooter(modalName)}
                show={show}
                handleHideModal={handleHideModal}
                isModalCentered={true}
                modalBackdropType="static"
                className="p-5"
            />
        </>
    )
}

export default MultistepForm
