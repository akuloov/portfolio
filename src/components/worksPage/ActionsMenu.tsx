import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from "react";
import {cn} from "@/utils/cn";

const ActionsMenu = ({
                       openEditProject,
                       handleDelete,
                       createProject,
                       sortDesc,
                       sortAsc,
                       options,
                       className,
                     }: {
  openEditProject?: () => void;
  handleDelete?: () => void;
  createProject?: () => void;
  sortDesc?: () => void;
  sortAsc?: () => void;
  options: string[];
  className?: string;
}) => {
  const ITEM_HEIGHT = 48;

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
        className={cn("!text-white", className)}
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
            switch (option) {
              case "Edit project":
                openEditProject?.();
                break;
              case "Delete project":
                handleDelete?.();
                break;
              case "Add new project":
                createProject?.();
                break;
              case "Sort by date ↓":
                sortDesc?.();
                break;
              case "Sort by date ↑":
                sortAsc?.();
                break;
            }
          }}>
            {option}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

export default ActionsMenu;