import logo from "@/assets/img/logo.svg";
import PillNav from "@/components/animations/PillNav/PillNav";
import Dock from "../animations/Dock/Dock";
import {
  VscHome,
  VscArchive,
  VscAccount,
  VscSettingsGear,
} from "react-icons/vsc";

function Header() {
  const items = [
    {
      icon: <VscHome size={18} />,
      label: "About",
      onClick: () =>
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <VscArchive size={18} />,
      label: "History",
      onClick: () =>
        document
          .getElementById("history")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <VscAccount size={18} />,
      label: "Profile",
      onClick: () =>
        document
          .getElementById("codetodesign")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
    {
      icon: <VscSettingsGear size={18} />,
      label: "Settings",
      onClick: () =>
        document
          .getElementById("whatwedo")
          ?.scrollIntoView({ behavior: "smooth" }),
    },
  ];
  return (
    <>
      {/* <img
        className="w-15 mx-auto absolute top-5 left-1/2 -translate-x-1/2"
        src={logo}
        alt="logo"
      /> */}
      <Dock
        className="space-x-3"
        items={items}
        panelHeight={35}
        baseItemSize={35}
        magnification={42}
      />
    </>
  );
}

export default Header;
