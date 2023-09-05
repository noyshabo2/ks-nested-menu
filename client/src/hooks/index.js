import {useState} from "react";

export const usePopover = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (e) => {
        e.preventDefault();
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const popoverId = open ? 'simple-popover' : undefined;

    return {
        handleClick,
        popoverProps: {
            id: popoverId,
            open,
            anchorEl,
            onClose: handleClose,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
            transformOrigin: {
                vertical: 'center',
                horizontal: 'left',
            }
        }
    }
}