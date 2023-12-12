const { message } = require("antd");

const success = (mes = "Success") => {
  message.success(mes);
};

const error = (mes = "Loi Roi") => {
  message.error(mes);
};

const warning = (mes = "Warning") => {
  message.warning(mes);
};

export { success, error, warning };
