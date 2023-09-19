import React, { useState } from "react";
import "./Filter.scss";
import { Box, Button, Drawer } from "@mui/material";
import FilterAltRoundedIcon from "@mui/icons-material/FilterAltRounded";

interface FilterProps {
  onSearch: (searchString: string) => void;
}
type Anchor = "left";
const Filter: React.FC<FilterProps> = ({ onSearch }) => {
  const [isAnyCheckboxSelected, setIsAnyCheckboxSelected] = useState(false);
  const handleClearAll = () => {
    document
      .querySelectorAll<HTMLInputElement>('input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        checkbox.checked = false;
      });
    setIsAnyCheckboxSelected(false);
    onSearch("");
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const selectedAttributes: Record<string, string> = {
      Memory: "",
      Color: "",
      Resolution: "",
      Brand: "",
    };

    for (let i = 0; i < form.elements.length; i++) {
      const element = form.elements[i] as HTMLInputElement;
      if (element.type === "checkbox" && element.checked) {
        selectedAttributes[element.name] += selectedAttributes[element.name]
          ? `,"${element.value}"`
          : `"${element.value}"`;
      }
    }
    const selectedMemory = selectedAttributes.Memory
      ? `filter=variants.attributes.Memory:${selectedAttributes.Memory}`
      : "";
    const selectedColor = selectedAttributes.Color
      ? `filter=variants.attributes.Color:${selectedAttributes.Color}`
      : "";
    const selectedResolution = selectedAttributes.Resolution
      ? `filter=variants.attributes.Resolution:${selectedAttributes.Resolution}`
      : "";
    const selectedBrand = selectedAttributes.Brand
      ? `filter=variants.attributes.Brand:${selectedAttributes.Brand}`
      : "";
    const filters = [selectedMemory, selectedColor, selectedResolution, selectedBrand].filter(
      Boolean
    );
    const queryString = filters.join("&");
    onSearch(queryString);
    const anySelected =
      Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).length > 0;

    setIsAnyCheckboxSelected(anySelected);
  };
  const [state, setState] = React.useState({
    left: false,
  });
  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box sx={{ width: "40vh", height: "100%" }} role="presentation">
      <div className="catalog-filter">
        <form onSubmit={handleSearchSubmit}>
          <h2 className="filter-title">Colors</h2>
          <div className="catalog-filter__colors">
            <input type="checkbox" name="Color" value="White" id="color-white" />
            <label htmlFor="color-white">White</label>
            <input type="checkbox" name="Color" value="Black" id="color-black" />
            <label htmlFor="color-black">Black</label>
            <input type="checkbox" name="Color" value="Gray" id="color-gray" />
            <label htmlFor="color-gray">Gray</label>
          </div>

          <h2 className="filter-title">Brand</h2>
          <div className="catalog-filter__brand">
            <input type="checkbox" name="Brand" value="Samsung" id="brand-samsung" />
            <label htmlFor="brand-samsung">Samsung</label>
            <input type="checkbox" name="Brand" value="Apple" id="brand-apple" />
            <label htmlFor="brand-apple">Apple</label>
            <input type="checkbox" name="Brand" value="Honor" id="brand-honor" />
            <label htmlFor="brand-honor">Honor</label>
            <input type="checkbox" name="Brand" value="Lenovo" id="brand-lenovo" />
            <label htmlFor="brand-lenovo">Lenovo</label>
            <input type="checkbox" name="Brand" value="Xiaomi" id="brand-xiaomi" />
            <label htmlFor="brand-xiaomi">Xiaomi</label>
            <input type="checkbox" name="Brand" value="Huawei" id="brand-huawei" />
            <label htmlFor="brand-huawei">Huawei</label>
          </div>

          <h2 className="filter-title">Screen resolution</h2>
          <div className="catalog-filter__resolution">
            <input type="checkbox" name="Resolution" value="4K" id="resolution-uhd" />
            <label htmlFor="resolution-uhd">4K</label>
            <input type="checkbox" name="Resolution" value="2K" id="resolution-qhd" />
            <label htmlFor="resolution-qhd">2K</label>
            <input type="checkbox" name="Resolution" value="FullHD" id="resolution-fullhd" />
            <label htmlFor="resolution-fullhd">FullHD</label>
            <input type="checkbox" name="Resolution" value="HD" id="resolution-hd" />
            <label htmlFor="resolution-hd">HD</label>
          </div>

          <h2 className="filter-title">Memory size</h2>
          <div className="catalog-filter__resolution">
            <input type="checkbox" name="Memory" value="4GB" id="memory-4gb" />
            <label htmlFor="memory-4gb">4GB</label>
            <input type="checkbox" name="Memory" value="8GB" id="memory-8gb" />
            <label htmlFor="memory-8gb">8GB</label>
            <input type="checkbox" name="Memory" value="16GB" id="memory-16gb" />
            <label htmlFor="memory-16gb">16GB</label>
          </div>
          {isAnyCheckboxSelected && (
            <button type="button" onClick={handleClearAll}>
              Clear
            </button>
          )}
          <button type="submit">Search</button>
        </form>
      </div>
    </Box>
  );

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button className="filter-menu" onClick={toggleDrawer(anchor, true)}>
            <FilterAltRoundedIcon style={{ fontSize: "4vh" }} />
          </Button>
          <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Filter;
