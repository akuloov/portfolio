import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react";

const ActionsMenu = ({
                       openEditProject,
                       handleDelete,
                     }: {
  openEditProject: () => void;
  handleDelete: () => void;
}) => {
  const ITEM_HEIGHT = 48;

  const options = [
    'Edit project',
    'Delete project',
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="ml-auto">
      <IconButton
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        className="text-white"
      >
        <MoreVertIcon/>
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: '20ch',
            },
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option} onClick={() => {
            handleClose();
            option === 'Edit project' ? openEditProject() : handleDelete();
          }}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default ActionsMenu;