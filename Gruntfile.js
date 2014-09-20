module.exports = function(grunt) {

	// Configuration
	grunt.initConfig({
		uglify: {
			my_target: {
				files: {
					'js/jroulette.min.js': 'js/jroulette.js',
				}
			}
		},
		watch: {
			files: ['js/jroulette.js'],
			tasks: 'uglify'
		},
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');

	// Register tasks
	grunt.registerTask('default',['watch']);
}
