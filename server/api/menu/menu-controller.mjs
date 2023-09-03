import * as menuService from "./menu-service.mjs";

export const getRootMenu = async (req, res) => {
    try {
        const root = await menuService.getRoot();
        res.send(root)
    } catch (err) {
        console.log('Could not find root menu', err)
        res.status(500).send({err: 'Could not find root menu'})
    }
}