import Quill from "quill";

const Block = Quill.import("blots/block");

class LoadingImage extends Block {
    static create(src) {
        const node = super.create(src);
        if (src === true) return node;

        const image = document.createElement("img");
        image.setAttribute("src", src);
        node.appendChild(image);
        return node;
    }
}

LoadingImage.blotName = "imageBlot";
LoadingImage.className = "image-uploading";
LoadingImage.tagName = "span";

export default LoadingImage;