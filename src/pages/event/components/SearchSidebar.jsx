import React from 'react';
import { TextField, FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import AppDiv from '../../../components/atoms/AppDiv';
import { Appcaption, Appfont, Appheading } from '../../../utils/theme';
import AppSearchBar from '../../../components/molecules/AppSearchBar';

const SearchSidebar = ({ onFilterChange }) => {
  const [selectedLocation, setSelectedLocation] = React.useState(""); // State for location

  const [selectedRequirements, setSelectedRequirements] = React.useState({
    freshGraduate: false,
    studentCollege: false,
    marriage: false,
  });

  const [dateRange, setDateRange] = React.useState({
    startDate: '',
    endDate: '',
  });
  const [searchValue, setSearchValue] = React.useState("");

  // Handle requirement changes
  const handleRequirementChange = (event) => {
    const { name, checked } = event.target;
    setSelectedRequirements(prev => {
      const updated = { ...prev, [name]: checked };
      onFilterChange({ ...updated, dateRange, location: selectedLocation });
      return updated;
    });
  };

  // Handle date range changes
  const handleDateRangeChange = (field) => (event) => {
    const { value } = event.target;
    setDateRange(prev => {
      const updated = { ...prev, [field]: value };
      onFilterChange({ ...selectedRequirements, dateRange: updated, location: selectedLocation });
      return updated;
    });
  };

  // Handle location text field change
  const handleLocationChange = (event) => {
    const location = event.target.value;
    console.log(location);
    setSelectedLocation(location);
    onFilterChange({ ...selectedRequirements, dateRange, location });
  };

  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setSearchValue(searchTerm);
    onFilterChange({ ...selectedRequirements, dateRange, location: selectedLocation, searchValue: searchTerm });
  };

  const handleSearchSubmit = (value) => {
    setSearchValue(value);
    onFilterChange({ ...selectedRequirements, dateRange, location: selectedLocation, searchValue: value });
  };

  return (
    <div className="fixed mt-8">
      <AppDiv
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Appheading>Search Filter</Appheading>
        <KeyboardArrowLeftIcon color="primary" />
      </AppDiv>
      <AppDiv height={20} />
      <AppSearchBar 
        onChange={handleSearchChange} 
        onSearch={handleSearchSubmit} 
        value={searchValue} 
      />      <AppDiv height={20} />

      {/* Additional Requirements */}
      {/* Uncomment this section if requirements are needed
      <div className="mt-7.5 mb-2 flex justify-between items-center">
        <p className="text-xs uppercase text-[#92929D] font-poppins font-medium">Additional Requirements</p>
        <KeyboardArrowDownIcon />
      </div>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox color="success" size="small" checked={selectedRequirements.freshGraduate} onChange={handleRequirementChange} name="freshGraduate" />}
          label="Fresh Graduate Allow"
        />
        <FormControlLabel
          control={<Checkbox color="success" size="small" checked={selectedRequirements.studentCollege} onChange={handleRequirementChange} name="studentCollege" />}
          label="Student College"
        />
        <FormControlLabel
          control={<Checkbox color="success" size="small" checked={selectedRequirements.marriage} onChange={handleRequirementChange} name="marriage" />}
          label="Marriage"
        />
      </FormGroup>
      */}

      {/* Date Range */}
      <div className="mt-7.5 mb-2">
        <p className="text-xs uppercase text-[#92929D] font-poppins font-medium">Date Range</p>
        <div className="mt-2">
          <TextField
            type="date"
            label="Start Date"
            value={dateRange.startDate}
            onChange={handleDateRangeChange('startDate')}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </div>
        <div className="mt-2">
          <TextField
            type="date"
            label="End Date"
            value={dateRange.endDate}
            onChange={handleDateRangeChange('endDate')}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
        </div>

        {/* Location Filter */}
        <TextField
          label="Location"
          value={selectedLocation}
          onChange={handleLocationChange}
          fullWidth
          variant="outlined"
          sx={{
            borderRadius: 4,
            marginBottom: 2,
          }}
        />
      </div>
    </div>
  );
};

export default SearchSidebar;
