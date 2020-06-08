const { readFileSync } = require('fs');
const parseString = require('xml2js').parseStringPromise;

const xmlFile = readFileSync(process.argv[2], 'utf8');
parseString(xmlFile, { attrkey: 'meta' }).then(({ tumblr }) => {
  const ghostData = tumblr.posts[0].post.map((post) => (
    {
      created_at: post.meta['unix-timestamp'],
      html: post['regular-body'],
      id: post.meta.id,
      slug: post.meta.slug,
      status: post.meta.state,
      title: post['regular-title'],
    }
  ));
  console.log(ghostData);
})
.catch(console.log);
