<!--
---
title: DownloadButton
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
  home: ./
  demos:
  github: https://github.com/notablemind/downloadbutton

---
-->

## Default settings, synchronous generation

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

## Asynchronous generation

You can also use an asynchronous function to generate the file.

```jsx
// @demobox
function genFile(done) {
  setTimeout(function () {
    done({
      mime: 'text/html',
      filename: 'generated.html',
      contents: `<!doctype html><html>
  <h1>Hello wordl!</h1>
</html>`,
    })
  }, 3000);
}
var loading = <span>
  Crunching hard numbers
  <i className="fa fa-circle-o-notch fa-spin right"/>
</span>;
var download = fileData => 'Download ' + fileData.filename;


<div style={{textAlign: 'center'}}>

  <p>Default titles</p>

  <DownloadButton
    className='waves-effect waves-light btn' 
    async={true} genFile={genFile}/>

  <p>Custom titles</p>

  <DownloadButton
    className='waves-effect waves-light btn' 
    generateTitle={'Click me please'}
    loadingTitle={loading}
    downloadTitle={download}
    async={true}
    genFile={genFile}/>

</div>
```

## Pre-computed file data

If you already have the file computed, just pass it in as props.

```jsx
// @demobox
var fileData = {
  filename: 'hello.txt',
  contents: 'Hello download!',
  mime: 'text/plain',
};
var title = <span>
  Download File
  <i className="mdi-file-file-download right"/>
</span>;


<DownloadButton
  className='waves-effect waves-light btn' 
  downloadTitle={title}
  fileData={fileData}/>
```


