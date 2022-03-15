import { Container } from "@mui/material";
import "./Services.scss";

const Services = () => {
  const serviceData = [
    {
      serviceName: "free shipping",
      id: "1",
      url: "https://i.ibb.co/n6vLLcQ/airplane.png",

      text: "Lorem ipsum dolor sit amet  .",
    },
    {
      serviceName: "24X7 support",
      id: "2",
      url: "https://i.ibb.co/LgDyfbF/return.png",

      text: "Lorem ipsum dolor sit amet  .",
    },
    {
      serviceName: "15 Day return",
      id: "3",
      url: "https://i.ibb.co/nshV9hf/payment.png",
      text: "Lorem ipsum dolor sit amet  .",
    },
    {
      serviceName: "payment service",
      id: "4",
      url: "https://i.ibb.co/MMyc9nt/support.png",
      text: "Lorem ipsum dolor sit amet  .",
    },
  ];
  return (
    <Container>
      <div className="service">
        {serviceData.map((service) => (
          <div key={service.id} className="item">
            <img src={service.url} alt="" />
            <h2>{service.serviceName}</h2>
            <p>{service.text}</p>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Services;
