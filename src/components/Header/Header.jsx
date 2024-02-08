import Style from "./Header.module.css";

export default function Header() {
  return (
    <div className={Style.header}>
      <h2>
        <i>URL Shortner</i>
      </h2>

      <div className={Style.navigation}>
        <ul>
          <li className={Style.navigationList}>Contant</li>
        </ul>

        <div className={Style.profileBurger}></div>
      </div>
    </div>
  );
}
