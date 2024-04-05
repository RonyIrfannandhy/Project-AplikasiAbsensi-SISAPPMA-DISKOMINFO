import { Card } from "../../UI";
import { PageWelcome } from "../../components1";
import { plans } from "../../data";
import WelcomeImage from "./../../images/header_bg_4.png";
import "./plans.scss";

const Plans = () => {
  return (
    <>
      <PageWelcome title="SISAPPMA" image={WelcomeImage}>
        Mengenalkan fitur Absensi & Persuratan melalui platform digital website SISAPPMA
        untuk menunjang aktivitas layanan Magang DISKOMINFO
      </PageWelcome>
      <section className="plans">
        <div className="container plans__container">
          {plans.map(({ id, name, desc, price, features }) => {
            return (
              <Card key={id} className="plan">
                <h3>{name}</h3>
                <small>{desc}</small>
                <h1>{`$${price}`}</h1>
                <h2>/mo</h2>
                <h4>Features</h4>
                {features.map(({ feature, available }, index) => {
                  return (
                    <p key={index} className={!available ? "disabled" : ""}>
                      {feature}
                    </p>
                  );
                })}
                <button className="btn lg">Choose Plan</button>
              </Card>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Plans;
