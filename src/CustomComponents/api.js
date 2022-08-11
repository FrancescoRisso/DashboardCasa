const apiCall = async (link) => {
	let response = await fetch(`/api${link}`);
	let data = await response.json();

	if (response.ok) {
		return data;
	} else {
		throw data;
	}
};

export default apiCall;
