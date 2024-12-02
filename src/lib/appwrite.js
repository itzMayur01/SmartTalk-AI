import { Account, Avatars, Client, Databases } from 'appwrite';


/**
*Initialize appwrite clinet
**/
const client = new Client();

client.setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID).setEndpoint('https://cloud.appwrite.io/v1');

/**
*Initialize appwrite account
**/
const account = new Account(client)

/**
*Initialize appwrite avatars
**/
const avatars = new Avatars(client)

/**
*Initialize appwrite databases
**/
const databases = new Databases(client)

export { account, avatars, databases }