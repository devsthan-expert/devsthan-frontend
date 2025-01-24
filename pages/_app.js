
import '../styles/globals.css';
import "slick-carousel/slick/slick.css";
import Footer from "../components/footer/footer";
import "slick-carousel/slick/slick-theme.css";
import { Poppins } from 'next/font/google';

import Header from '../components/header/Header';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { FaWhatsapp } from 'react-icons/fa'; // Import WhatsApp icon from react-icons
import TestButton from '../components/testbutton/TestButton';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
});

function MyApp({ Component, pageProps }) {
  const whatsappNumber = "+918683818381"; // Replace with your WhatsApp number
  const message = "Hello, I want to book a tour"; // Customize your message

  return (
    <>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3JPZ5FGCXB"></script>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-3JPZ5FGCXB');
              `,
            }}
          ></script>
      <Toaster
        position="top-right" // You can change the position
        autoClose={5000} // Time in milliseconds to auto close
        

        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored" // Optionally choose theme
      />
      <Header />
      <Component {...pageProps} />
      <Footer />

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}

        className={'quickbuttons1'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FaWhatsapp size={30} />
      </a>

      {/* TestButton */}
      <a  
        className={'quickbuttons2'}
       
      >
        <TestButton />
      </a>

      

    </>
  );
}

export default MyApp;

