import React from "react";

const Footer = () => {
  return (
    <footer className=" section-container footer xl:px-24 py-10 px-4 text-base-content justify-stretch">
      <aside>
        <img src="/logo.png" alt="" />
        <p className="my-3 md:w-40">
          Savor the artistry where every dish is a culinary masterpiece
        </p>
      </aside>
      <nav>
        <header className="footer-title text-black">Useful links</header>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Events</a>
        <a className="link link-hover">Blogs</a>
        <a className="link link-hover">FAQ</a>
      </nav>
      <nav>
        <header className="footer-title">Main Menu</header>
        <a className="link link-hover">Home</a>
        <a className="link link-hover">Offers</a>
        <a className="link link-hover">Menus</a>
        <a className="link link-hover">Reservation</a>
      </nav>
      <nav>
        <header className="footer-title">Contact Us</header>
        <a className="link link-hover">example@email.com</a>
        <a className="link link-hover">+64 958 248 966</a>
        <a className="link link-hover">Social media</a>
      </nav>
    </footer>
  );
};

export default Footer;
