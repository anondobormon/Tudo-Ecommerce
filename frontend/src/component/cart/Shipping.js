import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PhoneIcon from "@mui/icons-material/Phone";
import PinDropIcon from "@mui/icons-material/PinDrop";
import PublicIcon from "@mui/icons-material/Public";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Container } from "@mui/material";
import { Country, State } from "country-state-city";
import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingInfo } from "../../actions/cartAction";
import Footer from "../Layout/Header/Footer";
import Header from "../Layout/Header/Header";
import MetaData from "../Layout/MetaData";
import SubHeader from "../Layout/SubHeader/SubHeader";
import RelatedProduct from "../product/RelatedProduct";
import CheckOutSteps from "./CheckOutSteps.js";
import "./Shipping.scss";

const Shipping = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { shippingInfo } = useSelector((state) => state.cart);
  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 11 || phoneNo.length > 11) {
      alert.error("Provide valid phone number");
      return;
    }
    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode,
        phoneNo,
      })
    );
    navigate("/order/confirm");
  };

  return (
    <>
      {
        <div>
          <MetaData title="Shipping Details" />
          <Header />
          <SubHeader />
          <Container>
            <div className="shippingContainer">
              <h2 className="shippingHeading">Shipping Details</h2>
              <CheckOutSteps activeStep={0} />
              <div className="shippingBox">
                <form
                  action=""
                  encType="multipart/form-data"
                  onSubmit={shippingSubmit}
                >
                  <h4>Address Details</h4>
                  <div className="items">
                    <p>Address</p>
                    <div className="item">
                      <HomeIcon className="icon" />
                      <input
                        type="text"
                        placeholder="Address"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="items">
                    <p>Address</p>
                    <div className="item">
                      <LocationCityIcon className="icon" />
                      <input
                        type="text"
                        placeholder="City"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="items">
                    <p>Address</p>
                    <div className="item">
                      <PinDropIcon className="icon" />
                      <input
                        type="number"
                        placeholder="Pin code"
                        required
                        value={pinCode}
                        onChange={(e) => setPinCode(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="items">
                    <p>Address</p>
                    <div className="item">
                      <PhoneIcon className="icon" />
                      <input
                        type="number"
                        placeholder="Phone Number"
                        required
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="items">
                    <p>Address</p>
                    <div className="item">
                      <PublicIcon className="icon" />
                      <select
                        name=""
                        required
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        id=""
                      >
                        <option value="">Country</option>
                        {Country &&
                          Country.getAllCountries().map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  {country && (
                    <div className="items">
                      <p>Address</p>
                      <div className="item">
                        <TransferWithinAStationIcon className="icon" />
                        <select
                          name=""
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                        >
                          <option value="">State</option>
                          {State &&
                            State.getStatesOfCountry(country).map((item) => (
                              <option key={item.isoCode} value={item.isoCode}>
                                {item.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <input
                    type="submit"
                    value="Continue"
                    className="shippingBtn"
                    disabled={state ? false : true}
                  />
                </form>
              </div>
            </div>
            <RelatedProduct />
          </Container>
          <Footer />
        </div>
      }
    </>
  );
};

export default Shipping;
