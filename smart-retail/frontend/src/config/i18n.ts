import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: 'en',
    
    resources: {
      en: {
        translation: {
            MenubarMessage: "WELCOME!",
            PriceMrpMessage: "(MRP inclusive of all taxes)",
            TryOnInstrusction: "Upload your image that can be used for the virtual try on. Please ensure that the image is clear and follows the image guidelines",
            ScanInstruction: "Place the barcode/QR code inside the frame to scan it. Please ensure your device is steady when scanning to get product information.",
            AlreadyAccount: "Already have an account? ",
            NotHaveAccount: "Don't have an account? ",
            ToShopping:"SKIP TO SHOPPING",
            LoginSuccess: "Login successfull!",
            SignupError: "Error: Maybe the number or email entered already exists!",
            ConfPassNotMatch:"Confirm password didn't match!",
            PassInstructions: ["Password must contain minimum", "• 8 characters in total", "• one number ", "• one uppercase and lowercase character", "• one special character"],
            PassError:"Password should contain atleast 8 characters: atleast one number, one uppercase and lowercase character and one special character",
            UploadGuidelines : [
              'Posture should be upright',
              'Image should contain plain background',
              'Image should be clear without Filter or blur effect',
              'Picture frame & person coverage in image should be as per the Reference image',
              'Format: .jpg, .jpeg and .png'
          ],
            CapsOn: "Caps Lock On!",
            SigninWarning: "Email or Password is Wrong!",
            LoginToView:"Log in to view your account.",
            SignupSuccess:"User registered successfully!",
            ImageUploadSuccess:"Image for virtual try on uploaded successfully!",
            ChangePasswordSuccess:"Password reset successfully!",
            DeletedSuccessfully:"Profile deleted successfully!",
            DataUploaded:"Data uploaded Successfully!",
            DataSaved:"Data saved Successfully!!",
            ImageUploaded:"Image Uploaded Successfully !",
            SignUpIssue:"Server not reponding!!..",
            CantSaveData:"Server issue!!..Cannot save data!..",
            invalidNameError:"Please enter a valid name..!",
            invalidMobileError:"Please Enter Valid Mobile number..!!",
            MailSuccess:"Reset Password mail sent successfully!!..",
            MailIssue:"Entered Email Id doesn't exist!!..",
            TryonErrorMsg:"Server issue!!..Cannot proceed with Try-on!..",
            TimeoutMsg:"Please check your network connection and try again!"
          // here we will place our translations...
        }
      }
    }
  });

export default i18n;
