import React from 'react';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import { styled } from '@mui/material/styles';

interface ListToggleProps {
  togglePosition: string;
  onChange: (e: React.MouseEvent<HTMLElement>, value: string) => void;
}

const StyledToggleButton = styled(ToggleButton)({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: '#1976d2',
    backgroundColor: 'white'
  }
});

export default function ListToggle({ togglePosition, onChange }: ListToggleProps) {
  return (
    <ToggleButtonGroup value={togglePosition} onChange={onChange} exclusive sx={{ width: 1 }}>
      <StyledToggleButton value="allUsers" sx={{ width: 0.5, border: 0 }}>
        All users
      </StyledToggleButton>
      <StyledToggleButton value="contacts" sx={{ width: 0.5, border: 0 }}>
        Contacts
      </StyledToggleButton>
    </ToggleButtonGroup>
  );
}
