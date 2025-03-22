import express , {Express, Request, Response} from 'express';
import userRoute from './routes/user.route';
import authRoute from './routes/auth.route';
import roomRoute from './routes/room.route';
import mssgRoute from './routes/mssg.route';
import swaggerUi from 'swagger-ui-express';
import { swaggerDocs } from './swagger';
import './database/dbconfig';

const app:Express = express();

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs)); // http://localhost:5000/api-docs/

app.use("/api/users" , userRoute);
app.use("/api/auth" , authRoute);
app.use("/api/rooms" , roomRoute);
app.use("/api/mssgs" , mssgRoute);

app.listen(5000, ()=>console.log("Server is Listening on port 5000 .. "));