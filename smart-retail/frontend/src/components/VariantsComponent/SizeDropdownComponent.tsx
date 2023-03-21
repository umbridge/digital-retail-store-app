import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export default function DropdownComponent(props) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (data: string) => {
        if(typeof(data)==='string'){
            props.func(data);
            }
        setAnchorEl(null);
    };
   

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <ArrowDropDownIcon sx={{color:'black'}}/>
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    props.sizes.map((size, idx) => {
                        return size.quantity>0? <MenuItem onClick={() => { handleClose(size.size) }} key={idx}>{size.size}</MenuItem> : <div></div>
                    })
                }
            </Menu>
        </div>
    );
}