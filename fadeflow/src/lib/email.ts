import emailjs from '@emailjs/browser';

// REPLACE THESE WITH YOUR ACTUAL KEYS FROM EMAILJS
const SERVICE_ID = "service_ilmpfhf-EmailJS";
const TEMPLATE_ID = "template_bf8gqax";
const PUBLIC_KEY = "SoIWsguYYqSlAdVHn";

export const sendConfirmationEmail = async (
  name: string,
  email: string, 
  serviceName: string,
  time: string
) => {
  try {
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        customer_name: name,
        customer_email: email, 
        service_name: serviceName,
        appointment_time: time,
      },
      PUBLIC_KEY
    );
    return true;
  } catch (error) {
    console.error("Email failed:", error);
    return false;
  }
};