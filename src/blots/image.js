import Quill from 'quill';

const InlineBlot = Quill.import('blots/block');

export class LoadingImage extends InlineBlot {
    static create(src) {
        const node = super.create(src);
        if (src === true)
            return node;
        
        const image = document.createElement('img');
        image.setAttribute('src', src);
        node.appendChild(image);
        
        return node;
    }
    deleteAt(index, length) {

        console.log('deleteAt', index, length);
        super.deleteAt(index, 2);
        this.cache = {};
    }
    static value(domNode) {
        console.log('value called', domNode);
        const { src, custom } = domNode.dataset;
        return { src, custom };
    }
}

LoadingImage.blotName = 'imageBlot';
LoadingImage.className = 'image-uploading';
LoadingImage.tagName = 'span';
Quill.register({ 'formats/imageBlot': LoadingImage });