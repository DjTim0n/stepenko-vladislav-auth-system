import Image from "next/image";
import logo from "../../public/logo.png";

export const Logo = () => {
  return (
    <>
      <Image src={logo} alt="NoImage" width={200} height={100} />
    </>
  );
};
