import { Link } from "react-router-dom";

const FooterComponent = () => {
  return (
    <footer className="bg-secondary p-3 gap-3 d-flex flex-column justify-content-center align-items-around rounded-4">
      <div className="d-flex gap-4 justify-content-center">
        <Link className="text-white text-decoration-none" to="/">
          Home
        </Link>
        <Link className="text-white text-decoration-none" to="/user">
          User
        </Link>
        <Link className="text-white text-decoration-none" to="/items">
          Item
        </Link>
        <Link className="text-white text-decoration-none" to="/item-categories">
          Item Category
        </Link>
        <Link className="text-white text-decoration-none" to="/divisions">
          Divison
        </Link>
      </div>
      <div className="d-flex justify-content-around fw-medium text-white">
        <p>@ 2024 EnigmaCamp, Malang</p>
      </div>
    </footer>
  );
};

export default FooterComponent;
