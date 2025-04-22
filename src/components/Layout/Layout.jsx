import { Header } from "../Header";
import S from "./Layout.module.css";

export function Layout(props) {
  return (
    <div class={S.layout}>
      <Header />
      {props.children}
      <h1>LAYOUT</h1>
    </div>
  );
}
