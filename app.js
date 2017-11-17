const Contentful = require('spike-contentful')
const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const sugarml = require('sugarml')
const sugarss = require('sugarss')
const slugify = require('slugify')

const postcssEach = require('postcss-each')
const postcssSimpleVars = require('postcss-simple-vars')
const nested = require('postcss-nested')

const locals = {}

const env = process.env.SPIKE_ENV

module.exports = {
	devtool: 'source-map',
	matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
	ignore: ['**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock'],
	reshape: htmlStandards({
		root:"./views",
		parser: sugarml,
		locals: (ctx) => {return { pageId: pageId(ctx), foo: 'bar', "contentful": locals.contentful } },
		minify: env === 'production'
	}),
	outputDir: 'public',
	postcss: cssStandards({
		parser: sugarss,
		minify: env === 'production',
		warnForDuplicates: env !== 'production'
	}),
	vendor: ['assets/js/**','assets/css/**.css'],
	//babel: jsStandards(),
	plugins: [
		new Contentful(
			{
				addDataTo: locals,
				accessToken: '73bcd210fd4dd20baef3fb8293fba85fc18f91e563f06c146991414739107f9e',
				spaceId: 'c7vdx45k3txt',
				contentTypes: [
					{
						name: 'Home',
						id: 'homePage',
						filters:{
							'locale':'en-US'
						}
					},
					{
						name: 'HomeProducts',
						id: 'homePageProducts',
						filters:{
							'locale':'en-US'
						}
					},
					{
						name: 'About',
						id: 'aboutUsPage',
						filters:{
							'locale':'en-US'
						}
					},
					{
						name: 'Support',
						id: 'supportPage',
						filters:{
							'locale':'en-US'
						}
					},
					{
						name: 'Updates',
						id: 'blogPost',
						filters:{
							'locale':'en-US'
						},
						template: {
							path: 'views/partials/_update.sgr',
							output: (post) => {return `blog/${slugify(post.url)}.html`}
						}
					},
					{
						name: 'InspirationUpdates',
						id: 'inspirationPost',
						filters:{
							'locale':'en-US',
							'order': '-sys.createdAt'
						},
						template: {
							path: 'views/partials/_update.sgr',
							output: (post) => {return `inspiration/${slugify(post.url)}.html`}
						}
					},
					{
						name: 'Navigation',
						id: 'navigation',
						filters:{
							'locale':'en-US'
						}
					},
					{
						name: 'Footer',
						id: 'footer',
						filters:{
							'locale':'en-US'
						}
					},
					{
						name: 'Social',
						id: 'social',
						filters:{
							'locale':'en-US'
						}
					},
					{
						name: 'Contact',
						id: 'contactPage',
						filters:{
							'locale':'en-US'
						}
					},
					{
						name: 'UpdatesPage',
						id: 'updatesPage',
						filters:{
							'locale':'en-US'
						}
					},
				]
			})
	],
}

module.exports.postcss.plugins.push(postcssEach())
module.exports.postcss.plugins.push(postcssSimpleVars())
module.exports.postcss.plugins.push(nested())
