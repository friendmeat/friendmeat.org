export default {
	eleventyNavigation: {
		key: (data) => data.title,
		parent: (data) => data.parent,
	},
};