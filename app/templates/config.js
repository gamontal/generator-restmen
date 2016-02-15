module.exports = {
    port: Number(process.env.PORT || '<%= portNumber %>'),
    database: '<%= databaseUrl %>'
};
