import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { connect } from "mongoose"
import './loadEnv.js'

// import custom libs
import AuthRoute from "./routes/auth.js";
import DrugRoute from "./routes/drugs.js";
import UsersRoute from "./routes/users.js";
import DashboardRoute from "./routes/dashboard.js";
import CategoriesRoute from "./routes/categories.js";
import OrdersRoute from "./routes/order.js";
import TestRoute from "./routes/test.js";
import MedicalHistoryRoute from "./routes/medical.js";
import DeathRoute from "./routes/death.js";


class Sever {

    constructor() {
        this.app = express()
        this.PORT = process.env.PORT || 4353
        this.DBURI = process.env.MONGO_DB_URI
        this.middlewares()
        this.database()
        this.routes()
    }

    middlewares() {
        this.app.use(bodyParser.json())
        this.app.use(cors())
    }

    database() {
        connect(this.DBURI, {
            autoIndex: false,
        }).then(() => {
            console.log('Database Connected')
        }).catch((err) => {
            console.log(err.message)
        })
    }
    routes() {
        this.app.use('/api/auth', AuthRoute);
        this.app.use('/api/users', UsersRoute);
        this.app.use('/api/dashboard', DashboardRoute);
        this.app.use('/api/drugs', DrugRoute);
        this.app.use('/api/categories', CategoriesRoute);
        this.app.use('/api/orders', OrdersRoute);
        this.app.use('/api/deaths', DeathRoute);
        this.app.use('/api/histories', MedicalHistoryRoute);
        this.app.use('/api/tests', TestRoute);
    }
    start() {
        this.app.listen(this.PORT, () => {
            console.log(`server runing on port : ${this.PORT}`)
        })
    }
}


const server = new Sever()

server.start()