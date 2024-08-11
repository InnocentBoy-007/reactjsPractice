export const fetchingAPI = async (url, endpoint, methods) => {
    try {
        const response = await fetch(`${url}/${endpoint}`, {
            methods
        });
        if (response.ok) {
            console.log("datas----->" + JSON.stringify(response));
            return response.json();

        } else {
            throw new Error('Data cannot be fetched!');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}
