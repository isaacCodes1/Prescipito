
const Footer = () => {
  return (
    <div className="md:mx-10">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        {/* ---- Left section ---- */}

        <div>
          <img
            className="mb-5 w-40"
            src="/src/assets/logo-no-background.png"
            alt="footer-logo"
          />
          <p className="w-full md:w-2/3 text-gray-600 leading-6">
            Thank you for choosing CarePulse! We are committed to
            providing you with a seamless and efficient appointment scheduling
            experience. Stay connected with us on our Email
            for updates and special offers. Your feedback is invaluable to us,
            and we strive to continually improve our services to meet your
            needs. We appreciate your trust and look forward to serving you.
            CarePulse Where your time matters.
          </p>
        </div>

        {/* ---- Center section ---- */}

        <div>
          <p className="text-xl font-medium mb-5">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        {/* ---- Right section ---- */}

        <div>
          <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+234-915-783-3410 </li>
            <li>damizickola@gmail.com</li>
          </ul>
        </div>
      </div>
      <div>{/* -------Copyright Text ------- */}</div>
      <hr />
      <p className="py-5 text-sm text-center">
        Copyright©️ 2024@ CarePulse. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
