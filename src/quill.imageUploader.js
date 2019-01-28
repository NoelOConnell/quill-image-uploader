import './blots/image';

import './quill.imageUploader.css';

class ImageUploader {
	constructor(quill, options) {
		this.quill = quill;
		this.options = options;
		this.range = null;

		if (typeof this.options.upload !== 'function')
			console.warn(
				'[Missing config] upload function that returns a promise is required'
			);

		var toolbar = this.quill.getModule('toolbar');
		toolbar.addHandler('image', this.selectLocalImage.bind(this));
	}

	selectLocalImage() {
		this.range = this.quill.getSelection();
		this.fileHolder = document.createElement('input');
		this.fileHolder.setAttribute('type', 'file');
		this.fileHolder.setAttribute('accept', 'image/*');
		this.fileHolder.setAttribute('style', 'visibility:hidden');

		this.fileHolder.onchange = this.fileChanged.bind(this);

		document.body.appendChild(this.fileHolder);

		this.fileHolder.click();

		window.requestAnimationFrame(() => {
			document.body.removeChild(this.fileHolder);
		});
	}

	fileChanged() {
		const file = this.fileHolder.files[0];

		const fileReader = new FileReader();

		fileReader.addEventListener(
			'load',
			() => {
				let base64ImageSrc = fileReader.result;
				this.insertBase64Image(base64ImageSrc);
			},
			false
		);

		if (file) {
			fileReader.readAsDataURL(file);
		}

		this.options.upload(file).then(
			imageUrl => {
				this.insertToEditor(imageUrl);
			},
			error => {
				console.warn(error.message);
			}
		);
	}

	insertBase64Image(url) {
		const range = this.range;
		this.quill.insertEmbed(range.index, 'imageBlot', `${url}`);
	}

	insertToEditor(url) {
		const range = this.range;
		// Delete the placeholder image
		this.quill.deleteText(range.index, 2);
		// Insert the server saved image
		this.quill.insertEmbed(range.index, 'image', `${url}`);

		range.index++;
		this.quill.setSelection(range, 'api');
	}
}

export default ImageUploader;
