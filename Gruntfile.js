module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');

    grunt.initConfig({
        bower_concat: {
            all: {
                dest: 'build/js/_bower.js',
                cssDest: 'build/css/_bower.css',
                mainFiles: {
                    'babylonjs': 'dist/babylon.2.2.js'
                }
            },
        },

        jade: {
            compile: {
                files: {
                    "build/index.html": "src/views/**/*.jade"
                }
            }
        },

        stylus: {
            compile: {
                files: {
                    'build/css/style.css': 'src/stylesheets/*.styl', // 1:1 compile
                }
            }
        },

        coffee: {
            compile: {
                expand: true,
                flatten: true,
                cwd: 'src/scripts/',
                src: ['**/*.coffee'],
                dest: 'build/js/',
                ext: '.js'
            },
        },

        copy: {
            asset: {
                expand: true,
                cwd: 'src/asset/',
                src: '**/*',
                dest: 'build/',
            },
            script: {
                expand: true,
                cwd: 'src/scripts/',
                src: '**/*',
                dest: 'build/js',
            }
        },

        watch: {
            options: {
                livereload: true,
                debounceDelay: 250,
            },
            asset: {
                files: 'src/asset/**/*',
                tasks: ['copy:asset'],

            },
            js: {
                files: 'src/**/*.js',
                tasks: ['copy:script'],

            },
            jade: {
                files: 'src/**/*.jade',
                tasks: ['jade:compile'],

            },
            stylus: {
                files: 'src/**/*.styl',
                tasks: ['stylus:compile'],
            },
            coffee: {
                files: 'src/**/*.coffee',
                tasks: ['coffee:compile'],
            },
        },

        clean: {
            files: ['build/**/*', '!build']
        }

    });


    grunt.registerTask('default', ['bower_concat', 'jade:compile', 'stylus:compile', 'coffee:compile', 'copy']);

};
