import networkService from '../../services/networkService.js'

// export const getRoot = () => networkService.get('menu/root')

export const getMenu = () => {
    return Promise.resolve([
        {
            id: 1,
            label: "Home",
            childrenIds: [2]
        },
        {
            id: 2,
            label: "Home 1",
            childrenIds: []
        },
        {
            id: 3,
            label: "About",
            childrenIds: [4, 5]
        },
        {
            id: 4,
            label: "About 1",
            childrenIds: []
        },
        {
            id: 5,
            label: "About 2",
            childrenIds: [6]
        },
        {
            id: 6,
            label: "About 2.1",
            childrenIds: []
        },
    ])
}

export const saveMenuItem = ({parentId, label}) => {
    return networkService.post('menu', {parentId, label})
}

export const updateMenuItem = ({id, label}) => {
    return networkService.put(`menu/${id}`, {label})
}

export const removeMenuItem = ({id}) => {
    return networkService.delete(`menu/${id}`)
}
