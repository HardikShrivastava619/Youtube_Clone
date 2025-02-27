import { verification_template } from "../config/EmailTemplate.js";
import { transporter } from "./Emailconfig.js";

export const sendVerificationCode = async (email,verificationCode) => {
    try {
        
        const response = await transporter.sendMail({
            from: '"Youtube.com" <hardikShrivastava93@gmail.com>', 
            to: email, 
            subject: "Verify your Email", 
            text: "Verify your Email",
            html: verification_template.replace("123456" , verificationCode),
          });
          console.log(`email send Succesfully  ${response} `);
         } catch (error) {
        console.log(error);
        
    }
}





