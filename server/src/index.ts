import express,{Application} from 'express';
//Importamos el modulo de expres.
import indexRoutes from './routes/indexRoutes';
import gamesRoutes from './routes/gamesRoutes';
import morgan from 'morgan';
import cors from 'cors';
class Server {
    public app: Application; //Creamos variable de tipo Aplicacion

    constructor()
    {
        this.app = express();//Guardamos en variable aplicacion el modulo que carga Express.
        this.config();
        this.routes();
    }
    /**
     * Este metodo nos ayudara a dar las configuraciones a la App 
     * cargada por express.
     */
    config ():void 
    {
        this.app.set("PORT", process.env.PORT || 3000);
        this.app.use(morgan("dev"));//Miraremos las peticiones en modo desarrollador.
        this.app.use(cors()); //Permitira que clientes haga peticiones
        this.app.use(express.json());//La app entendera json gracias a esto
        this.app.use(express.urlencoded({extended : false}));//Permite peticiones por HTML
        
    }
    /**
     * Metodo para crear las rutas de la app
     */
    routes():void{
        this.app.use(indexRoutes);
        this.app.use("/api/games",gamesRoutes);//Le decimos la ruta de la cual tiene acceso a esa peticion
        //Defecto es '/'
    }
    /**
     * Metodo para inicializar el servidor.
     */
    star():void
    {
        this.app.listen(this.app.get("PORT"), ()=>{
            console.log("Server in port",this.app.get("PORT"));
        });
    }
}
const SERVER = new Server();
SERVER.star();