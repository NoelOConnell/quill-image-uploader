# Quill ImageHandler Module

A module for Quill rich text editor to allow images to be uploaded to a server instead of being base64 encoded
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Demo

![Image Uploading Demo GIF](static/quill-example.gif "Image Uploading Demo GIF")

### Install

Install with npm:

```bash
npm install quill-image-uploader --save
```

### Usage

Include the CSS for the loading effect or create your own.

```javascript
const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    imageUploader: {
      upload: file => {
        // return a Promise that resolves in a link to the uploaded image
        return new Promise((resolve, reject) => {
          const fd = new FormData();
          fd.append("upload_file", file);

          const xhr = new XMLHttpRequest();
          xhr.open("POST", `${window.location.pathname}/api/files/add`, true);
          xhr.onload = () => {
            if (xhr.status === 200) {
              const response = JSON.parse(xhr.responseText);
              resolve(response.file_path); // Must resolve as a link to the image
            }
          };
          xhr.send(fd);
        });
      }
    }
  }
});
```
