import { Footer } from "flowbite-react";
import {
  BsDribbble,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
  IconName,
} from "react-icons/bs";
const FooterMain = () => {
  return (
    <Footer bgDark={true}>
      <div className="w-full">
        <div className="w-full bg-gray-800 py-6 px-4 ">
          <div className="sm:flex sm:items-center sm:justify-between container mx-auto">
            <Footer.Copyright
              href="#"
              by="Developed by Al-Amin Hossain"
              year={new Date().getFullYear()}
            />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <Footer.Icon href="#" icon={BsFacebook} />
              <Footer.Icon href="#" icon={BsInstagram} />
              <Footer.Icon href="#" icon={BsTwitter} />
              <Footer.Icon href="#" icon={BsGithub} />
              <Footer.Icon href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>
      </div>
    </Footer>
  );
};

export default FooterMain;
