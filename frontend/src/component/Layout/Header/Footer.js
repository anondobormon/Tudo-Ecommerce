import React from "react";
import AppleStore from "../../../images/apple.png";
import PlayStore from "../../../images/play.png";
import "./Footer.css";

function Footer() {
  return (
    <div>
      <footer id="footer">
        <div className="leftFooter">
          <h4>DOWNLOAD OUR APP</h4>
          <p>Download App for Android and IOS Mobile phone</p>
          <img src={PlayStore} alt="PlayStore" />
          <img src={AppleStore} alt="AppleStore" />
        </div>
        <div className="midFooter">
          <h1>TUDO STORE.</h1>
          <p>Hight quality is our first priority</p>
          <p>Copyrights 2022 &copy; JackSparrow</p>
        </div>
        <div className="rightFooter">
          <h4>Follow Us</h4>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
