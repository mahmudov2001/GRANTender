import Darkmode from "darkmode-js";
import "./DarkLightMode.scss";

const DarkLightMode = () => {
  const options = {
    bottom: "30px",
    right: "30px",
    time: "0.5s",
    mixColor: "#fff",
    backgroundColor: "#fff",
    buttonColorDark: "#100f2c",
    buttonColorLight: "#fff",
    saveInCookies: false,
    label: "🌓",
    autoMatchOsTheme: true,
  };

  const darkmode = new Darkmode(options);
  darkmode.showWidget();

  return <></>;
};

export default DarkLightMode;
