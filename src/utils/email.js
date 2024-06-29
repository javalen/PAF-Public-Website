import axios from "axios";

const useEmail = () => {
  const sendWelcomeEmail = (client, emailTo, subject, name) => {
    //console.log("Sending email", emailTo, subject, name);

    axios
      .post(process.env.VITE_PUBLIC_EMAIL_SVR + "/send-welcome-email", {
        client: client,
        to: emailTo,
        subject: subject,
        name: name,
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
      process.env.EXPO_PUBLIC_EMAIL_SVR + "/send-new-user-email"
    );

    axios
      .post(process.env.EXPO_PUBLIC_EMAIL_SVR + "/send-new-user-email", {
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
