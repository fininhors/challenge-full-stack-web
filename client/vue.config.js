module.exports = {
    transpileDependencies: ["vuetify"],
    devServer: {
        proxy: "http://localhost:4000/api/v1",
    },
};
