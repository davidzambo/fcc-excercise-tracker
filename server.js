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
    routes: {
        validate: {
            failAction: async (request, h, err) => {
                h.response('hupsz');
                if (process.env.NODE_ENV === 'production') {
                    // In prod, log a limited error message and throw the default Bad Request error.
                    console.error('ValidationError:', err.message); // Better to use an actual logger here.
                    throw Boom.badRequest(`Invalid request payload input`);
                } else {
                    // During development, log and respond with the full error.
                    console.error(err);
                    return r.response({msg: err.output.payload.validation.source});
                }
            }
        }
    }
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
            console.log('unhandled');
            console.log(err);
            process.exit(1);
        });


    } catch (err) {
        console.log("start");
        console.log(err);
        process.exit(1);
    }


    console.log(`Server is running at ${server.info.uri}`);
}

start();