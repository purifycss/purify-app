
var React = require('react/addons')
  , cx = React.addons.classSet
  , PT = React.PropTypes

  , saveAs = require('./save-as')

var DownloadButton = React.createClass({displayName: "DownloadButton",
  propTypes: {
    fileData: PT.object,
    genFile: PT.func,
    async: PT.bool,
    generateTitle: PT.string,
    downloadTitle: PT.oneOfType([PT.string, PT.func]),
    loadingTitle: PT.string,
    onDownloaded: PT.func,
  },

  getDefaultProps: function () {
    return {
      async: false,
      downloadTitle: 'Download',
      generateTitle: 'Generate file',
      loadingTitle: 'Loading...',
    }
  },

  getInitialState: function () {
    return {
      loading: false,
      fileData: null,
    }
  },

  _onGenerate: function () {
    this.setState({loading: true, fileData: null})
    this.props.genFile(this._donePreparing)
  },

  _donePreparing: function (fileData) {
    this.setState({
      loading: false,
      fileData: fileData,
    })
  },

  _onDownload: function () {
    var fileData = this.props.fileData || (this.props.async ? this.state.fileData : this.props.genFile())
    if (!fileData) {
      return false
    }
    var blob = new Blob([fileData.contents], {type: fileData.mime})
      , url = URL.createObjectURL(blob)
    saveAs(url, fileData.filename)
    this.props.onDownloaded && this.props.onDownloaded()
  },

  render: function () {
    // need one or the other
    if (!this.props.genFile && !this.props.fileData) {
      return React.createElement("em", null, "Invalid configuration for download button")
    }
    var style = this.props.style
      , cls = 'DownloadButton ' + (this.props.className || '')

    if (this.props.fileData || !this.props.async || this.state.fileData) {
      var title = this.props.downloadTitle
      if ('function' === typeof title) {
        title = title(this.props.fileData || this.state.fileData)
      }
      return React.createElement("button", {style: style, onClick: this._onDownload, className: cls}, 
        title
      )
    }

    if (this.state.loading) {
      return React.createElement("button", {style: style, className: cls + ' DownloadButton-loading'}, 
        this.props.loadingTitle
      )
    }

    return React.createElement("button", {style: style, onClick: this._onGenerate, className: cls + ' DownloadButton-generate'}, 
      this.props.generateTitle
    )
  }
})

module.exports = DownloadButton