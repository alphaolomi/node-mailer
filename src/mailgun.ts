import { MAILGUN_API_KEY, MAILGUN_DOMAIN } from "./config";
import * as Mailgun from "mailgun-js";

const mailgun  = new Mailgun({ apiKey: MAILGUN_API_KEY, domain: MAILGUN_DOMAIN });

const data = {
  from: "Excited User <me@samples.mailgun.org>",
  to: "foo@example.com, bar@example.com",
  subject: "Hello",
  text: "Testing some Mailgun awesomeness!",
};

async ()=> {
    const msg = await mailgun.messages().send(data);      
    console.log(msg.message);    
}

