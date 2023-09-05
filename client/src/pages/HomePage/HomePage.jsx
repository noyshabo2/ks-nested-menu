import {useEffect, useState} from "react";
import {produce} from "immer"
import {Menu} from "../../components/Menu/Menu";
import MenuContext from './context'
import {getMenu, removeMenuItem, saveMenuItem, updateMenuItem} from "./helper";
import {convertToNestedObject} from "./utils";

// const dummyData = [
//     {
//         id: 1,
//         label: "Home",
//         submenu: [
//             {
//                 id: 2, label: "Home 1",
//                 submenu: []
//             }
//         ],
//     },
//     {
//         id: 3,
//         label: "About",
//         submenu: [
//             {
//                 id: 4,
//                 label: "About 1",
//                 submenu: []
//             },
//             {
//                 id: 5,
//                 label: "About 2",
//                 submenu: [
//                     {id: 6, label: "About 2.1", submenu: []},
//                 ]
//             },
//         ],
//     },
// ];

const dummyData = [
    {
        "id": 1,
        "label": "root",
        "submenu": [
            {
                "id": "117a6bc2-344d-496f-b06b-2f058a2d50a1",
                "label": "home",
                "submenu": [
                    {
                        "id": "e3dbde31-2ab0-4356-b579-c0fabdb36efb",
                        "label": "home~~~",
                        "submenu": []
                    },
                    {
                        "id": "90fee9ad-a26a-4297-9735-b3b4c8db098f",
                        "label": "home 3",
                        "submenu": []
                    }
                ]
            },
            {
                "id": "aac7a94a-6c03-4931-bc04-d1c1ff833e8e",
                "label": "gallery",
                "submenu": []
            },
            {
                "id": "c863df09-6d91-4063-a518-5e4180822809",
                "label": "profile",
                "submenu": []
            }
        ]
    }
];


export const HomePage = () => {
    const [menuItems, setMenuItems] = useState(dummyData)
    const [expandedItemIds, setExpandedItemIds] = useState([])

    // useEffect(() => {
    //     (async () => {
    //         const menu = await getMenu();
    //         const convertedMenu = convertToNestedObject(menu);
    //         console.log(convertedMenu);
    //         setMenuItems(convertedMenu)
    //     })()
    // }, []);

    const addItem = async ({parentId, name}) => {
        const addItemToParent = (menu, parentId, newItem) => {
            for (const item of menu) {
                if (item.id === parentId) {
                    if (!item.submenu) {
                        item.submenu = [];
                    }
                    item.submenu.push(newItem);
                    return;
                }
                if (item.submenu) {
                    addItemToParent(item.submenu, parentId, newItem);
                }
            }
        };

        const savedItem = await saveMenuItem({parentId, label: name});

        const updatedMenuItems = produce(menuItems, draft => {
            addItemToParent(draft, parentId, savedItem);
        })

        setMenuItems(updatedMenuItems)
        setExpandedItemIds(prevExpandedItemIds => {
            if (!prevExpandedItemIds.includes(parentId)) {
                return [...prevExpandedItemIds, parentId, savedItem.id]
            }
            return [...prevExpandedItemIds, parentId, savedItem.id]
        })
    };

    const updateItem = async ({id, name}) => {
        const updateItemName = (menu, id, name) => {
            for (const item of menu) {
                if (item.id === id) {
                    item.label = name;
                    return;
                }
                if (item.submenu) {
                    updateItemName(item.submenu, id, name);
                }
            }
        };

        await updateMenuItem({id, label: name});

        const updatedMenuItems = produce(menuItems, draft => {
            updateItemName(draft, id, name);
        })
        setMenuItems(updatedMenuItems)
    };

    const removeItem = async ({id}) => {
        const deleteItem = (menu, id) => {
            for (let i = 0; i < menu.length; i++) {
                const item = menu[i];
                if (item.id === id) {
                    menu.splice(i, 1); // Remove the item from the array
                    return;
                }
                if (item.submenu) {
                    deleteItem(item.submenu, id);
                }
            }
        };

        await removeMenuItem({id});

        const updatedMenuItems = produce(menuItems, draft => {
            deleteItem(draft, id);
        })
        setMenuItems(updatedMenuItems)
    };

    const contextValue = {
        addItem,
        updateItem,
        removeItem,
        expandedItemIds,
        setExpandedItemIds
    }

    return (
        <div>
            <MenuContext.Provider value={contextValue}>
                <Menu items={menuItems}/>
            </MenuContext.Provider>
        </div>
    );
};

export default HomePage;
