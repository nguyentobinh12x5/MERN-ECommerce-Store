import React from "react";
import { copyright } from "../assets/icons";
const footerLinks = [
  {
    title: "Customer Services",
    links: [
      { name: "Contact Us", link: "/" },
      { name: "Delivery", link: "/" },
      { name: "ReFund", link: "/" },
      { name: "Term & Condition", link: "/" },
    ],
  },
  {
    title: "Help",
    links: [
      { name: "About us", link: "/" },
      { name: "FAQs", link: "/" },
      { name: "How it works", link: "/" },
      { name: "Privacy policy", link: "/" },
      { name: "Payment policy", link: "/" },
    ],
  },
  {
    title: "Get in touch",
    links: [
      { name: "nguyentobinh12@gmail.com", link: "mailto:customer@gmail.com" },
      { name: "+92554862354", link: "tel:+92554862354" },
    ],
  },
];
const Footer = () => {
  return (
    <section className="max-container">
      <div className=" flex justify-center items-start gap-20 flex-wrap max-lg:flex-col">
        <div className="flex flex-col items-start">
          <p className="text-white-400 mt-6 text-base sm:max-w-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est
            consectetur, facilis, numquam inventore sint quod vero reiciendis
            nemo, illum cumque esse placeat vel iusto aliquam.
          </p>
        </div>

        <div className="flex flex-1 flex-wrap justify-between lg:gap-10 gap-20">
          {footerLinks.map((section) => (
            <div key={section}>
              <h4 className="text-white text-xl leading-normal mb-6 font-medium">
                {section.title}
              </h4>
              <ul>
                {section.links.map((link) => (
                  <li className="mt-3 text-white-400  leading-normal cursor-pointer hover:text-slate-gray ">
                    {link.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-between text-white-400 mt-24 max-sm:flex-col max-sm:items-center">
        <div className="flex flex-1 justify-start items-center gap-2 cursor-pointer">
          <img
            src={copyright}
            width={20}
            height={20}
            className="rounded-full m-0"
          ></img>
          <p>Copyright. All rights reserved.</p>
        </div>
        <p className="cursor-pointer">Term & Conditions</p>
      </div>
    </section>
  );
};
export default Footer;
