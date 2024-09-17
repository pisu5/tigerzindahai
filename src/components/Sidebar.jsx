import React from "react";
import { Box, Checkbox, FormControlLabel, FormGroup, Button } from "@mui/material";

const Sidebar = ({ filters, setFilters, applyFilters }) => {
  const handleFilterChange = (event) => {
    setFilters({
      ...filters,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <Box sx={{ width: 250, padding: 2 }}>
      <h3>Filters</h3>
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.filter1}
              onChange={handleFilterChange}
              name="filter1"
            />
          }
          label="Filter 1"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={filters.filter2}
              onChange={handleFilterChange}
              name="filter2"
            />
          }
          label="Filter 2"
        />
        {/* Add more filters as needed */}
      </FormGroup>
      <Button variant="contained" onClick={applyFilters}>
        Apply Filters
      </Button>
    </Box>
  );
};

export default Sidebar;
