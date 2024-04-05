import { Link } from "react-router-dom"
import Logo from './../images/logo.png'
import { AiFillInstagram } from "react-icons/ai"
import { MdEmail } from 'react-icons/md'
import { BsGlobe, BsMap, BsPhone } from "react-icons/bs"

const Footer = () => {
    return (
        <footer>
            <div className="container footer__container">
                <article>
                    <Link to="/" className="logo">
                        <img src={Logo} alt="Footer Logo" />
                    </Link>
                    <p>
                        Sistem Absensi & Persuratan Peserta Magang (SISAPPMA) merupakan sistem yang dibuat oleh Dinas Komunikasi, Informatika, Statistik dan Persandian Kota Semarang dalam mengelola data Absensi Peserta Magang dan Persuratan yang berdiri dilingkungan Kota Semarang. Seluruh data akan dikelola untuk penilaian terhadap Peserta Magang DISKOMINFO Kota Semarang.
                    </p>
                    <div className="footer__socials">
                        <a href="https://diskominfo.semarangkota.go.id/" target="_blank" rel="noreferrer noopener">
                            <BsGlobe />
                        </a>
                        <a href="mailto:diskominfo@semarangkota.go.id" target="_blank" rel="noreferrer noopener">
                            <MdEmail />
                        </a>
                        <a href="https://www.instagram.com/diskominfokotasemarang/" target="_blank" rel="noreferrer noopener">
                            <AiFillInstagram />
                        </a>
                    </div>
                </article>
                <article>
                    <h4>Lainnya</h4>
                    <Link to="/about">About</Link>
                    <Link to="/plans">Plans</Link>
                    <Link to="/trainers">Trainers</Link>
                    <Link to="/gallery">Gallery</Link>
                    <Link to="/contact">Login</Link>
                </article>
                <article>
                    <h4>Layanan</h4>
                    <a href="https://sistel.semarangkota.go.id/" target="_blank" rel="noreferrer noopener">
                        SIMENTEL
                    </a>
                    <a href="https://diskominfo.semarangkota.go.id/page/detail/29" target="_blank" rel="noreferrer noopener">
                        PELAYANAN
                    </a>
                    <a href="https://layanandiskominfo.semarangkota.go.id/" target="_blank" rel="noreferrer noopener">
                        DOMAIN
                    </a>
                    <a href="https://ppid.semarangkota.go.id/" target="_blank" rel="noreferrer noopener">
                        PPID
                    </a>
                    <a href="https://smartcity.semarangkota.go.id/" target="_blank" rel="noreferrer noopener">
                        SMARTCITY
                    </a>
                </article>
                <article>
                    <h4>Contact</h4>
                    <a href="https://wa.me/62243549446" target="_blank" rel="noreferrer noopener">
                        <BsPhone />
                        &nbsp;WA
                    </a>
                    <a href="https://maps.app.goo.gl/2RVLWLciQSgJF78i8" target="_blank" rel="noreferrer noopener">
                        <BsMap />
                        &nbsp;Lokasi
                    </a>
                </article>
            </div>
            <div className="footer__copyright">
                <small>
                    2024 copyright &copy; all right reserved
                </small>
            </div>
        </footer>
    )
}

export default Footer