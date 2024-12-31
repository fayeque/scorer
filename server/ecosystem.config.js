module.exports = {
    apps: [
        {
            name: "my-app",
            script: "index.js", // Replace with your app's entry point
            instances: "max",
            exec_mode: "cluster",
            watch: false,
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
