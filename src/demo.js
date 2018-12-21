import Quill from "quill";
import ImageUploader from "./quill.imageUploader.js";

Quill.register("modules/imageUploader", ImageUploader);

const fullToolbarOptions = [
  [{ header: [1, 2, 3, false] }],
  ["bold", "italic"],
  ["clean"],
  ["image"]
];

var quill = new Quill("#editor", {
  theme: "snow",
  modules: {
    toolbar: {
      container: fullToolbarOptions
    },
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
