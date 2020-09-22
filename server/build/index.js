"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Importamos el modulo de expres.
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const gamesRoutes_1 = __importDefault(require("./routes/gamesRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
class Server {
    constructor() {
        this.app = express_1.default(); //Guardamos en variable aplicacion el modulo que carga Express.
        this.config();
        this.routes();
    }
    /**
     * Este metodo nos ayudara a dar las configuraciones a la App
     * cargada por express.
     */
    config() {
        this.app.set("PORT", process.env.PORT || 3000);
        this.app.use(morgan_1.default("dev")); //Miraremos las peticiones en modo desarrollador.
        this.app.use(cors_1.default()); //Permitira que clientes haga peticiones
        this.app.use(express_1.default.json()); //La app entendera json gracias a esto
        this.app.use(express_1.default.urlencoded({ extended: false })); //Permite peticiones por HTML
    }
    /**
     * Metodo para crear las rutas de la app
     */
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use("/api/games", gamesRoutes_1.default); //Le decimos la ruta de la cual tiene acceso a esa peticion
        //Defecto es '/'
    }
    /**
     * Metodo para inicializar el servidor.
     */
    star() {
        this.app.listen(this.app.get("PORT"), () => {
            console.log("Server in port", this.app.get("PORT"));
        });
    }
}
const SERVER = new Server();
SERVER.star();
