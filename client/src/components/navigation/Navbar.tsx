import { Box, Stack } from "@mui/material";
import MainAppbar from "./MainAppbar";
import { useSelector } from "react-redux";
import { StoreData } from "../../store/store";
import { UserState } from "../../store/user/types";
import { useNavigate } from "react-router-dom";

interface NavbarProps {
    children?: React.ReactNode;
}

const Navbar: React.FC<NavbarProps> = ({ children }) => {
    const { isAuth, role } = useSelector<StoreData, UserState>(
        (state) => state.user
    );

    const navigate = useNavigate();

    const handleLoginClick = () => navigate("/login");
    const handleAllProjectsClick = () =>
        navigate("/all-projects");

    return (
        <Stack>
            <MainAppbar
                isAuth={isAuth}
                role={role}
                onLoginClick={handleLoginClick}
                onAllProjectsClick={handleAllProjectsClick}
            />
            <Box
                sx={{
                    height: "calc(100vh - 64px)",
                    overflow: "auto",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {children}
            </Box>
        </Stack>
    );
};

export default Navbar;
