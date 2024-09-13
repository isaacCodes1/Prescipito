import { assets } from "../assets/assets";

const About = () => {
  return (
    <div>
      <div className="text-center text-2xl pt-10 text-gray-500">
        <p>
          ABOUT <span className="text-gray-700 font-medium">US</span>
        </p>
      </div>
      {/* ------- Left Section ----------- */}
      <div className="my-10 flex flex-col md:flex-row gap-12">
        <img
          className="w-full md:max-w-[360px]"
          src={assets.about_image}
          alt="about-image"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4  text-sm text-gray-600">
          <p>
            Welcome To CarePulse, Your Trusted Partner In Managing Your
            HealthCare Needs Conviniently And Efficiently. At CarePulse, We
            Understand The Challenges Individuals Face When It Comes To
            Scheduling Doctor Appointments And Managing Their Health Records.
          </p>
          <p>
            CarePulse Is Committed To Excellence In HealthCare Technology. We
            continually Strive To Enhance Our Platform, Integrating the Latest
            Advancements To Improve User Experience And Deliver Superior
            Service. Whether You Are Booking Your First Appointment Or Managing
            Ongoing Care, CarePulse Is Here To Support You Every Step Of The
            Way.
          </p>
          <b className="text-gray-800">Our Vision</b>
          <p>
            Our Vision At CarePulse Is To Create A Seamless HealthCare
            Experience For Every User. We Aim To Bridge Tthe Gap Between
            Patients And Healthcare Providers, Making It Easier For You To
            Access The Care You Need, When You Need It.
          </p>
        </div>
      </div>

      <div className="text-xl my-4">
        <p className="text-gray-600">
          WHY <span className="text-gray-700 font-semibold">CHOOSE US</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white  transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Efficiency:</b>
          <p>Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white  transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Convenience:</b>
          <p>Access To A NetworkOf Trusted Healthcare Professionals In Your Area.</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white  transition-all duration-300 text-gray-600 cursor-pointer">
          <b>Personalization:</b>
          <p>Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
