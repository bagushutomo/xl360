module.exports = function(grunt) {

  // load all grunt tasks matching the `grunt-*` pattern
  require('load-grunt-tasks')(grunt);

  // var name = '<%= pkg.name %>-v<%= pkg.version %>';
  var scriptsDir = 'js/',
      scssDir = 'scss/',
      stylesDir =  'css/',
      releaseDir = 'release/';

  var bannerContent = '/*! <%= pkg.title || pkg.name %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> - <%= pkg.author.name %> */\n';

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jade: {
      develop: {
        options: {
          pretty: true,
        },
        files: [{
          expand: true,
          cwd: "jade",
          src: ["**/*.jade", "!_includes/*.jade"],
          dest: "",
          ext: ".html"
        }]
      },
      
      release: {
        options: {
          pretty: true,
        },
        files: [{
          expand: true,
          cwd: "jade",
          src: ["**/*.jade", "!_includes/*.jade"],
          dest: "release/",
          ext: ".html"
        }]
      }
    },

    // sass
    sass: {
      dist: {
        options: {
          // sourcemap: true,
          style: 'expanded',
        },
        files: [{
          expand: true,
          cwd: scssDir,
          src: ['*.scss'],
          dest: stylesDir,
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        map: {
          inline: true
        },
        processors: [
          require('pixrem')(),
          require('autoprefixer-core')({browsers: 'last 2 versions'})
        ]
      },
      dist: {
        src: 'css/*.css'
      }
    },

    csso: {
      compress: {
        options: {
          banner: bannerContent,
          report: 'gzip'
        },
        files: {
          'css/style.min.css': ['<%= autoprefixer.single_file.src %>'],
          'css/style.prefixed.min.css': ['<%= autoprefixer.single_file.dest %>']
        }
      }
    },

    concat: {
      js: {
        src: [scriptsDir + 'xm.min.js', scriptsDir + 'main.js'],
        dest: scriptsDir + 'release.js'
      }
    },

    uglify: {
      options: {
        banner: bannerContent
      },
      debug: {
        files: {
          'js/release.min.js' : ['<%= concat.js.dest %>']
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      gruntfile: {
        files: 'Gruntfile.js',
        task: ["jshint"]
      },
      css: {
        files: [
          scssDir + "**/*.scss"
        ],
        // tasks: ["sass", "autoprefixer", "csso:compress"],
        tasks: ["sass", "postcss"],
        options: {
          nospawn: true
        }
      },
      js: {
        files: [
          scriptsDir + "src/*.js"
        ],
        tasks: ["concat", "uglify"],
        options: {
          nospawn: true
        }
      },
      jade: {
        files: ["**/*.jade"],
        tasks: ["jade"]
      }
    }
  });

  // Default task(s)
  grunt.registerTask('default', ["jade:develop", "sass", "postcss", "csso:compress", "concat", "uglify:debug"]);

  grunt.registerTask('dev', ["watch"]);

};