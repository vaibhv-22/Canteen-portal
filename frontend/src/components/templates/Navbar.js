import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = () => {
  const navigate = useNavigate();
  // const type = (JSON.parse(localStorage.getItem('user'))).user_type;
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          {localStorage.hasOwnProperty('user') ?

                ((JSON.parse(localStorage.getItem('user')).user_type==="Vendor") ?
                (<>
                <Box sx={{ flexGrow: 1 }} />
                <Button color="inherit" onClick={() => navigate("/food_dash")}>
                MY FOOD DASHBOARD
                </Button>
                <Button color="inherit" onClick={() => navigate("/vendor_orders")}>
                ORDERS
                </Button>
                <Button color="inherit" onClick={() => navigate("/stat")}>
                STATS
                </Button>
                <Button color="inherit" onClick={() => navigate("/profile")}>
                MY PROFILE
                </Button>
                <Button color="inherit" onClick={() => {localStorage.clear(); navigate("/register")}}>
                LOGOUT
                </Button>
                </>)
                :
              
                (<>
                <Box sx={{ flexGrow: 1 }} />
                <Button color="inherit" onClick={() => navigate("/buy_food")}>
                ORDER FOOD
                </Button>
                <Button color="inherit" onClick={() => navigate("/buy_myorders")}>
                MY ORDERS
                </Button>
                <Button color="inherit" onClick={() => navigate("/profile")}>
                MY PROFILE
                </Button>
                <Button color="inherit" onClick={() => {localStorage.clear(); navigate("/register")}}>
                LOGOUT
                </Button>
                </>))
                :
            (<>
            <Box sx={{ flexGrow: 1 }} />
            <Button color="inherit" onClick={() => navigate("/register")}>
            REGISTER
          </Button>
          <Button color="inherit" onClick={() => navigate("/login")}>
            LOGIN
          </Button>
            </>)

          }
          
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
