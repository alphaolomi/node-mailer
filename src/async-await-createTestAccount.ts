import * as nodemailer from "nodemailer";

async function main() {
  let testAccount: nodemailer.TestAccount = await nodemailer.createTestAccount();

  console.log("Credentials obtained, sending message...");
  const advanced_options = {
    host: testAccount.smtp.host,
    port: testAccount.smtp.port,
    secure: testAccount.smtp.secure,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
    logger: true,
    debug: false, // include SMTP traffic in the logs
  };
  const advanced = {
    from: "Nodemailer <example@nodemailer.com>",
    headers: {
      "X-Laziness-level": 1000, // just an example header, no need to use this
    },
  };

  // 2. 
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });


  let message = {
    to: "Nodemailer <example@nodemailer.com>",
    subject: "Nodemailer is unicode friendly ✔" + Date.now(),
    text: "Hello to myself!",
    html: `<p><b>Hello</b> to myself <img src="cid:note@example.com"/></p>
        <p>Here's a nyan cat for you as an embedded attachment:<br/><img src="cid:nyan@example.com"/></p>`,
    amp: `<!doctype html>
        <html ⚡4email>
          <head>
            <meta charset="utf-8">
            <style amp4email-boilerplate>body{visibility:hidden}</style>
            <script async src="https://cdn.ampproject.org/v0.js"></script>
            <script async custom-element="amp-anim" src="https://cdn.ampproject.org/v0/amp-anim-0.1.js"></script>
          </head>
          <body>
            <p><b>Hello</b> to myself <amp-img src="https://cldup.com/P0b1bUmEet.png" width="16" height="16"/></p>
            <p>No embedded image attachments in AMP, so here's a linked nyan cat instead:<br/>
              <amp-anim src="https://cldup.com/D72zpdwI-i.gif" width="500" height="350"/></p>
          </body>
        </html>`,

    attachments: [
      {
        filename: "notes.txt",
        content: "Some notes about this e-mail",
        contentType: "text/plain", // optional, would be detected from the filename
      },

      {
        filename: "image.png",
        content: Buffer.from(
          "iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAABlBMVEUAAAD/" +
            "//+l2Z/dAAAAM0lEQVR4nGP4/5/h/1+G/58ZDrAz3D/McH8yw83NDDeNGe4U" +
            "g9C9zwz3gVLMDA/A6P9/AFGGFyjOXZtQAAAAAElFTkSuQmCC",
          "base64"
        ),
        cid: "note@example.com",
      },
      {
        filename: "nyan cat ✔.gif",
        path: __dirname + "/assets/nyan.gif",
        cid: "nyan@example.com", // should be as unique as possible
      },
    ],

    list: {
      help: "admin@example.com?subject=help",
      unsubscribe: [
        {
          url: "http://example.com/unsubscribe",
          comment: "A short note about this url",
        },
        "unsubscribe@example.com",
      ],
      id: {
        url: "mylist.example.com",
        comment: "This is my awesome list",
      },
    },
}

let msg = {
  from: '"Fred Foo 👻" <foo@example.com>', // sender address
  to: "bar@example.com, baz@example.com", // list of receivers
  subject: "Hello ✔", // Subject line
  text: "Hello world?", // plain text body
  html: "<b>Hello world?</b>", // html body
};

  let info = await transporter.sendMail(msg);

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
