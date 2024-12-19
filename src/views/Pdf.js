
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;


const Pdf = ({ 
    pdfUrl, 
    handlePreviewClick,
    previewEnabled 

}) =>
    {

        console.log(pdfUrl)

    const [numPages, setNumPages] = useState(Number);
    const [pageNumber, setPageNumber] = useState(1);


    function onDocumentLoadSuccess(pdf) {
        setNumPages(pdf?.numPages);
    }



    return (
        <div className='postion-relative'>

            <div className='preview-container pb-3'>
                <p className="ms-3">
                    Page {pageNumber} of {numPages}
                </p>
                {
                    numPages >= 1 ?
                        <div className="d-flex justify-content-between mx-3">
                            <div className='d-flex'>

                            </div>
                            <div>
                                <button type="button" disabled={previewEnabled ? "" : "disabled"} className="btn border border-brand-color btn-primary" onClick={handlePreviewClick} >
                                    Preview
                                </button>
                            </div>
                        </div>
                        :
                        null
                }
            </div>

            <p className='position-absolute top-0 start-0 bg-white z-1 p-2 w-50' >
                Page {pageNumber} of {numPages}
            </p>
            <div className='mt-5 mb-5 pb-3'>


                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} onLoadError={console.error}>
                    <Page
                        pageNumber={pageNumber}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                    />

                </Document>

                {
                    numPages > 1 ?
                        <div className="pdf-btn d-flex justify-content-between mt-3 px-0 position-absolute bottom-0 start-0 w-50 bg-white z-1 py-2">
                            <div className="">
                                <button id='pdfViewPreiviousButton' type='button' className={pageNumber === 1 ? 'btn btn-secondary border-0 ms-4 candidate-right-side-btn pe-none' : 'btn btn-transparent border border-brand-color ms-4 candidate-right-side-btn'} onClick={() => setPageNumber(pageNumber > 1 ? pageNumber - 1 : pageNumber)}>Previous</button>
                            </div>
                            <div className=" ">
                                <button id='pdfViewNextButton' type='button' className={pageNumber === numPages ? 'btn btn-secondary border-0 candidate-right-side-btn pe-none' : 'btn btn-transparent border border-brand-color candidate-right-side-btn'} onClick={() => setPageNumber(pageNumber < numPages ? pageNumber + 1 : pageNumber)}>Next</button>
                            </div>
                        </div>

                        :
                        null
                }

            </div>
        </div>
    )
}

export default Pdf