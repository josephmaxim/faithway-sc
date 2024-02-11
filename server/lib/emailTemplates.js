const { findEventValue } = require("#utils/commons.js")

const studentRegistrationEmailTemplate = (data) => {
  const { _id, fullName, gender, grade, church, selectedEvents, mathGrade } = data;

  const eventList = selectedEvents.map((i) => {
    const event = findEventValue(i)
    return `<li>${event} ${event == "Math" ? `(Grade ${mathGrade})`: ""}</li>`;
  }).join('');

  return emailTemplateLayout({
    heading: `Student Registration Confirmation`,
    content: `
      <table class="my-table">
        <tbody>
          <tr>
            <td><span class="td-label">Name:</span><span>${fullName}</span></td>
            <td><span class="td-label">Gender:</span><span>${gender}</span></td>
          </tr>
          <tr>
            <td><span class="td-label">Church:</span><span>${church}</span></td>
            <td><span class="td-label">Grade:</span><span>${grade}</span></td>
          </tr>
        </tbody>  
      </table>
      <div class="events">
        <h4>Events:</h4>
        <ul>
          ${eventList}
        </ul>
      </div>
    `,
    footer: `
      <p>To address any questions or modifications to your registration please reply to this email or contact <a href="mailto:dlindhorst@faithway.org">dlindhorst@faithway.org</a></p>
      <p class="student-id">Student ID: <a href="https://sc.faithway.org/dashboard/students/${_id}">${_id}</a></p>
    `,
    style: `
      .my-table {
        display: table;
        width: 100%;
        margin: 15px 0px;
      }
      td {
        font-size: 14px;
        padding: 5px 0px;
      }
      .td-label {
        width: 65px;
        text-align: left;
        display: inline-block;
        color: #777;
        font-weight: 300;
      }
      td span {
        color: #222;
        font-weight: 600;
      }
      .events {
        min-height: 200px;
        border-top: 1px solid #e2e2e2;
        padding: 15px 0px;
      }

      .events h4 {
        margin: 15px 0px;
        font-weight: 600;
        color: #777;
      }

      .events ul {
        padding: 0;
        margin: 0;
      }

      .events ul li {
        list-style: none;
        margin-bottom: 15px;
        margin-left: 0px;
        font-size: 16px;
      }

      .student-id {
        font-size: 10px;
      }

      .student-id a {
        color: #777;
      }

      @media (max-width:720px) {
        td {
          display: flex;
        }
      }

    `
  });
}

const emailTemplateLayout = ({heading, content, footer, style}) => {
  return `<html>
    <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
      <meta charSet="utf-8"/>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"/>
      <meta name="HandheldFriendly" content="true"/>
      <style>
          body {
            font-family: BlinkMacSystemFont,-apple-system,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue";
            margin: 0;
            color: #222;
            background: #FFFFFF;
          }

          .container {
            max-width: 700px; 
            margin: 0 auto;
          }

          .header a {
            display: block;
            margin: 50px auto;
          }
          .header .logo {
            display: block;
            width: 220px;
            height: auto;
            margin: 0 auto;
          }

          .header p {
            background: rgb(250, 250, 250);
            width: 100%;
            padding: 15px 0px;
            text-align: center;
            font-size: 18px;
            font-weight: 00;
            margin: 0 0 10px 0;
          }

          .content {
            min-height: 200px;
            border-bottom: 1px solid #e2e2e2;
            padding: 15px 0px;
          }

          .footer {
            text-align: center;
            font-size: 14px;
            line-height: 1.5;
          }

          .footer .footer-logo img{
            margin-top: 20px;
            display: inline-block;
            width: 130px;
          }

          a {
            color: rgb(44, 117, 213);
            text-decoration: none;
          }

          hr {
            border-top: 0px;
            border-bottom: 1px solid #e2e2e2;
          }

          @media (max-width:720px) {
            .container {
              padding: 0px 15px;
            }
          }

          /* Code here */
          ${style}
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <a href="https://sc.faithway.org" target="_blank">
            <img class="logo" src="https://sc.faithway.org/img/sc-logo.png" alt="Christian Student Convention" />
          </a>
          <p>${heading}</p>
        </div>
        <div class="content">
          ${content}
        </div>
        <br/>
        <div class="footer">
          <div>
            ${footer}
          </div>
          <a class="footer-logo" href="https://www.faithway.org" target="_blank">
            <img src="https://sc.faithway.org/img/fw-logo.png" alt="FaithWay Baptist Church">
          </a>
        </div>
      </body>
    </body>
  </html>`;
}

const billetingEmailTemplate = (data) => {
  const { _id, church, primaryContact, phone, list } = data;
  return emailTemplateLayout({
    heading: `Billeting Confirmation`,
    content: `
      <table class="my-table">
        <tbody>
          <tr>
            <td><span class="td-label">Church:</span><span>${church}</span></td>
          </tr>
          <tr>
            <td><span class="td-label">Primary Contact:</span><span>${primaryContact}</span></td>
            <td><span class="td-label">Phone Number:</span><span>${phone}</span></td>
          </tr>
        </tbody>  
      </table>
      <hr/>
      <div>
        ${list.female.length > 0 ?
          `
            <h4>Female Students:</h4>
            <ul>
              ${list.female.map((i) => {return `<li>${i}</li>`}).join('\n')}
            </ul>
          `
        : ''}

        ${list.male.length > 0 ?
          `
            <h4>Male Students:</h4>
            <ul>
              ${list.male.map((i) => {return `<li>${i}</li>`}).join('\n')}
            </ul>
          `
        : ''}

        ${list.sponsor.length > 0 ?
          `
            <h4>Sponsors:</h4>
            <ul>
              ${list.sponsor.map((i) => {return `<li>${i}</li>`}).join('\n')}
            </ul>
          `
        : ''}
      </div>
    `,
    footer: `
      <div>
        <p>To address any questions or modifications to your billeting submission reply to this email or contact <a href="mailto:dlindhorst@faithway.org">dlindhorst@faithway.org</a></p>
        <p class="billeting-id">Billeting ID: <a href="https://sc.faithway.org/dashboard/billeting/${_id}">${_id}</a></p>
      </div>
    `,
    style: `
      .my-table {
        display: table;
        width: 100%;
        margin: 0px 0px;
      }

      td {
        font-size: 14px;
        padding: 5px 0px;
      }
      .td-label {
        width: 120px;
        text-align: left;
        display: inline-block;
        color: #777;
        font-weight: 300;
      }
      td span {
        color: #222;
        font-weight: 600;
      }

      h4 {
        margin: 15px 0px;
        font-weight: 600;
        font-size: 14px;
        color: #777;
      }

      ul {
        padding: 0;
        margin: 0 0 25px 0;
      }

      li {
        margin-bottom: 15px;
        margin-left: 15px;
        font-size: 16px;
        color: #222222;
      }

      .billeting-id {
        font-size: 10px;
      }

      .billeting-id a {
        color: #777;
      }

      @media (max-width:720px) {
        td {
          display: flex;
        }
      }
    `
  });
}

module.exports = {
  studentRegistrationEmailTemplate,
  emailTemplateLayout,
  billetingEmailTemplate,
}