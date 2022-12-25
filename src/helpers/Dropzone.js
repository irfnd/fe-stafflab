import parseFileSize from "filesize-parser";

export const allowedFile = {
	images: {
		mimeType: { "image/jpeg": [".jpg", ".jpeg"], "image/png": [".png"] },
		extensions: [".jpg", ".jpeg", ".png"],
		maxSize: "100KB",
	},
	docs: {
		mimeType: {
			"application/msword": [".doc", ".dot"],
			"application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
			"application/pdf": [".pdf"],
		},
		extensions: [".doc", ".dot", ".docx", ".pdf"],
		maxSize: "5MB",
	},
};

export const options = (onDrop, type) => ({
	onDrop,
	multiple: false,
	maxFiles: 1,
	maxSize: parseFileSize(allowedFile[type].maxSize, { base: 10 }),
	accept: allowedFile[type].mimeType,
	noClick: true,
	noKeyboard: true,
});

const dropzone = {
	allowedFile,
	options,
};

export default dropzone;
