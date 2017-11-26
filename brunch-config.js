'use strict'
exports.config = {
	paths: {
		watched: ['src'],
		public: 'public'
	},
	files: {
		javascripts: {
			joinTo: {
				'js/app.min.js': /^src\/js/,
			},
			order: {
				before: [
					'src/js/app.js',
					'src/js/**/*.md.js',
					'src/js/components/**/*.js',
					'**/*.min.js'
				]
			}
		},
		stylesheets: {
			joinTo: {
				'css/app.min.css': /\.scss$/
			}
		},
		templates: {
			joinTo: {
				'js/templates.js': /^src\/js/
			}
		}
	},
	npm: {
		enabled: false
	},
	conventions: {
		assets: /static[\\/]/
	},
	modules: {
		wrapper: false,
		definition: false
	},
	plugins: {
		copycat: {
			js: [
				'node_modules/angular/angular.min.js',
				'node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
				'node_modules/jquery/dist/jquery.min.js',
				'node_modules/materialize-css/dist/js/materialize.min.js',
				'node_modules/angular-materialize/src/angular-materialize.min.js',
				'node_modules/angular-cookies/angular-cookies.min.js',
				'node_modules/angularjs-toaster/toaster.min.js',
				'node_modules/angular-animate/angular-animate.min.js'
			],
			css: [
				'node_modules/materialize-css/dist/css/materialize.min.css',
				'node_modules/angularjs-toaster/toaster.min.css'
			],
			verbose: true,
			onlyChanged: true
		},
		babel: {
			ignore: [
				/^(node_modules)/
			]
		},
		autoReload: {
			match: {
				stylesheets: ['*.scss', '*.jpg', '*.png'],
				javascripts: ['*.js']
			}
		},
		sass: {
			sourceMapEmbed: true
		},
		/* jshint -W106 */
		angular_templates: {
			module: 'app.views',
			path_transform: (path) => path.replace('src/', '')
		}
		/* jshint +W106 */
	},
	overrides: {
		production: {
			sourceMaps: true,
			plugins: {
				autoReload: {
					enabled: true
				}
			}
		}
	},
	server: {
		command: 'nodemon server.js',
		port: 8000,
		run: true
	}
}
