module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jade');
    grunt.loadNpmTasks('grunt-contrib-stylus');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.initConfig({
        bower_concat: {
            all: {
                dest: 'build/js/bower.js',
                cssDest: 'build/css/bower.css',
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
                options: {
                    bare: true
                },
                files: {
                    'build/js/app.js': 'src/scripts/**/*.coffee',
                }
            },
        },

        copy: {
            config: {
                src: 'src/CNAME',
                dest: 'build/CNAME',
            },
            asset: {
                expand: true,
                cwd: 'src/asset/',
                src: '**/*',
                dest: 'build/',
            },
            script: {
                expand: true,
                cwd: 'src/scripts/',
                src: '**/*.js',
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
        },

        'gh-pages': {
            options: {
                base: 'build'
            },
            src: ['**']
        }

    });


    grunt.registerTask('default', ['copy', 'bower_concat', 'jade:compile', 'stylus:compile', 'coffee:compile']);
    grunt.registerTask('build', ['copy', 'bower_concat', 'jade:compile', 'stylus:compile', 'coffee:compile']);
    grunt.registerTask('rebuild', ['clean', 'build']);
    grunt.registerTask('publish', ['rebuild', 'gh-pages']);
};
