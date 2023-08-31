import Setting from "@/models/mongodb/Setting";

const nodemailer = require("nodemailer");

const send_mail = async (email: string, subject: string, html: string) => {
  try {
    const setting = await Setting.findById("64e8586a9fc5ead50982daea");

    console.log("Setting ", setting?.private);

    const transporter = nodemailer.createTransport({
      host: setting?.private?.smtp_host,
      port: Number(setting?.private?.smtp_port || "465"),
      secure: true,
      auth: {
        user: setting?.private?.smtp_user,
        pass: setting?.private?.smtp_password,
      },
    });

    let info = await transporter.sendMail({
      from: `"${setting?.private?.smtp_from}" <${setting?.private?.smtp_user}>`,
      to: email,
      subject,
      html,
    });

    console.log("Email sent: %s", info.messageId);
  } catch (error) {
    console.log(error, "email not sent");
  }
};

export default send_mail;
