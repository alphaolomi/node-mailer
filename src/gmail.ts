import GMailService from "./services/gmail-service";

let gmailService = new GMailService();

gmailService.sendMail("<test_user>@gmail.com", "Hello", "Hello from gmailService");
