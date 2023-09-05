import {useContext} from "react";
import styled from 'styled-components'
import * as styles from './styles'
import MenuActions from './components/MenuActions/MenuActions';
import {usePopover} from "../../hooks";
import MenuContext from '../../pages/HomePage/context'

const Arrow = styled.span`${styles.Arrow}`

export const Menu = styled(({className, items}) => {
    if (!items?.length)
        return null;

    return (
        <ul {...{className}}>
            {items.map((item) => <MenuItem {...{key: item.id, ...item}}/>)}
        </ul>
    );
})`${styles.Menu}`

const MenuItem = styled(({className, id, label, submenu, depth}) => {
    const {expandedItemIds, setExpandedItemIds} = useContext(MenuContext);

    const {handleClick: handleRightClick, popoverProps} = usePopover();
    const onClick = () => setExpandedItemIds(prevExpandedItemIds => {
        if (prevExpandedItemIds.includes(id)) {
            return prevExpandedItemIds.filter(itemId => itemId !== id);
        }
        return [...prevExpandedItemIds, id]
    })

    const isExpanded = expandedItemIds.includes(id)

    return (
        <li {...{className}}>
            <div {...{className: 'label-container', onClick, onContextMenu: handleRightClick}}>
                <span>{label}</span>
                {!!submenu?.length && <Arrow {...{isExpanded}}/>}
            </div>
            {isExpanded && <Menu items={submenu} depth={depth}/>}
            {popoverProps.anchorEl && <MenuActions {...{popoverProps, id, label}}/>}
        </li>
    );
})`${styles.MenuItem}`
