const dotenv = require("dotenv");
dotenv.config();
const mailchimp = require("@mailchimp/mailchimp_transactional")(
  process.env.API_TOKEN
);

const sendEmail = async (
  email,
  firstname,
  lastname,
  discount_code,
  inviter_firstname,
  inviter_lastname
) => {
  const response = await mailchimp.messages.sendTemplate({
    template_name: "Transactional email - reward action",
    template_content: [
      // {
      //   name: "firstname",
      //   content: "Fabio",
      // },
      // {
      //   name: "lastname",
      //   content: "Scheeren",
      // },
      // {
      //   name: "discount_code",
      //   content: "Dit is makkelijk",
      // },
    ],
    message: {
      subject: "Test mailing",
      from_email: "info@freshco.nl",
      from_name: "Freshco Nuth BV",
      to: [
        {
          email: email,
          name: `${firstname} ${lastname}`,
          type: "to",
        },
      ],
      headers: {
        "Reply-To": "info@freshco.nl",
      },
      important: false,
      track_opens: null,
      track_clicks: null,
      auto_text: null,
      auto_html: null,
      inline_css: null,
      url_strip_qs: null,
      preserve_recipients: null,
      view_content_link: null,
      // "bcc_address": "message.bcc_address@example.com",
      tracking_domain: null,
      signing_domain: null,
      return_path_domain: null,
      merge: true,
      merge_language: "handlebars",
      global_merge_vars: [
        {
          name: "firstname",
          content: firstname,
        },
        {
          name: "lastname",
          content: lastname,
        },
        {
          name: "discount_code",
          content: discount_code,
        },
        {
          name: "inviter_firstname",
          content: inviter_firstname,
        },
        {
          name: "inviter_lastname",
          content: inviter_lastname,
        },
      ],
      // "global_merge_vars": [
      //     {
      //         "name": "merge1",
      //         "content": "merge1 content"
      //     }
      // ],
      // "merge_vars": [
      //     {
      //         "rcpt": "recipient.email@example.com",
      //         "vars": [
      //             {
      //                 "name": "merge2",
      //                 "content": "merge2 content"
      //             }
      //         ]
      //     }
      // ],
      // "tags": [
      //     "password-resets"
      // ],
      // "subaccount": "customer-123",
      // "google_analytics_domains": [
      //     "example.com"
      // ],
      // "google_analytics_campaign": "message.from_email@example.com",
      // "metadata": {
      //     "website": "www.example.com"
      // },
      // "recipient_metadata": [
      //     {
      //         "rcpt": "recipient.email@example.com",
      //         "values": {
      //             "user_id": 123456
      //         }
      //     }
      // ],
      // "attachments": [
      //     {
      //         "type": "text/plain",
      //         "name": "myfile.txt",
      //         "content": "ZXhhbXBsZSBmaWxl"
      //     }
      // ],
      // "images": [
      //     {
      //         "type": "image/png",
      //         "name": "IMAGECID",
      //         "content": "ZXhhbXBsZSBmaWxl"
      //     }
      // ]
    },
  });
  console.log(response);
};

module.exports = sendEmail;
