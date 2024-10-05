import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa"; // Import icons from react-icons

const Footer = () => {
  return (
    <footer className="bg-transparent border-t shadow-lg py-6">
      <div className="container mx-auto text-center">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Connect with Us</h3>
          <div className="flex justify-center space-x-4 mt-2">
            <a href="#" aria-label="Facebook" className="hover:text-red-500">
              <FaFacebook />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-red-400">
              <FaTwitter />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-red-600">
              <FaLinkedin />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-red-500">
              <FaInstagram />
            </a>
          </div>
        </div>
        <div className="mb-4">
          <p>
            <a href="#" className="hover:text-red500">
              Privacy Policy
            </a>{" "}
            |
            <a href="#" className="hover:text-red-500">
              {" "}
              Terms of Service
            </a>
          </p>
        </div>
        <div>
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
