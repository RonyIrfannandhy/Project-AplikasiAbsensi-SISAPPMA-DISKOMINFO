import { PageWelcome } from "../../components1";
import WelcomeImage from "./../../images/header_bg_5.png";
import { Trainer } from "../../components1/index";
import { trainers } from "../../data";

import "./trainers.scss";

const Trainers = () => {
  return (
    <>
      <PageWelcome title="STRUKTUR KOORDINATOR" image={WelcomeImage}>
        Memudahkan Peserta Magang dalam Berinteraksi dengan Koordinator
      </PageWelcome>
      <section className="trainers">
        <div className="container trainers__container">
          {trainers.map((trainer) => {
            return <Trainer key={trainer.id} {...trainer} />;
          })}
        </div>
      </section>
    </>
  );
};

export default Trainers;
