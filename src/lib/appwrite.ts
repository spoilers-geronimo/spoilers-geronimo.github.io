import { Client, Account, Databases, TablesDB } from 'appwrite';

const client = new Client();

client
    .setEndpoint(import.meta.env.VITE_APPWRITE_ENDPOINT)
    .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);

export const account = new Account(client);
export const databases = new Databases(client);
export const tables = new TablesDB(client);

export const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
export const RECIPES_COLLECTION_ID = import.meta.env.VITE_APPWRITE_RECIPES_COLLECTION_ID;

export { ID, Permission, Role } from 'appwrite';
