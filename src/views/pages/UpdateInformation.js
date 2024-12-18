import React from 'react';
import Header from '../Header';
import MultistepForm from '../MultistepForm';
import '../../css/UpdateInformation.css';
import Footer from '../Footer';

const UpdateInformation = () => {
  return (
   <>
      <Header />
      <MultistepForm />
      <Footer isFooterText={false}/>
   </>
  )
}

export default UpdateInformation
