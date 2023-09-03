export const getRoot = () => {
    return Promise.resolve({
        id: 1,
        label: 'Menu',
        childrenIds: [2, 3]
    })
}