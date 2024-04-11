import React from "react";

import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export const Navbar = () => {
    return (
        <div>
            {/* <========navbar  start=========> */}

            <Container fixed>
                <Toolbar>
                    <Typography component="div" sx={{ flexGrow: 1 }}>
                        <p className="navbar_logo"> Premium URL Shortener</p>
                    </Typography>
                    <ul className="d-flex gap-4 pt-3 pl-4 nabar_menu  ">
                        <li className="list-unstyled ">
                            <a href="/" className="text-muted font-bold">Features</a >
                        </li>
                        <li className="list-unstyled ">
                            <a href='/' className="text-muted font-bold">Pricing</a >
                        </li>
                        <li className="list-unstyled ">
                            <a href="/" className="text-muted font-bold">Login</a >
                        </li>
                    </ul>
                    <Button>
                        <a href="/" className="login_btn">Get Stared</a >
                    </Button>
                </Toolbar>
            </Container>
        </div>
    );
};

export default Navbar;