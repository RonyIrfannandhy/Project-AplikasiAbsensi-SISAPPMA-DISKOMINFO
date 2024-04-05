import { PageWelcome } from "../../components1";
import WelcomeImage from "./../../images/header_bg_3.png";
import "./gallery.scss";

const Gallery = () => {
  const totalImages = 15;
  const images = [];
  for (let i = 1; i <= totalImages; i++) {
    images.push(require(`./../../images/gallery${i}.jpg`));
  }
  return (
    <>
      <PageWelcome title="Galeri Peserta Magang" image={WelcomeImage}>
        Kenali Lebih Dekat Dengan Magang Di Dinas Komunikasi,
        Informatika, Statistik dan Persandian Kota Semarang
        dan Dapatkan Pengalaman Karir Di Pemerintahan
      </PageWelcome>
      <section className="gallery">
        <div className="container gallery__container">
          {images.map((image, index) => {
            return (
              <article key={index}>
                <a href={image} className="block" target="_blank">
                  <img src={image} alt={`Gallery Image ${index + 1}`} />
                </a>
              </article>
            );
          })}
        </div>
      </section>
    </>
  );
};

export default Gallery;
