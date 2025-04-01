import { IRegisterSchema } from "@/models/register";
import nodemailer from "nodemailer";

const generateHTML = async (data: IRegisterSchema) => {
  try {
    const splittedPaths = data.file.path.split("\\");
    const pathURL = `${process.env.APP_URL}/${splittedPaths.slice(splittedPaths.length - 1)}`

    return `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Registration Details</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            background-color: #f4f4f4;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background: #fff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
            color: #333;
            text-align: center;
        }
        table {
            width: 100%;
            border-collapse: collapse;
        }
        table, th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background: #007bff;
            color: white;
        }
        .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #777;
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>New Registration Details</h2>
        <table>
            <tr><th>Field</th><th>Value</th></tr>
            <tr><td>Company Name</td><td>${data.companyName}</td></tr>
            <tr><td>Physical Address</td><td>${data.physicalAddress}</td></tr>
            <tr><td>Contact Address</td><td>${data.contactAddress}</td></tr>
            <tr><td>Website</td><td>${data.website}</td></tr>
            <tr><td>Contact Email</td><td>${data.contactEmail}</td></tr>
            <tr><td>Contact Phone</td><td>${data.contactPhone}</td></tr>
            <tr><td>First Name</td><td>${data.firstName}</td></tr>
            <tr><td>Last Name</td><td>${data.lastName}</td></tr>
            <tr><td>Title</td><td>${data.title}</td></tr>
            <tr><td>State</td><td>${data.state}</td></tr>
            <tr><td>Zip Code</td><td>${data.zipCode}</td></tr>
            <tr><td>Business Type</td><td>${data.businessType}</td></tr>
            <tr><td>Agents Number</td><td>${
              data.agentsNumber || "N/A"
            }</td></tr>
            <tr><td>Ports Number</td><td>${data.portsNumber || "N/A"}</td></tr>
            <tr><td>IP Address</td><td>${data.ipAddress || "N/A"}</td></tr>
            <tr><td>Campaign</td><td>${data.campaign}</td></tr>
            <tr><td>Additional Info</td><td>${
              data.additionalInfo || "N/A"
            }</td></tr>
            <tr><td>Role</td><td>${data.role}</td></tr>
            <tr><td>Created At</td><td>${data.createdAt}</td></tr>
            <tr><td>Updated At</td><td>${data.updatedAt}</td></tr>
            <tr><td>File Name</td><td>${data.file.filename}</td></tr>
            <tr><td>File Path</td><td>${data.file.path}</td></tr>
            <tr><td>File Size</td><td>${data.file.size} bytes</td></tr>
            <tr><td>File Type</td><td>${data.file.mimetype}</td></tr>
        </table>
        <p class="footer">This is an automated email. Please do not reply.</p>
    </div>

    <div style="text-align:center;">
      <h3>Attachment</h3>
      ${
        data.file.mimetype === "application/pdf"
          ? `<iframe src="${pathURL}" width="100%" height="600px"></iframe>`
          : `<img src="${pathURL}" alt="Uploaded Image" width="100" height="100" style="border:1px solid #ddd; border-radius:4px; padding:5px;">`
      }
    </div>
</body>
</html>`;
  } catch (error) {
    console.error("Error generating HTML:", error);
    return `<p>Error loading image.</p>`;
  }
};

export const transporter = nodemailer.createTransport({
  host: "in-v3.mailjet.com", // Mailjet SMTP Host
  port: 465, // Secure SSL port (Use 587 for STARTTLS)
  secure: true, // True for 465, false for 587
  auth: {
    user: "db4bf86dc877ac7a172f68a4dca2b848", // Mailjet API Key
    pass: "4d357850fdf8bebf355da5bb54be3d01", // Mailjet Secret Key
  },
});

transporter.verify((error) => {
  if (error) {
    console.error("Mailjet Connection Error:", error);
  } else {
    console.log("Mailjet SMTP Connected Successfully");
  }
});

export async function sendEmail({
  to,
  subject = "null",
  text = "null",
  data = null,
}: {
  to: string;
  subject: string;
  text: string;
  data: null | IRegisterSchema;
}) {
  if (data) {
    const html = await generateHTML(data);
    const info = await transporter.sendMail({
      from: '"no-reply" <noreply@vopial.com>',
      to: to, // list of receivers
      subject: subject, // Subject line
      text: text, // plain text body
      html: html,
    });
    return info;
  }
  return null;
}
