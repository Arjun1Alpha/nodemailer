const nodemailer = require("nodemailer");
const pdfGenerator = require("./pdfGenerator")
let sendMail = async(req, res) => {
    
    const data = req.body;
    try {
        let transporter = nodemailer.createTransport({
            service:"gmail",
            secure: false,
            auth: {
                user: process.env.userEmail,
                pass: process.env.userPassword
            }
        })
        let keysInfo= []
        data.forEach(async(element) => {
          let pdf = await pdfGenerator(element.name)
          let info = await transporter.sendMail({
              from: process.env.userEmail,
              to: element.recipientEmail,
              subject: process.env.emailSubject,
              text:  process.env.emailSubject,
              html: `<!DOCTYPE html>
              <html lang="en">
              <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Invitation to Collaborate</title>
                <style>
                  body {
                    font-family: Arial, sans-serif;
                    line-height: 1.6;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f4;
                  }
                  .container {
                    max-width: 600px;
                    margin: 20px auto;
                    background-color: #fff;
                    padding: 20px;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                  }
                  h1, p {
                    margin: 0 0 20px;
                  }
                  .btn {
                    display: inline-block;
                    padding: 10px 20px;
                    background-color: #007bff;
                    color: #fff;
                    text-decoration: none;
                    border-radius: 5px;
                  }
                  .btn:hover {
                    background-color: #0056b3;
                  }
                </style>
              </head>
              <body>
                <div class="container">
                  <h1>Invitation to Collaborate on Exciting Projects</h1>
                  <p>
                      Dear <strong> ${element.name},</strong>
                  </p>
                  <p>
                    I hope this message finds you well. My name is ${process.env.userName}, and I am reaching out to you on behalf of our development team.
                  </p>
                  <p>
                    We're currently gearing up for exciting upcoming projects and believe that your expertise could make a valuable contribution. We've been impressed by your work and believe that your skills in ${element.skill} could greatly enhance our projects.
                  </p>
                  <p>
                    We're seeking developers who are enthusiastic about pushing boundaries and collaborating to create innovative solutions. Your unique perspective and experience could greatly enhance the success of our projects.
                  </p>
                  <p>
                    If you're interested, we'd love to discuss further details and answer any questions you may have. Please let us know if you're open to discussing this further.
                  </p>
                  <p>
                    Looking forward to hearing from you soon!
                  </p>
                  <p>Best regards,<br>${process.env.userName}<br> ${process.env.userPosition}</p>
                  <a href="mailto:${process.env.userEmail}" style="color: #fff" class="btn">Reply to Email</a>
                </div>
              </body>
              </html>`,
              attachments: [
                {
                  filename:"certificate.pdf",
                  content:pdf
                }
              ]
          })
          keysInfo.push(info)
        });
        
        res.send({"message": keysInfo});
    } catch (error) {
        res.send({"message": error});
    }
}


module.exports = sendMail