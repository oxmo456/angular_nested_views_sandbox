module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    keepalive: false,
                    port: 9001,
                    base: "./app"
                }
            }
        },
        ngmin: {
            all: {
                src: ["src/js/main.js",
                    "src/js/boot/config.js",
                    "src/js/boot/run.js",
                    "src/js/controllers/*.js",
                    "src/js/resolvers/*.js",
                    "src/js/directives/*.js",
                    "src/js/util/*.js",
                    "src/js/constants/*.js"
                ],
                dest: "app/js/main.js"
            }
        },
        watch: {
            livereload: {
                options: { livereload: true },
                files: ["src/**/*.js"]
            },
            scripts: {
                files: ["src/**/*.js"],
                tasks: ["ngmin"],
                options: {
                    nospawn: true
                }
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-ngmin");
    grunt.loadNpmTasks("grunt-contrib-watch");

    grunt.registerTask("server", [ "dist", "connect:server", "watch"]);
    grunt.registerTask("dist", ["ngmin"]);

};