module.exports = {
  apps: [
    {
      name: "myzhijp",
      script: "pnpm",
      args: "start",
      cwd: "./",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
      env: {
        NODE_ENV: "production",
        PORT: 3008, // 👈 指定端口（改成你需要的）
      },
    },
  ],
};
