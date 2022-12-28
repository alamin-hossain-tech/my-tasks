import Header from "../Header/Header";

export default function Layout({ children }) {
  return (
    <>
      <Header></Header>
      <main>{children}</main>
    </>
  );
}
