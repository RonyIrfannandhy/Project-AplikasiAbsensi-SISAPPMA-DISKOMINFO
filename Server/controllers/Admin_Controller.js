const { Op } = require('sequelize');
const Sequelize = require('sequelize');
const models = require('../models');
const moment = require('moment-timezone');
const Validator = require('fastest-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const exceljs = require('exceljs');
const fs = require('fs');
const axios = require('axios');


function showAdmin(req,res){
    models.Admin.findAll().then(result =>{
        res.status(200).json({
            admin:result
        });
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong",
            error:error
        });
    });
}

function showAdminById(req, res){
    const id = req.params.id;

    models.Admin.findByPk(id).then(result =>{
        res.status(200).json({
            admin:result
        });
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong",
            error:error
        });
    });
}

function addAdmin(req, res,){
    models.Admin.findOne({where:{username: req.body.username}}).then(result =>{
        if (result){
            res.status(409).json({
                message: 'dah ada email bang'
            })        
        }else{
            models.Peserta_Magang.findOne({where:{username: req.body.username}}).then(result =>{
                if (result){
                    res.status(409).json({
                        message: 'dah ada email bang'
                    })
                }else{
                    bcryptjs.genSalt(10,async function(err,salt){
                        bcryptjs.hash(req.body.password,salt,async function(err,hash){
                            const admin = {
                                nama: req.body.nama,
                                username: req.body.username,
                                password: hash
                            }
                        
                            const schema = {
                                nama: {type:"string", optional:false, max:50},
                                username: {type:"string", optional:false, max:50},
                                password: {type:"string", optional:false}
                            }
                        
                            const v = new Validator();
                            const validationResponse = v.validate(admin, schema);
                        
                            if(validationResponse !== true){
                                return res.status(400).json({
                                    message: "Validation false",
                                    errors: validationResponse
                                });
                            }
                        
                            models.Admin.create(admin).then(result => {
                                res.status(201).json({
                                    message: "admin created successfully"
                                });
                            }).catch(error =>{
                                res.status(500).json({
                                    message: "Something went wrong",
                                    error:error
                                });
                            });        
                    
                        })
                    })
                }
            }).catch(error =>{
                res.status(500).json({
                    message: "Something went wrong",
                    error:error
                });
            })
        }
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong",
            error:error
        });
    })   
}

function editAdmin(req, res){
    const username = req.body.username;
    const id = req.params.id;
    const admin = {
        nama: req.body.nama,
    }
    if (username) {
        admin.username = username;
    }
    models.Admin.findOne({where:{username: req.body.username}}).then(result =>{
        if (result){
            res.status(409).json({
                message: 'dah ada email bang'
            })        
        }else{
            models.Peserta_Magang.findOne({where:{username: req.body.username}}).then(result =>{
                if (result){
                    res.status(409).json({
                        message: 'dah ada email bang'
                    })
                }else{
                    bcryptjs.genSalt(10,async function(err,salt){
                        bcryptjs.hash(req.body.password,salt,async function(err,hash){
                            admin.password = hash;
                            
                        
                            const schema = {
                                nama: {type:"string", optional:true, max:50},
                                username: {type:"string", optional:true, max:50},
                                password: {type:"string", optional:true}
                            }
                        
                            const v = new Validator();
                            const validationResponse = v.validate(admin, schema);
                        
                            if(validationResponse !== true){
                                return res.status(400).json({
                                    message: "Validation false",
                                    errors: validationResponse
                                });
                            }
                        
                            models.Admin.update(admin, {where:{id:id}}).then(result => {
                                res.status(201).json({
                                    message: "admin updated successfully"
                                });
                            }).catch(error =>{
                                res.status(500).json({
                                    message: "Something went wrong1",
                                    error:error
                                });
                            });        
                    
                        })
                    })
                }
            }).catch(error =>{
                res.status(500).json({
                    message: "Something went wrong2",
                    error:error
                });
            })
        }
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong",
            error:error
        });
    })
}

//deleteAdmin 
function deleteAdmin(req, res){
  const id = req.params.id;

  models.Admin.destroy({where:{id:id}}).then(result =>{
      res.status(200).json({
          message: "Admin berhasil dihapus!"
      });
  }).catch(error =>{
      res.status(500).json({
          message: "Something went wrong",
          error:error
      });
  }); 
}

async function addPeserta(req, res){
    models.Admin.findOne({where:{username: req.body.username}}).then (result =>{
        if (result){
            res.status(409).json({
                message: 'dah ada email bang'
            })
        }else{
            models.Peserta_Magang.findOne({where:{username: req.body.username}}).then(result =>{
                if(result){
                    res.status(409).json({
                        message: 'dah ada email bang'
                    })                    
                }else{
                bcryptjs.genSalt(10,async function(err,salt){
                    bcryptjs.hash(req.body.password,salt,async function(err,hash){
                        try {
                            const peserta_magang = {
                                nama: req.body.nama,
                                username: req.body.username,
                                password: hash,
                                asal_univ: req.body.asal_univ,
                                no_telp: req.body.no_telp,
                                asal_jurusan: req.body.asal_jurusan,
                                no_telp: req.body.no_telp,
                                tanggal_mulai: req.body.tanggal_mulai,
                                tanggal_selesai: req.body.tanggal_selesai,
                                // status_aktif: req.body.status_aktif
                            }
                            const isDateOnly = (value) => {
                                // Add your custom validation logic here to check if the value is a date without a time component
                                // For example, you can use a regular expression to match date-only format (YYYY-MM-DD)
                                const dateOnlyRegex = /^\d{4}-\d{2}-\d{2}$/;
                                return dateOnlyRegex.test(value);
                            };
                            
                            const schema = {
                                nama: { type: "string", optional: false, max: 50 },
                                username: { type: "string", optional: false, max: 50 },
                                password: { type: "string", optional: false},
                                asal_univ: { type: "string", optional: false, max: 50 },
                                asal_jurusan: { type: "string", optional: false, max: 50 },
                                no_telp: {type: "string", optional: true, max: 50 },
                                tanggal_mulai: { type: "custom", messages: { custom: "Invalid date format" }, check: isDateOnly },
                                tanggal_selesai: { type: "custom", messages: { custom: "Invalid date format" }, check: isDateOnly },
                                
                                // status_aktif: { type: "string" } 
                                // Validate as a boolean
                            };
                            const v = new Validator();
                            const validationResponse = v.validate(peserta_magang, schema);
                            if(validationResponse !== true){
                                return res.status(400).json({
                                    message: "Validation false",
                                    errors: validationResponse
                                });
                            }else{
                                const result_peserta = await models.Peserta_Magang.create(peserta_magang);
                                await addPresensiForPeserta(result_peserta, req, res);
                            }
                            
                        }catch(error){
                            res.status(500).json({
                                message: "Something went wrong1",
                                error:error
                            });
                        }    
                    });
                });
            }
            }).catch(error=>{
                res.status(500).json({
                    message: "Something went wrong",
                    error:error
                });
            });                           
        }
    }).catch(error=>{
        res.status(500).json({
            message: "Something went wrong",
            error:error
        });
    });
}

function showPresensiPeserta(req, res){
    const id = req.params.id;
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

}

async function addPresensiForPeserta(result_peserta, req, res){
    try {
        //result_peserta.tanggal_mulai
        const tanggalMulai = moment(result_peserta.tanggal_mulai);
        const tanggalBerakhir = moment(result_peserta.tanggal_selesai);
        
        let selisihHari = 0;
        const presensiData = [];

        while (tanggalMulai.isBefore(tanggalBerakhir)) {
            if (tanggalMulai.day() !== 0 && tanggalMulai.day() !== 6) {
              selisihHari++;
              const presensi = {
                p_id: result_peserta.id,
                tanggal: tanggalMulai.format('YYYY-MM-DD')
              };
              presensiData.push(presensi);
            }
            tanggalMulai.add(1, 'days');
        }
        
        await models.Presensi.bulkCreate(presensiData);
    
        res.status(201).json({
          message: "Presensi created successfully"
        });
      } catch (error) {
        res.status(500).json({
          message: "Something went wrong2",
          error: error
        });
      }
}

function showPeserta(req, res){
    const id = req.params.id;

    models.Peserta_Magang.findByPk(id).then(result =>{
        res.status(200).json({
            peserta_magang:result
        });
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong",
            error:error
        });
    });
}

async function showPesertaAll(req, res){
    statusCheck(req, res);
    await models.Peserta_Magang.findAll().then(result =>{
        res.status(200).json({
            peserta_magang:result
        });
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong",
            error:error
        });
    });
}

async function showPesertaAktifAll(req, res){
    statusCheck(req, res);
    const response = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
    const currentDate = moment.tz(response.data.datetime, 'Asia/Jakarta');
    await models.Peserta_Magang.findAll({where:{
      status_aktif:2, 
      tanggal_mulai: {
        [Op.lte]: currentDate
      }
    }
  }).then(result =>{
        res.status(200).json({
            peserta_magang:result
        });
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong",
            error:error
        });
    });
}

async function showPesertaAlumniAll(req, res){
    statusCheck(req, res);
    await models.Peserta_Magang.findAll({where:{status_aktif:1}}).then(result =>{
        res.status(200).json({
            peserta_magang:result
        });
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong",
            error:error
        });
    });
}

async function showCalonPesertaAll(req, res) {
    statusCheck(req, res);
    const response = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
    const currentDate = moment.tz(response.data.datetime, 'Asia/Jakarta'); // Get the current date and time
    await models.Peserta_Magang.findAll({
        where: {
            status_aktif:3,
            tanggal_mulai: {
                [Op.gt]: currentDate, // [Op.lt] stands for less than
            }
        }
    }).then(result => {
        res.status(200).json({
            peserta_magang: result
        });
    }).catch(error => {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    });
}


async function editPresensiForPeserta(result_peserta,id, req, res) {
    try {
        const tanggalMulai = moment(result_peserta.tanggal_mulai);
        const tanggalBerakhir = moment(result_peserta.tanggal_selesai);
        
        const presensiData = [];

        while (tanggalMulai.isBefore(tanggalBerakhir)) {
            if (tanggalMulai.day() !== 0 && tanggalMulai.day() !== 6) {
                const existingPresensi = await models.Presensi.findOne({
                    where: {
                        p_id: id,
                        tanggal: tanggalMulai.format('YYYY-MM-DD')
                    }
                });

                if (!existingPresensi) {
                    const presensi = {
                        p_id: id,
                        tanggal: tanggalMulai.format('YYYY-MM-DD')
                    };
                    presensiData.push(presensi);
                }
            }
            tanggalMulai.add(1, 'days');
        }
        
        if (presensiData.length > 0) {
            await models.Presensi.bulkCreate(presensiData);
            res.status(201).json({
                message: "Presensi created successfully"
            });
        } else {
            res.status(200).json({
                message: "Presensi already exists for the specified dates"
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong",
            error: error
        });
    }
}

async function editPeserta(req,res){
    bcryptjs.genSalt(10,async function(err,salt){
        bcryptjs.hash(req.body.password,salt,async function(err,hash){
            try {
                const id = req.params.id;
                const updatedPeserta = {
                    nama: req.body.nama,
                    username: req.body.username,
                    asal_univ: req.body.asal_univ,
                    asal_jurusan: req.body.asal_jurusan,
                    no_telp: req.body.no_telp,
                    tanggal_mulai: req.body.tanggal_mulai,
                    tanggal_selesai: req.body.tanggal_selesai,
                    // status_aktif: req.body.status_aktif
                }
                if (req.body.password !== null) {
                    updatedPeserta.password = hash;
                }
                
                const isDateOnly = (value) => {
                    // Add your custom validation logic here to check if the value is a date without a time component
                    // For example, you can use a regular expression to match date-only format (YYYY-MM-DD)
                    const dateOnlyRegex = /^\d{4}-\d{2}-\d{2}$/;
                    return dateOnlyRegex.test(value);
                };
                
                const schema = {
                    nama: { type: "string", optional: true, max: 50 },
                    username: { type: "string", optional: true, max: 50 },
                    password: { type: "string", optional: true},
                    asal_univ: { type: "string", optional: true, max: 50 },
                    no_telp: {type: "string", optional: true, max: 50 },
                    asal_jurusan: { type: "string", optional: true, max: 50 },
                    tanggal_mulai: { type: "custom", messages: { custom: "Invalid date format" }, check: isDateOnly },
                    tanggal_selesai: { type: "custom", messages: { custom: "Invalid date format" }, check: isDateOnly },
                    // status_aktif: { type: "string" } // Validate as a boolean
                };
                const v = new Validator();
                const validationResponse = v.validate(updatedPeserta, schema);

                if(validationResponse !== true){
                    return res.status(400).json({
                        message: "Validation false",
                        errors: validationResponse
                    });
                }
                await models.Peserta_Magang.update(updatedPeserta, {where:{id:id}});
                await editPresensiForPeserta(updatedPeserta,id, req, res)
            } catch (error){
                res.status(500).json({
                    message: "Something went wrong12",
                    error:error
                });
            }
        });
    });
}

function deletePeserta(req, res){
  const id = req.params.id;

  models.Status_tugas.destroy({where:{p_id:id}}).then(result =>{ //tambahin delete status tugas juga karena ada id peserta sebagai foreign key
    models.Peserta_Magang.destroy({where:{id:id}}).then(result =>{
        res.status(200).json({
            message: "Peserta Magang deleted"
        });
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong",
            error:error
        });
    });
  }).catch(error => {
    res.status(500).json({
      message: "Something went wrong",
      error:error
     })
    })
}

async function showPresensiPerDay(req, res) {
    const response = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
    const tanggal = req.query.tanggal ? moment.tz(req.query.tanggal, 'Asia/Jakarta') : moment.tz(response.data.datetime, 'Asia/Jakarta');

    try {
        const presensi = await models.Peserta_Magang.findAll({
            include: [{
                model: models.Presensi,
                as: 'presensimagang',
                where: {
                    tanggal: tanggal.format('YYYY-MM-DD')
                }
            }]
        });

        // Menghitung jumlah presensi yang memiliki check_in atau check_out tidak null
        const totalSudahPresensi = presensi.reduce(
            (total, peserta) =>
                total + peserta.presensimagang.filter(p => p.check_in !== null || p.check_out !== null).length,
            0
        );

        res.status(200).json({
            presensi: presensi,
            totalSudahPresensi: totalSudahPresensi
        });
    } catch (error) {
        res.status(500).json({
            message: 'Something went wrong',
            error: error
        });
    }
}


async function showPresensiBelum(req, res) {
  try {
    const response = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
    const tanggal = req.body.tanggal ? moment.tz(req.body.tanggal, 'Asia/Jakarta') : moment.tz(response.data.datetime, 'Asia/Jakarta');
    
    const presensi = await models.Peserta_Magang.findAll({
      include: [{
        model: models.Presensi,
        as: 'presensimagang',
        where: {
          tanggal: tanggal.format('YYYY-MM-DD'),
          [Op.or]: [
            { check_in: null },
            { check_out: null },
          ],
        },
      }],
    });

    res.status(200).json({
      presensi: presensi,
    });
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({
      message: 'Something went wrong',
      error: error,
    });
  }
}


function showPresensiPerPeserta(req, res){
    const pid = req.params.id;

    models.Presensi.findAll({where:{p_id: pid}}).then(result =>{
        res.status(200).json({
            presensi:result
        });
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong",
            error:error
        });
    });
}

function showTugasById(req, res){
    const id = req.params.id;
    statusCheck(req, res);

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

function showTugasAll(req, res){
    statusCheck(req, res);
    models.Tugas.findAll().then(result =>{
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

function showTugasStatusByTugas(req, res){
    const tid = req.params.id;
    models.Peserta_Magang.findAll({
        where: {
            status_aktif:2
        },
        include:[{
            model:models.Status_tugas,
            as:"status_tugas",
            where:{
                t_id:tid
            }
        }]
    }).then(result =>{
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



async function addTugas(req, res, url) {
    try {
        statusCheck(req, res);
        const tugas = {
            judul: req.body.judul,
            tugas_url: req.body.tugas_url,
            dueDate: req.body.dueDate
        }
        const schema = {
            judul: {type:"string", optional:false, max:50},
            tugas_url: {type:"string", optional:false},
            
        }

        const v = new Validator();
        const validationResponse = v.validate(tugas, schema);

        if(validationResponse !== true){
            return res.status(400).json({
                message: "Validation false",
                errors: validationResponse
            });
        }
        
        
      // Create the tugas record and await the result
        const result_tugas = await models.Tugas.create(tugas);
        console.log("dueDate adalah: ", tugas.dueDate);
  
      // Call the addStatusToAll function with result_tugas
        await addStatusToAll(result_tugas, req, res);
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong1",
            error: error
        });
    }
}

async function addStatusToAll(result_tugas, req, res) {
    try {
      const peserta = await models.Peserta_Magang.findAll({ where: { status_aktif: 2 } });
  
      for (let i = 0; i < peserta.length; i++) {
        const status_tugas = {
          p_id: peserta[i].id, // Use peserta[i].id to get the id of each peserta
          t_id: result_tugas.id, // Use the result_tugas from addTugas function
          tugas_url: null,
          status_pengerjaan: false
        }
  
        // Create the status_tugas record for each peserta
        await models.Status_tugas.create(status_tugas);
      }
  
      res.status(201).json({
        message: "Status tugas created successfully"
      });
    } catch (error) {
      res.status(500).json({
        message: "Something went wrong2",
        error: error
      });
    }
}

//fungsi untuk edit tugas
async function editTugas(req, res) {
  try {
    statusCheck(req, res);

    const tugas = {
      judul: req.body.judul,
      tugas_url: req.body.tugas_url,
      dueDate: req.body.dueDate,
    };


    const schema = {
      judul: { type: "string", optional: false, max: 50 },
      tugas_url: { type: "string", optional: false },
      dueDate: { type: "custom", optional: false },
    };

    const v = new Validator();
    const validationResponse = v.validate(tugas, schema);

    if (validationResponse !== true) {
      return res.status(400).json({
        message: "Validation false",
        errors: validationResponse,
      });
    }

    const existingTugas = await models.Tugas.findByPk(req.params.id);

    if (!existingTugas) {
      return res.status(404).json({
        message: "Tugas not found",
      });
    }

    // Perform the update on the tugas row
    await existingTugas.update(tugas);

    res.status(200).json({
      message: "Tugas updated successfully",
      data: existingTugas,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong",
      error: error,
    });
  }
}



function deleteTugas(req, res){
    const id = req.params.id;

    models.Status_tugas.destroy({where:{t_id:id}}).then(result =>{
        models.Tugas.destroy({where:{id:id}}).then(result =>{
            res.status(200).json({
                message: "Tugas deleted"
            });
        }).catch(error =>{
            res.status(500).json({
                message: "Something went wrong",
                error:error
            });
        });
    }).catch(error =>{
        res.status(500).json({
            message: "Something went wrong",
            error:error
        });
    });
}

async function statusCheck(req, res){
    try {
        const currentDate = moment(); // Get the current date and time
        // Find all Peserta_Magang entities where tanggal_selesai is earlier than the current date
        const outdatedPeserta = await models.Peserta_Magang.findAll({
          where: {
            status_aktif:1,
          },
        });
    
        // Update the status_aktif to false for outdatedPeserta
        await Promise.all(
          outdatedPeserta.map(async (peserta) => {
            await peserta.update({ status_aktif:1 });
          })
        );
        console.log('Status of outdated Peserta_Magang entities updated successfully');
      } catch (error) {
        console.error('Error updating status of outdated Peserta_Magang entities:', error);
      }
}

async function exportAdmin(req, res) {
    try {
      const results = await models.Admin.findAll();
  
      const workbook = new exceljs.Workbook();
      const sheet = workbook.addWorksheet('Admins');
      sheet.columns = [
        { header: 'ID', key: 'id', width: 3 },
        { header: 'Nama', key: 'nama', width: 30 },
        { header: 'Username', key: 'username', width: 20 },
        { header: 'Password', key: 'password', width: 80 },
      ];
  
      results.forEach((value) => {
        sheet.addRow({
          id: value.id,
          nama: value.nama,
          username: value.username,
          password: value.password,
        });
      });
  
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
  
      res.setHeader(
        'Content-Disposition',
        'attachment;filename=Admins.xlsx'
      );
  
      const buffer = await workbook.xlsx.writeBuffer();
      res.end(buffer);
  
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({
        message: 'Something went wrong',
        error: error,
      });
    }
}

async function exportPeserta(req, res) {
  try {
      statusCheck(req, res);
      const results = await models.Peserta_Magang.findAll();

      // Function to map integer to string
      const getStatusString = (status) => {
          switch (status) {
              case 1:
                  return 'Alumni';
              case 2:
                  return 'Aktif';
              case 3:
                  return 'Calon';
              // Add more cases as needed
              default:
                  return 'Calon';
          }
      };

      const response = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
      const tanggal = moment.tz(response.data.datetime, 'Asia/Jakarta');

      const workbook = new exceljs.Workbook();
      const sheet = workbook.addWorksheet('Peserta Magangs');
      sheet.columns = [
          { header: 'ID', key: 'id', width: 3 },
          { header: 'Nama', key: 'nama', width: 30 },
          { header: 'Username', key: 'username', width: 30 },
          { header: 'Asal Universitas', key: 'asal_univ', width: 80 },
          { header: 'Asal Jurusan', key: 'asal_jurusan', width: 80 },
          { header: 'Nomor Telepon', key: 'no_telp', width: 80 },
          { header: 'Tanggal Mulai', key: 'tanggal_mulai', width: 80 },
          { header: 'Tanggal Selesai', key: 'tanggal_selesai', width: 80 },
          { header: 'Status Aktif', key: 'status_aktif', width: 80 }
      ];

      results.forEach((value) => {
          sheet.addRow({
              id: value.id,
              nama: value.nama,
              username: value.username,
              asal_univ: value.asal_univ,
              asal_jurusan: value.asal_jurusan,
              no_telp: value.no_telp,
              tanggal_mulai: value.tanggal_mulai,
              tanggal_selesai: value.tanggal_selesai,
              status_aktif: getStatusString(value.status_aktif) // Convert integer to string
          });
      });

      res.setHeader(
          'Content-Type',
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );

      res.setHeader(
          'Content-Disposition',
          `attachment;filename=Peserta Magang (${tanggal}).xlsx`
      );

      const buffer = await workbook.xlsx.writeBuffer();
      res.end(buffer);

  } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({
          message: 'Something went wrong',
          error: error,
      });
  }
}


  async function exportPesertaAktif(req, res) {
    try {
      statusCheck(req, res);
      const response = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
      const tanggal = moment.tz(response.data.datetime, 'Asia/Jakarta');
      const results = await models.Peserta_Magang.findAll({where:{
        status_aktif:2,
        tanggal_mulai: {
          [Op.lte]: tanggal
        }
      }
    });
      
      const workbook = new exceljs.Workbook();
      const sheet = workbook.addWorksheet('Peserta Magangs');
      sheet.columns = [
        { header: 'ID', key: 'id', width: 3 },
        { header: 'Nama', key: 'nama', width: 30 },
        { header: 'Username', key: 'username', width: 30 },
        { header: 'Asal Universitas', key: 'asal_univ', width: 80 },
        { header: 'Asal Jurusan', key: 'asal_jurusan', width: 80 },
        { header: 'Nomor Telepon', key: 'no_telp', width: 80 },
        { header: 'Tanggal Mulai', key: 'tanggal_mulai', width: 80 },
        { header: 'Tanggal Selesai', key: 'tanggal_selesai', width: 80 },
        { header: 'Status Aktif', key: 'status_aktif', width: 80 }
      ];
  
      results.forEach((value) => {
        sheet.addRow({
          id: value.id,
          nama: value.nama,
          username: value.username,
          asal_univ: value.asal_univ,
          asal_jurusan: value.asal_jurusan,
          no_telp: value.no_telp,
          tanggal_mulai: value.tanggal_mulai,
          tanggal_selesai: value.tanggal_selesai,
          status_aktif: value.status_aktif 
        });
      });
  
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
  
      res.setHeader(
        'Content-Disposition',
        `attachment;filename=Peserta Magang Aktif (${tanggal}).xlsx`
      );
  
      const buffer = await workbook.xlsx.writeBuffer();
      res.end(buffer);
  
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({
        message: 'Something went wrong',
        error: error,
      });
    }
  }

  async function exportPesertaAlumni(req, res) {
    try {
      statusCheck(req,res);
      const results = await models.Peserta_Magang.findAll({where:{status_aktif:1}});
        //status_aktif:2

      const response = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
      const tanggal = moment.tz(response.data.datetime, 'Asia/Jakarta');
  
      const workbook = new exceljs.Workbook();
      const sheet = workbook.addWorksheet('Peserta Magangs');
      sheet.columns = [
        { header: 'ID', key: 'id', width: 3 },
        { header: 'Nama', key: 'nama', width: 30 },
        { header: 'Username', key: 'username', width: 30 },
        { header: 'Asal Universitas', key: 'asal_univ', width: 80 },
        { header: 'Asal Jurusan', key: 'asal_jurusan', width: 80 },
        { header: 'Nomor Telepon', key: 'no_telp', width: 80 },
        { header: 'Tanggal Mulai', key: 'tanggal_mulai', width: 80 },
        { header: 'Tanggal Selesai', key: 'tanggal_selesai', width: 80 },
        { header: 'Status Aktif', key: 'status_aktif', width: 80 }
      ];
  
      results.forEach((value) => {
        sheet.addRow({
          id: value.id,
          nama: value.nama,
          username: value.username,
          asal_univ: value.asal_univ,
          asal_jurusan: value.asal_jurusan,
          no_telp: value.no_telp,
          tanggal_mulai: value.tanggal_mulai,
          tanggal_selesai: value.tanggal_selesai,
          status_aktif: value.status_aktif 
        });
      });
  
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
  
      res.setHeader(
        'Content-Disposition',
        `attachment;filename=Peserta Magang Alumni (${tanggal}).xlsx`
      );
  
      const buffer = await workbook.xlsx.writeBuffer();
      res.end(buffer);
  
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({
        message: 'Something went wrong',
        error: error,
      });
    }
  }

  async function exportCalonPeserta(req, res) {
    try {
      statusCheck(req,res);
      const response = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
      const tanggal = moment.tz(response.data.datetime, 'Asia/Jakarta');
      const results = await models.Peserta_Magang.findAll({
        where: {
          status_aktif:3,
        }
      });
  
      const workbook = new exceljs.Workbook();
      const sheet = workbook.addWorksheet('Peserta Magangs');
      sheet.columns = [
        { header: 'ID', key: 'id', width: 3 },
        { header: 'Nama', key: 'nama', width: 30 },
        { header: 'Username', key: 'username', width: 30 },
        { header: 'Asal Universitas', key: 'asal_univ', width: 80 },
        { header: 'Asal Jurusan', key: 'asal_jurusan', width: 80 },
        { header: 'Nomor Telepon', key: 'no_telp', width: 80 },
        { header: 'Tanggal Mulai', key: 'tanggal_mulai', width: 80 },
        { header: 'Tanggal Selesai', key: 'tanggal_selesai', width: 80 },
        { header: 'Status Aktif', key: 'status_aktif', width: 80 }
      ];
  
      results.forEach((value) => {
        sheet.addRow({
          id: value.id,
          nama: value.nama,
          username: value.username,
          asal_univ: value.asal_univ,
          asal_jurusan: value.asal_jurusan,
          no_telp: value.no_telp,
          tanggal_mulai: value.tanggal_mulai,
          tanggal_selesai: value.tanggal_selesai,
          status_aktif: value.status_aktif 
        });
      });
  
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
  
      res.setHeader(
        'Content-Disposition',
        `attachment;filename=Calon Peserta Magang (${tanggal}).xlsx`
      );
  
      const buffer = await workbook.xlsx.writeBuffer();
      res.end(buffer);
  
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({
        message: 'Something went wrong',
        error: error,
      });
    }
  }

  async function exportStatusTugas(req, res) {
    try {
      const tid = req.params.id;
      const response = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
      const tanggal = moment.tz(response.data.datetime, 'Asia/Jakarta');
      const results = await models.Peserta_Magang.findAll({
        include:[{
            model:models.Status_tugas,
            as:'status_tugas',
            where:{
                t_id:tid
            }
        }]
      });
  
      const workbook = new exceljs.Workbook();
      const sheet = workbook.addWorksheet('Status Tugas');
      sheet.columns = [
        { header: 'Nama', key: 'nama', width: 30 },
        { header: 'Asal Universitas', key: 'asal_univ', width: 80 },
        { header: 'Status Pengerjaan', key: 'status_pengerjaan', width: 30 }
      ];
  
      results.forEach((value) => {
        const statusPengerjaan = value.status_tugas[0].status_pengerjaan ? 'Sudah Mengerjakan' : 'Belum Mengerjakan';

        function setCellBackgroundColor(value) {
            return value === 'Sudah Mengerjakan' ? 'FF00FF00' : 'FFFFFFFF';
        }
        
        sheet.addRow({
          nama: value.nama,
          asal_univ: value.asal_univ,
          status_pengerjaan: statusPengerjaan
        });

        sheet.getCell(sheet.rowCount, sheet.getColumn('status_pengerjaan').number).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: setCellBackgroundColor(statusPengerjaan) }
        };
      });
  
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
  
      res.setHeader(
        'Content-Disposition',
        `attachment;filename=Status Tugas ${tanggal}.xlsx`
      );
  
      const buffer = await workbook.xlsx.writeBuffer();
      res.end(buffer);
  
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({
        message: 'Something went wrong',
        error: error,
      });
    }
  }

  async function exportPresensiPerTanggal(req, res) {
    try {
      const response = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
      const tanggal = moment.tz(response.data.datetime, 'Asia/Jakarta');
      const results = await models.Peserta_Magang.findAll({
        include:[{
            model: models.Presensi,
            as:'presensimagang',
            where: {
                tanggal:tanggal.format('YYYY-MM-DD')
            }
        }]
      });
  
      const workbook = new exceljs.Workbook();
      const sheet = workbook.addWorksheet('Presensi');
      sheet.columns = [
        { header: 'ID', key: 'id', width: 3 },
        { header: 'Nama', key: 'nama', width: 30 },
        { header: 'Asal Universitas', key: 'asal_univ', width: 30 },
        { header: 'Asal Jurusan', key: 'asal_jurusan', width: 30 },
        { header: 'Nomor Telepon', key: 'no_telp', width: 80 },
        { header: 'Tanggal Mulai', key: 'tanggal_mulai', width: 30 },
        { header: 'Tanggal Selesai', key: 'tanggal_selesai', width: 30 },
        { header: 'Status Aktif', key: 'status_aktif', width: 30 },
        { header: 'Tanggal', key: 'tanggal', width: 30 },
        { header: 'Check-In', key: 'check_in', width: 30 },
        { header: 'Check-Out', key: 'check_out', width: 30 },
        { header: 'Check-In Foto', key: 'image_url_in', width: 50 },
        { header: 'Check-Out Foto', key: 'image_url_out', width: 50 }

      ];
  
      results.forEach((value) => {
        const tanggalPresensi = value.presensimagang[0].tanggal;
        const checkInPresensi = value.presensimagang[0].check_in ? 'Sudah Presensi' : 'Belum Presensi';
        const checkOutPresensi = value.presensimagang[0].check_out ? 'Sudah Presensi' : 'Belum Presensi';
        const imageInValue = value.presensimagang[0].image_url_in ? image_url_in : 'Belum Presensi';
        const imageOutValue = value.presensimagang[0].image_url_out ? image_url_out : 'Belum Presensi';
        

        // Function to set cell background color
        function setCellBackgroundColor(value) {
            return value === 'Sudah Presensi' ? 'FF00FF00' : 'FFFFFFFF';
        }

        sheet.getCell(sheet.rowCount, sheet.getColumn('check_in').number).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: setCellBackgroundColor(checkInPresensi) }
        };
        sheet.getCell(sheet.rowCount, sheet.getColumn('check_out').number).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: setCellBackgroundColor(checkOutPresensi) }
        };

        sheet.addRow({
          id: value.id,
          nama: value.nama,
          asal_univ: value.asal_univ,
          asal_jurusan: value.asal_jurusan,
          no_telp: value.no_telp,
          tanggal_mulai: value.tanggal_mulai,
          tanggal_selesai: value.tanggal_selesai,
          status_aktif: value.status_aktif,
          tanggal: tanggalPresensi,
          check_in: checkInPresensi,
          check_out: checkOutPresensi,
          image_url_in: imageInValue,
          image_url_out: imageOutValue
        });
      });
  
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
  
      res.setHeader(
        'Content-Disposition',
        `attachment;filename=Presensi ${tanggal}.xlsx`
      );
  
      const buffer = await workbook.xlsx.writeBuffer();
      res.end(buffer);
  
    } catch (error) {
      console.error('An error occurred:', error);
      res.status(500).json({
        message: 'Something went wrong',
        error: error,
      });
    }
  }

  async function exportPresensiPerPeserta(req, res) {
  try {
    const id = req.params.id;
    const results = await models.Presensi.findAll({ where: { p_id: id } });
    const ambilNama = await models.Peserta_Magang.findByPk(id);
    const response = await axios.get('https://worldtimeapi.org/api/timezone/Asia/Jakarta');
    const tanggal = moment.tz(response.data.datetime, 'Asia/Jakarta');
    const fileName = "Presensi " + ambilNama.nama;
    

    const workbook = new exceljs.Workbook();
    const sheet = workbook.addWorksheet(ambilNama.nama);

    

    sheet.columns = [
      { header: 'Tanggal', key: 'tanggal', width: 15 },
      { header: 'Check-In', key: 'check_in', width: 15 },
      { header: 'Check-Out', key: 'check_out', width: 15 },
      { header: 'Check-In Foto', key: 'image_url_in', width: 50 },
      { header: 'Check-Out Foto', key: 'image_url_out', width: 50 },
      { header: 'Nama Peserta Magang: '+ ambilNama.nama, width: 45 },
    ];

    

    results.forEach((value) => {
      const checkInValue = value.check_in ? 'Sudah Presensi' : 'Belum Presensi';
      const checkOutValue = value.check_out ? 'Sudah Presensi' : 'Belum Presensi';
      const imageInValue = value.image_url_in ? value.image_url_in : 'Belum Presensi';
      const imageOutValue = value.image_url_out ? value.image_url_out : 'Belum Presensi';

      // Function to set cell background color
      function setCellBackgroundColor(value) {
        return value === 'Sudah Presensi' ? 'FF00FF00' : 'FFFFFFFF';
      }

      
      sheet.addRow({
        tanggal: value.tanggal,
        check_in: checkInValue,
        check_out: checkOutValue,
        image_url_in: imageInValue,
        image_url_out: imageOutValue
      });

      // Set cell background color after adding the row
      sheet.getCell(sheet.rowCount, sheet.getColumn('check_in').number).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: setCellBackgroundColor(checkInValue) }
      };
      sheet.getCell(sheet.rowCount, sheet.getColumn('check_out').number).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: setCellBackgroundColor(checkOutValue) }
      };
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );

    res.setHeader(
      'Content-Disposition',
      `attachment;filename=${fileName} ${tanggal}.xlsx`
    );

    const buffer = await workbook.xlsx.writeBuffer();
    res.end(buffer);
  } catch (error) {
    console.error('An error occurred:', error);
    res.status(500).json({
      message: 'Something went wrong',
      error: error,
    });
  }
}

  
  

module.exports = {
    addAdmin:addAdmin,
    deleteAdmin:deleteAdmin,
    addPeserta:addPeserta,
    showPeserta:showPeserta,
    showPesertaAll:showPesertaAll,
    editPeserta:editPeserta,
    deletePeserta:deletePeserta,
    showPresensiPerDay:showPresensiPerDay,
    showPresensiBelum:showPresensiBelum,
    showPresensiPerPeserta:showPresensiPerPeserta,
    showTugasById:showTugasById,
    showTugasAll:showTugasAll,
    showTugasStatusByTugas:showTugasStatusByTugas,
    addTugas:addTugas,
    editTugas:editTugas,
    deleteTugas:deleteTugas,
    editAdmin:editAdmin,
    exportAdmin: exportAdmin,
    exportPeserta: exportPeserta,
    exportStatusTugas: exportStatusTugas,
    exportPresensiPerTanggal: exportPresensiPerTanggal,
    showAdmin:showAdmin,
    showAdminById:showAdminById,
    showPresensiPeserta: showPresensiPeserta,
    exportPresensiPerPeserta: exportPresensiPerPeserta,
    showPesertaAktifAll:showPesertaAktifAll,
    showPesertaAlumniAll:showPesertaAlumniAll,
    showCalonPesertaAll:showCalonPesertaAll,
    exportPesertaAktif:exportPesertaAktif,
    exportPesertaAlumni:exportPesertaAlumni,
    exportCalonPeserta:exportCalonPeserta
}
