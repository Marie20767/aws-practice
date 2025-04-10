import esbuild from 'esbuild';

esbuild.build({
	entryPoints: ['./index.ts'],
	bundle: true,
	minify: true,
	platform: 'node',
	outfile: 'build/index.js',
	target: 'node20',
});
