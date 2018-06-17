const Hapi = require("hapi");
const Pug = require("pug");
const Routes = require("./routes");
const Inert = require("inert");
const Vision = require("vision");
const HapiPino = require("hapi-pino");
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

const server = Hapi.server({
    host: "localhost",
    port: process.env.PORT || 3030,
});

const start = async () => {
    try {
        await server.register([Inert, Vision]);
        // await server.register({
        //     plugin: require("hapi-pino"),
        //     options: {
        //         prettyPrint: true,
        //         logEvents: ["response"]
        //     }
        // });

        // Apply routes
        server.route(Routes);

        // Set view engine
        server.views({
            engines: {
                pug: Pug
            },
            relativeTo: __dirname,
            path: "views",
            isCached: false
        });

        await server.start();

        process.on("unhandledRejection", err => {
            console.log(err);
            process.exit(1);
        });


    } catch (err) {
        console.log(err);
        process.exit(1);
    }


    console.log(`Server is running at ${server.info.uri}`);
}

start();