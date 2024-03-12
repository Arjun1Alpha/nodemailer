const puppeteer = require('puppeteer');

let pdfGenerator = async (req) => {
    try {
        const htmlContent = `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Certificate</title>
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400..700&display=swap" rel="stylesheet">
            <style>
                html, body {
                    font-family: Arial, sans-serif;
                    width: 1100px;
                    height: 650px;
                    margin: 10px;
                    /* padding: 10px; */
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    
                }
                body{
                    background: url('https://www.pngkey.com/png/detail/340-3406929_borders-and-frames-standard-paper-size-microsoft-word.png');
                    background-size: cover;
                    background-repeat: no-repeat;
                }
                .certificate {
                    padding: 10px;
                    /* border: 2px solid black; */
                    text-align: center;
                }
                .large-text {
                    font-family: "Dancing Script", cursive;
                    font-optical-sizing: auto;
                    font-style: normal;
                    font-size: 50px;
                }
                .mediam-text{
                    font-family: "Dancing Script", cursive;
                    font-size: 30px;
                    margin: 10px;
                }
            </style>
        </head>
        <body>
            <div class="certificate">
                <div class="large-text">Certificate of Completion</div>
                <p class="mediam-text">This is to certify that</p>
                <p class="large-text">Bolo Jai Hind</p>
                <p class="mediam-text">${req}</p>
            </div>
        </body>
        </html>        
        `

        let optionsPDF = {
            path: 'print.pdf',
            printBackground: true,
            // format: 'A4',
            width: '11in', // Width of the PDF
            height: '7in', // Height of the PDF
            // margin: {
            //     top: '0.5in',
            //     right: '0.5in',
            //     bottom: '0.5in',
            //     left: '0.5in'
            // },
            orientation:"Landscape",
            preferCSSPageSize: false
        }

        const browser = await puppeteer.launch()
        const [page] = await browser.pages()
        await page.setContent(htmlContent);
        await page.waitForSelector('.certificate');
        
        const contentSize = await page.evaluate(() => {
            const element = document.querySelector('.certificate');
            const rect = element.getBoundingClientRect();
            // optionsPDF.width = rect.width;
            // optionsPDF.height = rect.height;
            return {
                width: rect.width,
                height: rect.height
            };
        });
        await page.pdf(optionsPDF);
    
        // Generate PDF
        const pdfBuffer = await page.pdf(optionsPDF);

        await browser.close();

        // Send the PDF as response
        // res.setHeader('Content-Type', 'application/pdf');
        // res.send(pdfBuffer);
        return pdfBuffer
    } catch (error) {
        console.error('Error generating certificate:', error);
        // res.status(500).send('Error generating certificate');
    }
}



module.exports = pdfGenerator