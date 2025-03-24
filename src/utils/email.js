import axios from "axios";
const mailHost = import.meta.env.VITE_PUBLIC_EMAIL_SVR;
const useEmail = () => {
  const sendWelcomeEmail = (client, emailTo, subject, name, host) => {
    axios
      .post(mailHost + "/send-welcome-email", {
        client: client,
        to: emailTo,
        subject: subject,
        name: name,
        host: host,
      })
      .then((response) => {
        alert(
          "Account Created Successully. Please check your email to verify your account before logging in."
        );
      })
      .catch((error) => {
        alert("Error sending email");
        //console.error(error);
      });
  };

  const sendNewPersonelEmail = (
    client,
    emailTo,
    facility,
    name,
    role,
    addedBy,
    newUserId
  ) => {
    console.log(
      "Sending email new user ",
      name,
      mailHost + "/send-new-user-email"
    );

    axios
      .post(mailHost + "/send-new-user-email", {
        to: emailTo,
        facility: facility,
        name: name,
        client: client,
        role: role,
        addedBy: addedBy,
        newUserId: newUserId,
      })
      .then((response) => {
        alert(
          `An email has been sent to ${name} informing them of their new role.`
        );
      })
      .catch((error) => {
        alert("Error sending email");
        console.error(error);
      });
  };
  return { sendWelcomeEmail, sendNewPersonelEmail };
};

export default useEmail;
