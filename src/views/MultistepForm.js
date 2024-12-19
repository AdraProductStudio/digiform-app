import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Container, Form, Modal, Row } from 'react-bootstrap'
import { BsFiletypePdf } from 'react-icons/bs';
import { FiUpload } from 'react-icons/fi';
import CommonContext from '../hooks/CommonContext';
import CustomModal from '../components/CustomModal';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import Icon from '../utils/icons';
import Pdf from './Pdf';
import pdffile from '../assets/HydroPower_RO35C_Manual-EN-1-1_1 (1).pdf'
import Cookies from 'js-cookie';
import axios from 'axios';
import { PDFDocument, PDFTextField, PDFCheckBox, PDFDropdown, PDFRadioGroup } from 'pdf-lib';
import { Document, Page } from 'react-pdf';






const MultistepForm = () => {

    const {
        extractedJSONFields,
        setExtractedJSONFields,
        pdfFilePath,
        setPdfFilePath,
        outputPdf,
        setOutputPdf,
        uploadFileType,
        setUploadFileType
    } = useContext(CommonContext)
    const [show, setShow] = useState(false)
    const [showSecondModal, setShowSecondModal] = useState(false)

    const [showPdfPreview, setShowPdfPreview] = useState(false);
    const [pdfDataUrl, setPdfDataUrl] = useState(null);

    const [loading, setLoading] = useState(false)
    const [pageLoadingModal, setPageLoadingModal] = useState(false)



    const [documentAadhar, setDocumentAadhar] = useState(null)
    const [documentPan, setDocumentPan] = useState(null)
    const [isAadhaarUploaded, setIsAadhaarUploaded] = useState(false)
    const [isPanUploaded, setIsPanUploaded] = useState(false)
    const [documentsUploaded, setDocumentsUploaded] = useState(false)
    const [modalName, setModalName] = useState("")
    const [step, setStep] = useState(1);
    const [captchaImage, setcaptchaImage] = useState("")
    const [captchaImageUrl, setCaptchaImageUrl] = useState("")
    const [requestId, setRequestId] = useState(null)
    const [aadhaarNumber, setAadhaarNumber] = useState(999999990019)
    const [captchaCode, setCaptchaCode] = useState("2GAD0")
    const [OTP, setOTP] = useState(123456)
    const [previewEnabled, setPreviewEnabled] = useState(false)
    const [KYCResponseData, setKYCResponseData] = useState([
        {
            "aadhaar": {
                "address": {
                    "careOf": "S/O: Harish M J ",
                    "country": "India",
                    "district": "Bangalore",
                    "house": "#1234",
                    "landmark": "",
                    "locality": "MG Road",
                    "pin": "560001",
                    "postOffice": "M G Road",
                    "state": "Karnataka",
                    "street": "1st Cross, 2nd main",
                    "subDistrict": "Bangalore South",
                    "vtc": "Bidarahalli"
                },
                "dateOfBirth": "09-03-1994",
                "email": "",
                "gender": "M",
                "generatedAt": "202105311528",
                "maskedNumber": "xxxx-xxxx-3170",
                "name": "Mahesh S",
                "phone": "86eb061a74cdff2f108daf39d5211f8f14ccb33a30ec7718c0461da20a4e0fa6",
                "photo": "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",
                "userProfile": {
                    "unmaskedEmail": "abc@def.com",
                    "unmaskedPhone": "9999999999"
                },
                "verified": {
                    "email": false,
                    "phone": false,
                    "signature": true
                },
                "xml": {
                    "fileUrl": "https://dg-sandbox.s3.amazonaws.com/testFolder/009f45d9-cf5a-448e-8140-549d0274742c.zip?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIA6GJ2FQNTF33VO44B%2F20241218%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241218T122844Z&X-Amz-Expires=300&X-Amz-SignedHeaders=host&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiEAyERzlKLJdYth87ALM2EWZPtBiVaHWGpwC4GO%2BKNgMgwCIH21MCrRva5kGPcNKPPQwiV7U6y3AetBDvkW9v74xOLAKoAECFsQAxoMOTc1NjE2NDQzMjM4IgwAGub0sU6zYH9BeScq3QM1aDOGGjv3HFMLyhu2NZ7PhWxm5LgXYFr6SqdxJR8TTNdbPJB%2Fo1iBIhsH%2BqCccFiJL%2Fa0DuDvVW2shPUMvhZnGwOBm2byl20AeTs%2Bd0R2CnSltkeFWAgfP9TidTbeQE8s3s%2F%2FnuDWKf%2FtLq0mL9WpuT6qKjGbTn33JC%2BPOOMQZpddBGbbldRQXRGz6%2Ftg5pZxZ4sXkwHKuKR3JFkkmYB41TDhD0OiA2EcAK9JPfWnGiDIBunl6N%2FpnjjI9H58wd3z3nY33CsjyJuQjCZqiBLvPbi7yfurzF6mUNGKuzRUD6O1%2F8RsvcfDtDS76CzOc%2BBFtpKBWKsxYzuzSDm%2Fv%2BtoHlRLAM2DJk246exqTFZ9xmXNExBnjC8T1hZxC9%2F612bD%2BZudU%2BNtcmBHp%2FziGKGHlefMFIMT6jPy5FLERKIE3JWajmwVgpDaW2947zwgqJinaexn9BFB%2FT1mqfbdAc2TOllTUd5NKCbCoX%2FoRqfgE%2FdrCvueH3d8rnr14QeMmc1MI7ZPPT3I05Z7O3O04EF0gvoa6wSa7A8qfKunPITaMshE7f5ZKOKWcmz5r0fbCS%2BZdETdRF%2BB8MCYDFDnBovHo5HmLBMGsknVHwy605zDnGIQJQGsbLlVnHkPo0Aw5reKuwY6pQGJqUyY%2BDHL8eigK5YoEEBk7RoWe5DjLfmjIXNia4W9cdAsAHcJmXrYLu0ghdXnbiTtJjkiJ0JbftLzEB9yZ%2Far3mTuKBpV8LD6R8WAqGCA6%2FIEbuAZZsVVxvnyNq0QZnhfUu4ei8PTAMKzZp%2Bx%2BI8%2BQPA%2B7eCyZ7Td7yCb9xrRxnuLHUak%2B3DF8VHo3b7scGFbM4Q7CBm6XMKcbWeDwkCrsduClsE%3D&X-Amz-Signature=7ddb68e75684d6bd799529d33087b955a67bb2d72009d36be4da1d7d738ff454",
                    "shareCode": "1234",
                    "validUntil": "2024-12-25T17:58:37+05:30"
                }
            },
            "aadhaarNumber": 999999990019,
            "id": "7a5b1afb-99cb-4f0a-a1a8-f90a0ef692b3",
            "status": "complete",
            "traceId": "1-6762bffc-5256375336a5bb160efab80c"
        }
    ])



    const handleClose1 = () => setShowPdfPreview(false);
    const handleShow1 = async () => {
        try {
            const pdfUrl = await generateFilledPdf();
            console.log("Generated PDF URL:", pdfUrl); // Debugging
            setPdfDataUrl(pdfUrl);
            setShowPdfPreview(true);
        } catch (error) {
            console.error("Error generating PDF:", error); // Debugging
        }
    };

    console.log(pdfDataUrl)

    const generateFilledPdf = async () => {
        try {
            const formUrl = "Individual_form.pdf";
            const formPdfBytes = await fetch(formUrl).then((res) => {
                if (!res.ok) {
                    throw new Error(`Failed to fetch PDF: ${res.statusText}`);
                }
                return res.arrayBuffer();
            });

            const pdfDoc = await PDFDocument.load(formPdfBytes);
            const form = pdfDoc.getForm();

            // Fill the fields
            const nameField = form.getTextField("name");
            nameField.setText(KYCResponseData[0].aadhaar.name);
            const FatherNameField = form.getTextField("FatherName");
            FatherNameField.setText(KYCResponseData[0]?.aadhaar?.address?.careOf);
            const genderField = form.getRadioGroup("Gender");
            genderField.select(KYCResponseData[0]?.aadhaar?.gender === "M" ? "Male" : "Female");
            const AadhaarField = form.getTextField("Aadhar");
            AadhaarField.setText(`${KYCResponseData[0]?.aadhaarNumber}`);
            const DobField = form.getTextField("Dob");
            DobField.setText(KYCResponseData[0]?.aadhaar?.dateOfBirth);
            const ResidentAddressField = form.getTextField("ResidenceAddress");
            ResidentAddressField.setText(`${KYCResponseData[0]?.aadhaar?.address?.house} ${KYCResponseData[0]?.aadhaar?.address?.street} ${KYCResponseData[0]?.aadhaar?.address?.locality}`);
            const ResidentCityField = form.getTextField("ResidentCity");
            ResidentCityField.setText(`${KYCResponseData[0]?.aadhaar?.address?.subDistrict.slice(0, 15)}`);
            const ResidentPincodeField = form.getTextField("ResidentPincode");
            ResidentPincodeField.setText(`${KYCResponseData[0]?.aadhaar?.address?.pin}`);
            const ResidentStateField = form.getTextField("ResidentState");
            ResidentStateField.setText(`${KYCResponseData[0]?.aadhaar?.address?.state}`);
            const ResidentCountryField = form.getTextField("ResidentCountry");
            ResidentCountryField.setText(`${KYCResponseData[0]?.aadhaar?.address?.country}`);
            // const phoneField = form.getTextField("phone");
            // phoneField.setText(`${KYCResponseData[0]?.aadhaar?.phone}` );

            // Save the PDF
            const pdfBytes = await pdfDoc.save();
            const pdfBlob = new Blob([pdfBytes], { type: "application/pdf" });



            const blobUrl = URL.createObjectURL(pdfBlob);
            handleFilledPdfUpload(URL.createObjectURL(pdfBlob))
            console.log("Blob URL:", blobUrl); // Debugging
            return blobUrl;
        } catch (error) {
            console.error("Error in generateFilledPdf:", error);
            throw error;
        }
    };


    console.log("KYCResponseData98", KYCResponseData)

    useEffect(() => {
        getCaptcha()
    }, [])

    const getCaptcha = async () => {
        try {
            setPageLoadingModal(true)
            const response = await axios.get("http://10.10.11.66:5000/initiate_okyc")
            console.log(response.data)

            if (response.data.error_code = 200) {
                setCaptchaImageUrl(response.data.data.captchaImage)
                setcaptchaImage(`data:image/png;base64,${response.data.data.captchaImage}`)
                setRequestId(response.data.data.id)
                setPageLoadingModal(false)
            } else {
                console.log(response.data.message)
                setPageLoadingModal(false)

            }

        } catch (err) {
            console.log(err)
            setPageLoadingModal(false)

        }
    }


    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    const handleDownload = (e) => {
        e.preventDefault();
    };

    const handleAadhaarSubmit = async () => {

        const payload = {
            "requestId": requestId,
            "aadhaarNumber": aadhaarNumber,
            "captchaCode": captchaCode
        }
        try {

            setLoading(true)

            const response = await axios.post("http://10.10.11.66:5000/verify_okyc", payload, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            if (response.data.error_code = 200) {
                setLoading(false)
                setcaptchaImage(`data:image/png;base64,${response.data.data.captchaImage}`)
                setShowSecondModal(true)
                setModalName("OTPVerification")
                setLoading(false)

            } else {
                console.log(response.data.message)
                setLoading(false)

            }

        } catch (err) {
            console.log(err)
            setLoading(false)

        }
    }

    const handleOTPSubmit = async () => {


        const payload = {
            "requestId": requestId,
            "aadhaarNumber": aadhaarNumber,
            "otp": OTP,
        }
        try {

            setLoading(true)
            const response = await axios.post("http://10.10.11.66:5000/complete_okyc", payload, {
                headers: {
                    "Content-Type": 'application/json'
                }
            })

            if (response.data.error_code = 200) {
                console.log(response?.data?.data)
                setIsAadhaarUploaded(true)
                handleHideModal(true)
                setPreviewEnabled(true)
                setKYCResponseData(response.data.data)
                setLoading(true)


            } else {
                console.log(response.data.message)
                setLoading(true)

            }

        } catch (err) {
            console.log(err)
            setLoading(true)

        }



    }



    const handlePreviewClick = async () => {





        // const inputPdfPath = pdfFilePath;
        // const response = await fetch(inputPdfPath);
        // const pdfBytes = await response.arrayBuffer();
        // const fieldData = extractedJSONFields.map(field => {
        //     console.log("field", field)
        //     const value = KYCResponseData.find(obj => obj.hasOwnProperty(field.name));
        //     return {
        //         ...field,
        //         value: value ? value[field.name] : ""
        //     };
        // });

        // console.log(fieldData)

        // try {
        //     const filledPdfBytes = await fillPdfFields(pdfBytes, fieldData);
        //     const blob = new Blob([filledPdfBytes], { type: "application/pdf" });
        //     setOutputPdf(URL.createObjectURL(blob));
        //     setPdfFilePath(URL.createObjectURL(blob))
        //     handleFilledPdfUpload(URL.createObjectURL(blob))
        // } catch (error) {
        //     console.error("Error filling PDF fields:", error);
        // }
    }


    // Filled pdf upload
    const handleFilledPdfUpload = async (filledPdf) => {

        console.log("filledPdf", filledPdf)
        const requiredParams = {
            pdf: filledPdf,
            filename: "pdf_filled.pdf"
        }
        try {

            console.log("requiredParams", requiredParams)

            await axios.post('https://digiformapi.adraproductstudio.com:5000/upload_filled_pdf', requiredParams)
                .then((response) => {
                    console.log(response)
                    if (response.data.error_code === 0) {
                        console.log(response.data)
                        console.log(response.data.message)
                        setPdfFilePath(`https://digiformcdn.adraproductstudio.com/${response.data.file_location}`)
                    }
                }).catch((err) => {
                    console.log(err)
                })
        } catch (err) {
            console.log(err)
        }

    }


    // Fill now function
    const fillPdfFields = async (pdfBytes, fieldData) => {
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const form = pdfDoc.getForm();

        fieldData.forEach((data) => {
            const field = form.getField(data.name);
            if (field) {
                try {
                    if (field instanceof PDFTextField) {
                        field.setText(data.value);
                    } else if (field instanceof PDFCheckBox) {
                        if (data.value === true) {
                            field.check();
                        } else {
                            field.uncheck();
                        }
                    } else if (field instanceof PDFDropdown) {
                        field.select(data.value);
                    } else if (field instanceof PDFRadioGroup) {
                        field.select(data.value);
                    } else {
                        console.log(`Unsupported field type: ${field.constructor.name}`);
                    }
                } catch (error) {
                    console.error(
                        `Error setting field ${data.name} with value ${data.value}: ${error.message}`
                    );
                }
            }
        });

        return pdfDoc.save();
    };




    const handlePANSubmit = () => {
        alert('PAN submitted')
        setIsPanUploaded(true)
        handleHideModal(true)
    }

    const handleShowModal = (value) => {
        setLoading(false)
        setShow(true)
        setModalName(value)
    }

    const handleHideModal = () => {
        setShow(false)
    }

    const handleModalHeader = (name) => {
        switch (name) {
            case "aadhaarModal":
                return <h5 className='mb-0'>Aadhaar card details</h5>;
            case "panModal":
                return <h5 className='mb-0'>PAN card details</h5>;
            case "OTPVerification":
                return <h5 className='mb-0'>Enter your OTP</h5>;
            default:
                return null
        }
    }

    const handleInput = (e) => {
        setAadhaarNumber(e.target.value)
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
                            // customOnchange={handleInput}
                            // value={aadhaarNumber}
                            value="999999990019"
                            disabled={true}
                        />
                        <img src={captchaImage} alt='captcha-image' />
                        <CustomInput
                            inputType="text"
                            inputPlaceholder="Enter captcha"
                            className="mx-3 mb-3"
                            // customOnchange={handleInput}
                            value="2GAD0"
                            disabled={true}
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
                            value="123456"
                            disabled={true}
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
                            className={`${loading ? "btn btn-outline-secondary w-50 pe-none opacity-25" : "btn btn-outline-secondary w-50"}`}
                            buttonName="Cancel"
                            customOnclick={handleHideModal}
                        />
                        {
                            loading ?
                                <CustomButton
                                    className="btn btn-primary w-50 pe-none opacity-25"
                                    buttonName={
                                        <div class="text-center">
                                            <div class="spinner-border spinner-border-sm text-white" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    }
                                    customOnclick={handleAadhaarSubmit}
                                />

                                :
                                <CustomButton
                                    className="btn btn-primary w-50"
                                    buttonName="Submit"
                                    customOnclick={handleAadhaarSubmit}
                                />

                        }

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
                            className={`${loading ? "btn btn-outline-secondary w-50 pe-none opacity-25" : "btn btn-outline-secondary w-50"}`}
                            buttonName="Cancel"
                            customOnclick={handleHideModal}
                        />
                        {
                            loading ?
                                <CustomButton
                                    className="btn btn-primary w-50 pe-none opacity-25"
                                    buttonName={
                                        <div class="text-center">
                                            <div class="spinner-border spinner-border-sm text-white" role="status">
                                                <span class="visually-hidden">Loading...</span>
                                            </div>
                                        </div>
                                    }
                                    customOnclick={handleOTPSubmit}
                                />

                                :
                                <CustomButton
                                    className="btn btn-primary w-50"
                                    buttonName="Submit"
                                    customOnclick={handleOTPSubmit}
                                />

                        }
                    </div>
                );
            default:
                return null

        }
    }

    const [numPages, setNumPages] = useState(Number);
    const [pageNumber, setPageNumber] = useState(1);


    function onDocumentLoadSuccess(pdf) {
        setNumPages(pdf?.numPages);
    }

    return (
        <Container className='main-section' fluid>
            <Container className='p-5 h-100'>
                <Row className='card h-100 rounded-5 border-0'>
                    <div className='d-flex flex-row h-100 '>
                        <Col className="preview-column overflow-scroll">

                            <Pdf pdfUrl={pdfDataUrl === null ? Cookies.get("selectedPdf") : pdfDataUrl} handlePreviewClick={handleShow1} previewEnabled={previewEnabled} />
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
                                                    <div className={`${isAadhaarUploaded ? "col-lg-6 my-3 pe-none":"col-lg-6 my-3"}`}>
                                                        <div
                                                            className={`card h-100 ${isAadhaarUploaded ? "border-success" : "border-primary"} border-2 shadow rounded-3 py-3 cup messageRelative ${documentsUploaded === true ? `pe-none disabled opacity-50` : ``} ${documentAadhar !== null ? "pe-none " : " "}`}
                                                            onClick={() => handleShowModal('aadhaarModal')}>
                                                            <div className="card-body d-flex align-items-center"   >
                                                                <p className='mb-0 mx-3'>
                                                                    {isAadhaarUploaded ? Icon.aadhaarIconGreen : Icon.aadhaarIconBlue}
                                                                </p>
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
                                                                <p className='mb-0 mx-3'>
                                                                    {isPanUploaded ? Icon.panIconGreen : Icon.panIconBlue}
                                                                </p>
                                                                <p className='mb-0 me-2'>PAN card</p>
                                                                {isPanUploaded && Icon.tickMark}
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

            </Container>

            <CustomModal
                modalHeader={handleModalHeader(modalName)}
                modalBody={handleModalBody(modalName)}
                modalFooter={handleModalFooter(modalName)}
                show={show}
                handleHideModal={handleHideModal}
                isModalCentered={true}
                modalBackdropType="static"
                className="p-5"
            />

            {/* <!-- Modal --> */}
            {/* <div className="modal fade vh-100" id="pdfModal" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog h-100 modal-xl ">
                    <div className="modal-content vh-100">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">PDF Preview</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body pdf-iframe-container ">
                            <iframe
                                title="PDF Viewer"
                                src="https://digiformcdn.adraproductstudio.com/KYC_ApplForm_fillable_final-1.pdf"
                                width="100%"
                                className="h-100 "
                                frameBorder="0"
                            />
                        </div>
                    </div>
                </div>
            </div> */}


            <Modal show={showPdfPreview} onHide={handleClose1} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Filled PDF Preview</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Document file={pdfDataUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
                        <Page
                            pageNumber={pageNumber}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                        />

                    </Document>
                    {/* {pdfDataUrl ? (
                        <iframe
                            src={pdfDataUrl}
                            title="Filled PDF"
                            style={{ width: "100%", height: "500px", border: "none" }}
                        />
                    ) : (
                        <p>Loading PDF...</p>
                    )} */}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose1}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>



            {pageLoadingModal && (
                <div
                    className="modal show"
                    tabIndex="-1"
                    role="dialog"
                    style={{
                        display: "block",
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Black backdrop
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        zIndex: 1050,
                    }}
                    onClick={(e) => {
                        // Prevent backdrop click from closing modal
                        e.stopPropagation();
                    }}
                >
                    <div
                        className="d-flex align-items-center justify-content-center"
                        style={{ height: "100%" }}
                    >
                        <div class="d-flex justify-content-center text-light gap-3 align-items-center">
                            <div class="spinner-border spinner-border" role="status">
                                <span class="visually-hidden">Loading...</span>
                            </div>
                            <h5 className='fw-bold'>Loading...</h5>
                        </div>
                    </div>
                </div>
            )}



        </Container >
    )
}

export default MultistepForm
