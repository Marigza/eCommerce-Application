import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select/";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import "./Sorting.scss";

interface SortingProps {
  selectedSort: string;
  onSortChange: (sort: string) => void;
}

const Sorting: React.FC<SortingProps> = ({ selectedSort, onSortChange }) => {
  return (
    <FormControl>
      <InputLabel id="demo-simple-select-label"></InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedSort}
        label="Age"
        onChange={(event) => onSortChange(event.target.value as string)}
      >
        <MenuItem value="price asc" className="item">
          <AttachMoneyIcon style={{ fontSize: "4vh" }} />
          <ExpandLessRoundedIcon style={{ fontSize: "4vh" }} />
        </MenuItem>
        <MenuItem value="price desc" className="item">
          <AttachMoneyIcon style={{ fontSize: "4vh" }} />
          <ExpandMoreRoundedIcon style={{ fontSize: "4vh" }} />
        </MenuItem>
        <MenuItem value="name.en-US asc" className="item">
          <AbcOutlinedIcon style={{ fontSize: "4vh" }} />
          <ExpandLessRoundedIcon style={{ fontSize: "4vh" }} />
        </MenuItem>
        <MenuItem value="name.en-US desc" className="item">
          <AbcOutlinedIcon style={{ fontSize: "4vh" }} />
          <ExpandMoreRoundedIcon style={{ fontSize: "4vh" }} />
        </MenuItem>
      </Select>
    </FormControl>
  );
};

export default Sorting;
