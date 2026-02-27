export default ({ env }) => ({
  connection: {
    client: "postgres",
    connection: {
      host: env("DATABASE_HOST", "db"),
      port: env.int("DATABASE_PORT", 5432),
      database: env("DATABASE_NAME", "vb_sensoric"),
      user: env("DATABASE_USERNAME", "vb_user"),
      password: env("DATABASE_PASSWORD", "vb_secret_2026"),
      ssl: env.bool("DATABASE_SSL", false),
    },
    pool: {
      min: 0,
      max: 10,
    },
  },
});
