import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';


const NavbarComponent = () => {
  return (
      <Sidebar>
        <Menu
          menuItemStyles={{
            button: {
              [`&.active`]: {
                backgroundColor: '#13395e',
                color: '#b6c8d9',
              },
            },
          }}
        >
          <MenuItem component={<Link to="/login" />}> login</MenuItem>
          <MenuItem component={<Link to="/register" />}> register</MenuItem>
          <MenuItem component={<Link to="/app" />}> dashboard</MenuItem>
        </Menu>
      </Sidebar>
  )
}

export default NavbarComponent