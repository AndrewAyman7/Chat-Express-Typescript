/*
import {createConnection} from "typeorm";
import { User } from "../entities/user.entity";
import { Mssg } from "../entities/mssg.entity";
import { Room } from "../entities/room.entity";
import { RoomMember } from "../entities/roomMember.entity";
import dotenv from 'dotenv';

dotenv.config();
/*
export const db = createConnection({
    type: "postgres",
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'root',
    database: 'chat',
    entities: [User , Mssg, Room, RoomMember], 
    synchronize: true, // Auto-migrates DB (for development)
    //migrations: [],
});
*/

/*
export const db = createConnection({
    type: process.env.DB_TYPE as 'postgres', 
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASENAME,
    entities: [User, Mssg, Room, RoomMember], 
    synchronize: true, // Auto-migrates DB (for development)
    // migrations: [],
  }).then(() => {
    console.log('Database connection established');
  }).catch((error) => {
    console.error('Error connecting to database', error);
});
*/

import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';
import { Mssg } from '../entities/mssg.entity';
import { Room } from '../entities/room.entity';
import { RoomMember } from '../entities/roomMember.entity';
import dotenv from 'dotenv';

dotenv.config();

// Create a new DataSource instance
export const AppDataSource  = new DataSource({
  type: process.env.DB_TYPE as 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASENAME,
  entities: [User, Mssg, Room, RoomMember],
  synchronize: true, // Auto-migrates DB (for development)
  // migrations: [],
});

// Initialize the data source
AppDataSource.initialize()
    .then(() => {
        console.log('Database connection established');
    })
    .catch((error) => {
        console.error('Error connecting to database', error);
    });
