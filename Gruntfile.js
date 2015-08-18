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
          src: ["jade/*.jade", "!_includes/*.jade"],
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
          src: ["jade/*.jade", "!_includes/*.jade"],
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
          'css/style.min.css': [stylesDir + 'site.css']
        }
      }
    },

    concat: {
      js: {
        src: [
          scriptsDir + 'src/three/three.js',
          scriptsDir + 'src/three/DeviceOrientationControl.js',
          scriptsDir + 'src/three/OrbitControls.js',
          scriptsDir + 'src/three/StereoEffect.js',
          scriptsDir + 'src/com/namespace.js',
          scriptsDir + 'src/com/scene.js',
          scriptsDir + 'src/main.js'
        ],
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
          scriptsDir + "src/*.js",
          scriptsDir + "src/com/*.js"
        ],
        tasks: ["concat"],
        options: {
          nospawn: true
        }
      },
      jade: {
        files: ["jade/*.jade"],
        tasks: ["jade:develop"]
      }
    }
  });

  // Default task(s)
  grunt.registerTask('debug', ["jade:develop", "sass", "postcss", "csso:compress", "concat"]);
  grunt.registerTask('default', ["jade:develop", "sass", "postcss", "csso:compress", "concat", "uglify"]);

  grunt.registerTask('dev', ["watch"]);

};