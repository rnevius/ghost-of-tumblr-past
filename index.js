const { readFileSync, writeFileSync } = require('fs');
const xml2js = require('xml2js');

const xmlFile = readFileSync(process.argv[2], 'utf8');
xml2js.parseStringPromise(xmlFile, { attrkey: 'meta' }).then(({ tumblr }) => {
  const posts = tumblr.posts[0].post
    .filter((post) => (
      post.meta.state === 'published' && post['regular-title']
    ))
    .map((post) => (
      {
        id: post.meta.id,
        mobiledoc: JSON.stringify({
          version: '0.3.1',
          markups: [],
          atoms: [],
          cards: [['html', { cardName: 'html', html: post['regular-body'][0] }]],
          sections: [[10, 0]],
        }),
        published_at: Date.parse(post.meta.date),
        slug: post.meta.slug,
        status: post.meta.state,
        title: post['regular-title'][0],
      }
    ));

  const ghostData = {
    data: { posts },
    meta: { exported_on: Date.now(), version: '2.14.0' },
  };
  writeFileSync('./ghosted.json', JSON.stringify(ghostData));
});
