import { createContext, useState } from "react";

const CommonContext = createContext();

export const DataProvider = ({ children }) => {

    const [show,setShow] = useState(false)

    const handleShowModal = (value) => {
        setShow(true)
    }
    const handleHideModal = () => {
        setShow(false)
    }

    return (
        <CommonContext.Provider value={{
            handleShowModal,
            handleHideModal,
            show,

        }}>
            {children}
        </CommonContext.Provider>
    )
}


export default CommonContext;