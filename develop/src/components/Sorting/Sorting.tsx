import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import SwapVertRoundedIcon from "@mui/icons-material/SwapVertRounded";
import "./Sorting.scss";

interface SortingProps {
  selectedSort: string;
  onSortChange: (sort: string) => void;
}

const Sorting: React.FC<SortingProps> = ({ selectedSort, onSortChange }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [activeItem, setActiveItem] = React.useState<string>(selectedSort);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (sort: string) => {
    onSortChange(sort);
    setActiveItem(sort);
    handleClose();
  };

  return (
    <div>
      <Button
        aria-controls="sorting-menu"
        aria-haspopup="true"
        onClick={handleClick}
        sx={{
          backgroundColor: "hsl(0, 0%, 96%)",
          borderRadius: "50%",
          height: "100%",
          minWidth: "0",
          width: "8vh",
          "& .MuiButton-label": {
            color: "black",
          },
          "&:hover": {
            backgroundColor: "hsl(0, 0%, 96%)",
          },
        }}
      >
        <SwapVertRoundedIcon style={{ color: "black", fontSize: "5vh" }} />
      </Button>
      <Menu id="sorting-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          onClick={() => handleMenuItemClick("price asc")}
          selected={activeItem === "price asc"}
        >
          Price: from low to high
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("price desc")}
          selected={activeItem === "price desc"}
        >
          Price: from high to low
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("name.en-US asc")}
          selected={activeItem === "name.en-US asc"}
        >
          Alphabet: from beginning
        </MenuItem>
        <MenuItem
          onClick={() => handleMenuItemClick("name.en-US desc")}
          selected={activeItem === "name.en-US desc"}
        >
          Alphabet: from the end
        </MenuItem>
      </Menu>
    </div>
  );
};

export default Sorting;
