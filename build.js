const Generator = require('statisk');
const views = require('statisk/lib/plugins/views');

const routes = {
  'blog/:year/:month/:day/:slug/index.html': {
    from: 'content/blog/:year-:month-:day-:slug.md',
    pipeline: require('./src/pipelines/blog')
  }
};

new Generator({
  cwd: __dirname,
  source: './content',
  destination: './dist',
  clean: true,
  routes,
  // verbose: true,
  meta: {
    title: 'Statisk Example'
  }
})
  .use(views({
    path: 'src/views',
    data(file) {
      return {
        title: file.matter.title,
        content: file.contents
      }
    }
  }))
  .run();
