import { Container } from 'react-bootstrap';
import './Date.css'
import { React, useState } from 'react';

const Dates = () => {
  const [time, setTime] = useState(new Date());

  const updateTime = () => {
    setTime(new Date());
  };
  setInterval(updateTime, 1000);

  function Tanggalan() {
    function nol(index) {
      if (index < 10) {
        index = "0" + index
      } return index
    }
    const bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

    var tgl = nol(time.getDate())
    var bln = bulan[time.getMonth()]
    var thn = time.getFullYear()

    return (tgl + ' ' + bln + ' ' + thn);
  }

  function dayss() {
    var daysOfWeek = {
      0: "Minggu",
      1: "Senin",
      2: "Selasa",
      3: "Rabu",
      4: "Kamis",
      5: "Jum'at",
      6: "Sabtu"
    };
    var hari = daysOfWeek[time.getDay()];

    return hari;
  }


  function waktu() {
    function nol(index) {
      if (index < 10) {
        index = "0" + index
      } return index
    }
    var jam = nol(time.getHours())
    var menit = nol(time.getMinutes())
    // var detik = nol(time.getSeconds())

    return (jam+':'+menit
    // +':'+detik
    );
  }


  return (
    <div className='tgl'>
      <Container>{Tanggalan()}</Container>
      <div className='jam'>
        <div>
          {dayss()}
        </div>
        <div>
          {waktu()}
        </div>
      </div>
    </div>
  )
};
export default Dates;