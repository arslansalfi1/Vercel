export default async function handler(req, res) {
  const { method, query } = req;

  if (method === 'GET' && !('i' in query)) {
    res.setHeader('Content-Type', 'text/html');
    return res.end(`
      <html>
      <body>
        <script type="text/javascript" src="/aes.js"></script>
        <script>
          function toNumbers(d) {
              var e = [];
              d.replace(/(..)/g, function(d) {
                  e.push(parseInt(d, 16))
              });
              return e;
          }

          function toHex() {
              for (var d = [], d = 1 == arguments.length && arguments[0].constructor == Array ? arguments[0] : arguments, e = "", f = 0; f < d.length; f++) 
                  e += (16 > d[f] ? "0" : "") + d[f].toString(16);
              return e.toLowerCase();
          }

          var a = toNumbers("f655ba9d09a112d4968c63579db590b4"),
              b = toNumbers("98344c2eee86c3994890592585b49f80"),
              c = toNumbers("39429f64868dbec5cb06aba2bf495497");
          document.cookie = "__test=" + toHex(slowAES.decrypt(c, 2, a, b)) + "; max-age=21600; expires=Thu, 31-Dec-37 23:55:55 GMT; path=/";
          location.href = "/impossible?i=1";
        </script>
        <noscript>This site requires Javascript to work, please enable Javascript in your browser or use a browser with Javascript support</noscript>
      </body>
      </html>
    `);
  }

  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({
    web_info: {
      _client: " 𝐅𝐑𝐄𝐄 𝐏𝐀𝐍𝐄𝑳 ",
      license: "Qp5KSGTquetnUkjX6UVBAURH8hTkZuLM",
      version: "1.0.0"
    },
    web__dev: {
      author: "@v_2jx"
    }
  });
}
