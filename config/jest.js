 module.exports = {
   scriptPreprocessor: "./spec/support/preprocessor.js",
   unmockedModulePathPatterns: [
     "node_modules/react"
   ],
   testDirectoryName: "spec",
   testPathIgnorePatterns: [
     "node_modules",
     "spec/support"
   ],
   moduleFileExtensions: [
     "js",
     "json",
     "react"
   ]
 }