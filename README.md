# Quill ImageHandler Module

A module for Quill rich text editor to allow images to be uploaded to a server instead of being base64 encoded.
Adds a button to the toolbar for users to click, also handles drag,dropped and pasted images.

## Demo

![Image of Yaktocat](/static/quill-example.gif)

### Install

Install with npm:

```bash
npm install quill-image-uploader --save
```

### Webpack/ES6

```javascript
import Quill from "quill";
import ImageUploader from "quill-image-uploader";

import 'quill-image-uploader/dist/quill.imageUploader.min.css';

Quill.register("modules/imageUploader", ImageUploader);

const quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    imageUploader: {
      upload: (file) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
            );
          }, 3500);
        });
      },
    },
  },
});
```

### Quickstart (React with react-quill)

React Example on [CodeSandbox](https://codesandbox.io/s/react-quill-demo-qr8xd)

### Quickstart (script tag)

Example on [CodeSandbox](https://codesandbox.io/s/mutable-tdd-lrsvh)

```javascript
// A link to quill.js
<script src="/dist/quill.js"></script>
<script src="/dist/quill.imageUploader.min.js"></script>

Quill.register("modules/imageUploader", ImageUploader);

var quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    imageUploader: {
      upload: file => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(
              "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/JavaScript-logo.png/480px-JavaScript-logo.png"
            );
          }, 3500);
        });
      }
    }
  }
});
```

### Automated testing example with Cypress

You may configure a `data-testid` attribute for testing frameworks such as
[Cypress](https://cypress.io/) to find the file input and upload images.

#### Configuring the data-testid
```javascript
var quill = new Quill(editor, {
  // ...
  modules: {
    // ...
    imageUploader: {
      upload: myUploadFunction,
      testId: "quill-image-upload"
    }
  }
});
```

#### Selecting and uploading in Cypress
```javascript
it("Uploads images correctly", () => {
  cy.visit("/posts/new");

  // the file input should be available for selection after this point
  cy.get("button.ql-image").click();

  // select the file input using the data-testid attribute given in the
  // configuration and upload a file to it
  cy.get("input[type=file][data-testid=quill-image-upload]").selectFile(
    "cypress/fixtures/my-post-header.png",
    { force: true } // may be needed for non-visible inputs
  );

  // Verify that your image appears. Should wait for your upload function to
  // finish and insert the image into the content.
  cy.get(".ql-editor img").should("exist");
});
```
