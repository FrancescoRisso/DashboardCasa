const apiCall = async (link, params = {}) => {
	let response = await fetch(`/api${link}`, params);
	let data = await response.json();

	if (response.ok) {
		return data;
	} else {
		throw data;
	}
};

export default apiCall;
