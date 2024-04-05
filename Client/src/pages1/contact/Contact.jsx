import React from 'react';
import { Link } from 'react-router-dom';
import { PageWelcome } from "../../components1";
import WelcomeImage from "./../../images/header_bg_2.png";
import { MdEmail } from 'react-icons/md'
import { BsGlobe, BsInstagram } from 'react-icons/bs'
import "./contact.scss";

const Contact = () => {
  return (
    <>
      <PageWelcome title="LOGIN MAGANG DISKOMINFO" image={WelcomeImage}>
        Portal Peserta Magang DISKOMINFO
        Layanan Sistem Absensi dan Persuratan Peserta Magang (SISAPPMA)
      </PageWelcome>
      <section className="contact">
        <div className="container contact__container">
          <div className="contact__wrapper">
            <a href="mailto:diskominfo@semarangkota.go.id" target="_blank" rel="noreferrer noopener">
              <MdEmail />
            </a>
            <a href="https://diskominfo.semarangkota.go.id/" target="_blank" rel="noreferrer noopener">
              <BsGlobe />
            </a>
            <a href="https://www.instagram.com/diskominfokotasemarang/" target="_blank" rel="noreferrer noopener">
              <BsInstagram />
            </a>
            {/* Tambahkan button untuk menuju ke LoginSignup */}
            <Link to="/login">
              <h3>SISAPPMA LOGIN</h3>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
