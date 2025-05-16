import {
  Facebook01Icon,
  InstagramIcon,
  TiktokIcon,
  YoutubeIcon,
} from "hugeicons-react";

const Footer = () => {
  return (
    <footer className="bg-shade-dark px-4 py-16 tracking-wider text-shade-light lg:px-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 border-b border-gray-700 pb-10 md:grid-cols-2 lg:grid-cols-4">
        {/* Customer Service Info */}
        <div>
          <h3 className="mb-3 font-bold text-white">CUSTOMER SERVICE</h3>
          <p className="mb-4 text-sm">
            We are 24/7 in touch. We deliver bar-setting customer care, and we
            are here to help YOU.
          </p>
          <div className="flex space-x-4 text-lg text-white">
            <Facebook01Icon className="cursor-pointer hover:text-gray-400" />
            <InstagramIcon className="cursor-pointer hover:text-gray-400" />
            <TiktokIcon className="cursor-pointer hover:text-gray-400" />
            <YoutubeIcon className="cursor-pointer hover:text-gray-400" />
          </div>
        </div>

        <div>
          <h3 className="mb-3 font-bold text-white">USEFUL LINKS</h3>
          <ul className="space-y-2 text-sm">
            <li>About Us</li>
            <li>FAQ</li>
            <li>Contact Us</li>
          </ul>
        </div>
        {/* Customer Service Links */}
        <div>
          <h3 className="mb-3 font-bold text-white">CUSTOMER SERVICE</h3>
          <ul className="space-y-2 text-sm">
            <li>Payment Methods</li>
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li>Privilege Policy</li>
          </ul>
        </div>
        {/* My Account Links */}
        <div>
          <h3 className="mb-3 font-bold text-white">MY ACCOUNT</h3>
          <ul className="space-y-2 text-sm">
            <li>Sign In</li>
            <li>View Cart</li>
            <li>My Wishlist</li>
          </ul>
        </div>
      </div>

      {/* Payment & Branding */}
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center space-y-4 pt-6">
        {/* Logo */}
        <div className="border border-white px-6 py-1 text-sm tracking-widest text-white">
          THRIFTY
        </div>

        <p className="text-center text-sm">
          Copyright © 2024 THRIFTY. All Rights Reserved.
          <br />
        </p>
      </div>
    </footer>
  );
};

export default Footer;
