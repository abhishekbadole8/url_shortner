import Style from "./Footer.module.css";

export default function Footer() {
  return (
    <div className={Style.footer}>
      <div className={Style.container}>
        <span className={Style.credit}>
          Made with ❤️ by Abhishek Badole
        </span>
      </div>
    </div>
  );
};
