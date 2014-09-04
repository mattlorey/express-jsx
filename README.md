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
var jsxCompile = require('express-jsx');
...
var app = express();
...
app.use(jsxCompile(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
...

```
```html
<script type="text/javascript" src="/path/to/.js"></script>
```

## Specify a destination directory for .js files

If you would like to keep your .jsx and .js files separate, you may provide
an optional destination directory for transformed .js files.
```javascript
...
app.use(jsxCompile(path.join(__dirname, 'public'), {
	dest: path.join(__dirname, 'compiled-js')
}));

// make static middleware aware of your destination directory
app.use(express.static(path.join(__dirname, 'compiled-js')));
app.use(express.static(path.join(__dirname, 'public')));
```

## License

MIT -- see the `LICENCE` file for details
