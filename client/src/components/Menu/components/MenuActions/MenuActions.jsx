import {useContext, useState} from "react";
import Popover from '@mui/material/Popover';
import TextField from '@mui/material/TextField';
import Button from '../../../Button/Button'
import styled from 'styled-components'
import * as styles from './styles'
import MenuContext from '../../../../pages/HomePage/context'

const PAGES = {
    ACTIONS: 'ACTIONS',
    EDIT_MENU: 'EDIT_MENU',
    ADD_MENU: 'ADD_MENU',
}

const EditMenu = styled(({className, onSubmit, onCancel, label = ''}) => {

    const [name, setName] = useState(label);
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit?.({name})
    };

    return <form {...{className, onSubmit: handleSubmit}}>
        <TextField {...{
            id: 'outlined-basic',
            label: 'Name',
            variant: 'outlined',
            placeholder: 'Enter name',
            value: name,
            size: 'small',
            onChange: (e) => setName(e.target.value)
        }}/>
        <div {...{className: 'buttons-container'}}>
            <Button {...{className: 'btn', type: 'button', variant: 'secondary', onClick: onCancel}}>Cancel</Button>
            <Button {...{type: 'submit', variant: 'primary'}}>Save</Button>
        </div>

    </form>
})`${styles.MenuEdit}`

const ActionsList = styled(({className, setPage, onRemoveItem}) => {
    return <ul {...{className}}>
        <li {...{onClick: () => setPage(PAGES.EDIT_MENU)}}>Change Name</li>
        <li {...{onClick: () => setPage(PAGES.ADD_MENU)}}>Add Menu</li>
        <li {...{onClick: onRemoveItem}}>Delete Menu</li>
    </ul>
})`${styles.ActionsList}`

const MenuActions = ({popoverProps, id, label}) => {
    const [page, setPage] = useState(PAGES.ACTIONS);

    const {onClose} = popoverProps;

    const {addItem, updateItem, removeItem} = useContext(MenuContext)

    const onCancel = () => {
        setPage(PAGES.ACTIONS);
    }

    const onAddItem = ({name}) => {
        addItem({parentId: id, name})
        onClose()
    }

    const onUpdateItem = ({name}) => {
        updateItem({id, name})
        onClose()
    }

    const onRemoveItem = () => {
        removeItem({id})
        onClose()
    }

    return (
        <Popover {...popoverProps}>
            {page === PAGES.ACTIONS && <ActionsList {...{setPage, onRemoveItem}}/>}
            {(page === PAGES.ADD_MENU || page === PAGES.EDIT_MENU) &&
                <EditMenu {...{
                    onCancel,
                    ...page === PAGES.ADD_MENU ? {onSubmit: onAddItem} : {onSubmit: onUpdateItem, label},
                }}/>}
        </Popover>
    );
}

export default MenuActions