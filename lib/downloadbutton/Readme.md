<!--
---
title: DownloadButton Demos
colors: pink
fontPair: Fugaz One
ga: UA-7002862-5
source: https://github.com/notablemind/downloadbutton/raw/master/Readme.md
css: |
  .DownloadButton {
    font-size: 16px;
    font-family: sans-serif;
  }
styles:
  - https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.min.css
  - https://cdnjs.cloudflare.com/ajax/libs/materialize/0.95.0/css/materialize.min.css
scripts:
  - download-button.js
  - https://code.jquery.com/jquery-2.1.1.min.js
  - https://cdnjs.cloudflare.com/ajax/libs/materialize/0.95.0/js/materialize.min.js
links:
  home:
  demos: demo.html
  github: https://github.com/notablemind/downloadbutton

---
-->

<!-- @demobox hide -->
View this page rendered at [notablemind.github.io/downloadbutton](http://notablemind.github.io/downloadbutton)
<!-- @demobox /hide -->

DownloadButton is a simple component for letting the user **download a
javascript-generated file.** It was extracted from
[Notablemind](https://github.com/notablemind/notablemind).

The styling is due to [materializecss](http://materializecss.com/), and does
not come with the `DownloadButton` component. In some examples,
[FontAwesome](http://fortawesome.github.io/Font-Awesome/) icons are also used.
 You are free to style the component however you wish.

## Demo

```jsx
// @demobox
function makeFile() {
  // do some calculations
  return {
    mime: 'text/plain',
    filename: 'myexportedfile.txt',
    contents: 'all of the exports',
  }
}


<DownloadButton
  // these classes come from materializecss
  className='waves-effect waves-light btn' 
  genFile={makeFile}/>
```

For more demos, see [the demo page](demo.md).

## Node Start

```bash
npm install downloadbutton
```

```js
var DownloadButton = require('downloadbutton')



