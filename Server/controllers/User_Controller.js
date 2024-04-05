const models = require('../models');
const moment = require('moment');
const axios = require('axios');
const bcryptjs = require('bcryptjs');
const Validator = require('fastest-validator');

function showTugasList(req, res) {
  const id = req.params.id;
  models.Status_tugas.findAll({
    where: { p_id: id },
    order: [['id', 'DESC']],
    include: [{
      model: models.Tugas,
      as: 'tugas',
    }]
  }).then(result => {
    res.status(200).json({
      tugas: result.map(item => ({
        tugas: item.tugas,
        status_tugas: {
          keterangan: item.keterangan, // Include keterangan property
          // ... other properties
        },
      })),
    });
  }).catch(error => {
    res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  });
}

function showTugas(req, res){

    const id = req.params.id;
    models.Tugas.findByPk(id).then(result =>{
        res.status(200).json({
            tugas:result
        });
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong",
            error:error
        });
    });
}

function showPresensi(req, res){
    const id = req.params.id;
    if (true){
        models.Presensi.findAll({where:{p_id:id}}).then(result =>{
            res.status(200).json({
                presensi:result
            });
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong",
            error:error
        });
    });
    }else{
        res.status(403).json({
            message: "bukan id kamu"
        })
    }
}

async function doPresensi(req, res, url) {
    try {
      const response = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
      const time = moment.tz(response.data.datetime, 'Asia/Jakarta');
      // const time = moment(new Date("2024-01-16T015:59:59.0000"));
      const pid = req.params.id;
      // const baseUrl = process.env.APIDISKOMINFO;
      const baseUrl = "http://localhost:3000/";
      const fileName = url.replace('\\', '/');
      const hari = time.day();
      const currentDate = moment(time); // Menggunakan waktu dari WorldTimeAPI
  
      const jamMulai1Jumat = 7; // Jam mulai rentang waktu pertama di hari Jumat
      const menitMulai1Jumat = 15;
      const jamBerakhir1Jumat = 8; // Jam berakhir rentang waktu pertama di hari Jumat
      const menitBerakhir1Jumat = 45;
  
      const jamMulai2Jumat = 13; // Jam mulai rentang waktu kedua di hari Jumat
      const menitMulai2Jumat = 45;
      const jamBerakhir2Jumat = 14; // Jam berakhir rentang waktu kedua di hari Jumat
      const menitBerakhir2Jumat = 15;
  
      const jamMulai1Senmis = 7; // Jam mulai rentang waktu pertama di hari Selasa sampai Kamis
      const menitMulai1Senmis = 45;
      const jamBerakhir1Senmis = 8; // Jam berakhir rentang waktu pertama di hari Selasa sampai Kamis
      const menitBerakhir1Senmis = 15;
  
      const jamMulai2Senmis = 15; // Jam mulai rentang waktu kedua di hari Selasa sampai Kamis
      const menitMulai2Senmis = 45;
      const jamBerakhir2Senmis = 16; // Jam berakhir rentang waktu kedua di hari Selasa sampai Kamis
      const menitBerakhir2Senmis = 15;
  
      let presensi = {};
  
      // Mengambil jam dan menit dari waktu saat ini
      const currentHour = currentDate.hours();
      const currentMinute = currentDate.minutes();
  
      if (hari === 5) { // Jumat
        if (
          (currentHour >= jamMulai1Jumat && currentHour < jamBerakhir1Jumat) ||
          (currentHour === jamMulai1Jumat && currentMinute >= menitMulai1Jumat) ||
          (currentHour === jamBerakhir1Jumat && currentMinute <= menitBerakhir1Jumat)
        ) {
          presensi = {
            check_in: currentDate,
            image_url_in: baseUrl + fileName
          };
        } else if (
          (currentHour >= jamMulai2Jumat && currentHour <= jamBerakhir2Jumat) ||
          (currentHour === jamMulai2Jumat && currentMinute >= menitMulai2Jumat) ||
          (currentHour === jamBerakhir2Jumat && currentMinute <= menitBerakhir2Jumat)
        ) {
          presensi = {
            check_out: currentDate,
            image_url_out: baseUrl + fileName
          };
        }
      } else if (hari !== 0 && hari !== 6) { // Selasa sampai Kamis
        if (
          (currentHour >= jamMulai1Senmis && currentHour < jamBerakhir1Senmis) ||
          (currentHour === jamMulai1Senmis && currentMinute >= menitMulai1Senmis) ||
          (currentHour === jamBerakhir1Senmis && currentMinute <= menitBerakhir1Senmis)
        ) {
          presensi = {
            check_in: currentDate,
            image_url_in: baseUrl + fileName
          };
        } else if (
          (currentHour >= jamMulai2Senmis && currentHour <= jamBerakhir2Senmis) ||
          (currentHour === jamMulai2Senmis && currentMinute >= menitMulai2Senmis) ||
          (currentHour === jamBerakhir2Senmis && currentMinute <= menitBerakhir2Senmis)
        ) {
          presensi = {
            check_out: currentDate,
            image_url_out: baseUrl + fileName
          };
        }
      }
  
      if (Object.keys(presensi).length > 0) {
        models.Presensi.update(presensi, { where: { p_id: pid, tanggal: time.format('YYYY-MM-DD') } })
          .then((result) => {
            res.status(201).json({
              message: 'Presensi successful',
              result: result
            });
          })
          .catch((error) => {
            res.status(500).json({
              message: 'Something went wrong',
              error: error
            });
          });
      } else {
        res.status(500).json({
          message: 'Something went wrong',
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({
        message: 'Something went wrong',
        error: error
      });
    }
  }

  function doTugas(req, res, url) {
    const id = req.params.id;
    const tid = req.params.tid;

    const baseUrl = "http://localhost:3000/";
    const fileName = url.replace('\\', '/');

    // Mengambil informasi tugas
    models.Tugas.findByPk(tid)
        .then((assignment) => {
            if (!assignment) {
                return res.status(404).json({
                    message: "Tugas Tidak Ditemukan",
                });
            }

            const tugas = {
                tugas_url: baseUrl + fileName,
                status_pengerjaan: true,
                keterangan: null, //Kondisi awal saat tugas belum dikumpulkan
            };

            // Variabel pembanding antara waktu sekarang dan deadline
            const currentDateTime = new Date();
            const dueDateTime = new Date(assignment.dueDate);

            if (currentDateTime > dueDateTime) {
                // telat
                tugas.keterangan = 0;
            } else {
                // sebelum deadline
                tugas.keterangan = 1;
            }

            // melakukan update terhadap status_tugas di database
            models.Status_tugas.update(tugas, { where: { p_id: id, t_id: tid } })
                .then((result) => {
                    res.status(201).json({
                        message: "Tugas Berhasil Diupload",
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        message: "Something went wrong",
                        error: error,
                    });
                });
        })
        .catch((error) => {
            res.status(500).json({
                message: "Terjadi kesalahan saat mengambil informasi tugas",
                error: error,
            });
        });
}

function editPassword(req, res){
    bcryptjs.genSalt(10,async function(err,salt){
        bcryptjs.hash(req.body.password,salt,async function(err,hash){
            try {
                const id = req.params.id;
                const updatedPeserta = {
                    password: hash                
                }
                const schema = {
                    password: {type:"string", optional:false},
                }

                const v = new Validator();
                const validationResponse = v.validate(updatedPeserta, schema);

                if(validationResponse !== true){
                    return res.status(400).json({
                        message: "Validation false",
                        errors: validationResponse
                    });
                }

                models.Peserta_Magang.update(updatedPeserta, {where:{id:id}}).then(result =>{
                    res.status(200).json({
                        message: "Peserta Magang updated successfully"
                    });
                }).catch(error =>{
                    res.status(500).json({
                        message: "Something went wrong",
                        error:error
                    });
                });
            } catch (error){
                res.status(500).json({
                    message: "Something went wrong",
                    error:error
                });
            }
        });
    });
}

module.exports = {
    showTugasList:showTugasList,
    showTugas:showTugas,
    showPresensi:showPresensi,
    doPresensi:doPresensi,
    doTugas:doTugas,
    editPassword:editPassword
}