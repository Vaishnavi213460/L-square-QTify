import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";

function SongsFilters({ onSelect }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const handleChange = (event, newValue) => {
    setActiveFilter(newValue);
    if (onSelect) onSelect(newValue);
  };

  return (
    <Tabs
      value={activeFilter}
      onChange={handleChange}
      textColor="inherit"
      indicatorColor="secondary"
      sx={{
        "& .MuiTab-root": {
          color: "#fff",
          textTransform: "none",
          fontWeight: 600,
          fontSize: "16px",
          marginRight: "16px",
        },
        "& .Mui-selected": {
          color: "#34C94B !important",
        },
        "& .MuiTabs-indicator": {
          backgroundColor: "#34C94B",
          height: "3px",
          borderRadius: "2px",
        },
      }}
    >
      <Tab label="All" value="all" />
      <Tab label="Rock" value="rock" />
      <Tab label="Pop" value="pop" />
      <Tab label="Jazz" value="jazz" />
      <Tab label="Blues" value="blues" />
    </Tabs>
  );
}


export default SongsFilters;
