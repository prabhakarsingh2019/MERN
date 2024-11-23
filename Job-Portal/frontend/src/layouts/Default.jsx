import Navbar from "../components/Navbar";

const DefaultLayout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <main>{children}</main>
    </div>
  );
};
export default DefaultLayout;
