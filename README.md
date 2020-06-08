# Ghost of Tumblr Past (Tumblr → Ghost)

A simple Node script to convert Tumblr XML exports into Ghost-compatible JSON.
For now, this doesn't translate Tumblr media URLs...so media will still point to
Tumblr hosted versions (not ideal for future-proofing).

1. Install dependencies with `yarn install`
2. Run the script, passing the path to your Tumblr _posts.xml_ file:

        node index.js /path/to/posts/posts.xml

3. _ghosted.json_ will be created in the directory where the script is executed.
