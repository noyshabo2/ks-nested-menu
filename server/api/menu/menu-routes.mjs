import express from 'express'
import * as menuController from './menu-controller.mjs'

const router = express.Router()

router.get('/root', menuController.getRootMenu)

export const menuRoutes = router