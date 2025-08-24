import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  process.env.DB_NAME || 'manager',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '1234',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    define: { freezeTableName: true }
  }
);
