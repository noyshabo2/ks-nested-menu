import express from 'express'
import cors from 'cors'
import {menuRoutes} from './api/menu/menu-routes.mjs'

const app = express();

const corsOptions = {
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}
app.use(cors(corsOptions));

app.use('/api/menu', menuRoutes);
app.use('*', (req, res) => {
    res.status(404).json({err: 'not found'})
})

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
})