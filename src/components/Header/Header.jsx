import { SearchBar } from "../SearchBar";
import S from "./Header.module.css";

export function Header() {
  const toggleMode = () => {
    const html = document.getElementById("html");
    html.setAttribute(
      "data-theme",
      html.getAttribute("data-theme") === "dark" ? "light" : "dark"
    );
  };
  return (
    <header class={S.header}>
      <SearchBar />
      <div>
        <input type="checkbox" id="mode" name="mode" onChange={toggleMode} />
        <label for="mode"> Mode</label>
      </div>
    </header>
  );
}
