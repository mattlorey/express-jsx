# express-jsx

Express middleware that transforms jsx to js at request time.

Request the .js file and express-jsx will check for a matching filename with a
.jsx extension and transform it to .js.  If a .js file already exists, it will
update it if the modified time is greater on the .jsx file.

## Installation

    npm install express-jsx

## Example usage

```javascript
var express = require('express');
...
var app = express();
...
app.use(jsxCompile(path.join(__dirname, 'public')));
...

```

```html
<script type="text/javascript" src="/path/to/.js"></script>
```

## License

MIT -- see the `LICENCE` file for details
