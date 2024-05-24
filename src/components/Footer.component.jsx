import { Link } from "react-router-dom"

const FooterComponent = () => {
  return (
    <footer className="bg-secondary p-3 gap-3 d-flex flex-column justify-content-center align-items-around">
      <div className="d-flex gap-4 justify-content-center">
        <Link to='/' >Home</Link>
        <Link to='/register' >Register</Link>
        <Link to='/items' >Item</Link>
        <Link to='/item-categories' >Item Category</Link>
        <Link to='/divisions' >Divison</Link>
      </div>
      <div className="d-flex justify-content-around">
        <p>@ 2024 EnigmaCamp, Malang</p>
      </div>
    </footer>
  )
}

export default FooterComponent