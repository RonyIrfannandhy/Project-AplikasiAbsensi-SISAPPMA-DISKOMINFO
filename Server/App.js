const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');



const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

const accountRoute = require('./routes/Account');
const adminRoute = require('./routes/Admin');
const userRoute = require('./routes/User');
const imageRoute = require('./routes/Image');
const corsOptions = {
    credentials: true, // Mengizinkan pengiriman kredensial (kuki, header, dll.)
    origin: ['http://localhost:3001', 'http://192.168.1.32:3001', 'https://diskominfo-smg-magang.cloud']
};


app.use(cors(corsOptions));
app.use("/account",accountRoute);
app.use("/admin",adminRoute);
app.use("/user",userRoute);
app.use("/images",imageRoute);
app.use("/uploads", express.static('uploads'));


////tambahan////
const fs = require("fs");
const path = require("path");
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

app.post("/generateDocx", (req, res) => {
  try {
    const { data } = req.body;
  
    // Load the docx file as binary content
    const content = fs.readFileSync(path.resolve(__dirname, "input.docx"), "binary");
  
    // Unzip the content of the file
    const zip = new PizZip(content);
  
    // This will parse the template, and will throw an error if the template is
    // invalid, for example, if the template is "{user" (no closing tag)
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
  
    // Render the document
    doc.render(data);
  
    // Get the zip document and generate it as a nodebuffer
    const buf = doc.getZip().generate({
      type: "nodebuffer",
      compression: "DEFLATE",
    });
  
    // Set response headers for file download
    res.setHeader("Content-Disposition", "attachment; filename=output.docx");
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  
    // Send the file buffer as response
    res.send(buf);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});






module.exports = app;