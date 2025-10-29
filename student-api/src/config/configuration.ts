export default () => ({
  port: parseInt(process.env.DB_PORT || '5432', 10),
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432', 10),
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME,
  },
  jwtSecret: process.env.JWT_SECRET,
});
