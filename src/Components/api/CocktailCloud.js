
function fetchAPI(request) {
    return fetch(request, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      }).then(response => response.json())
}

export function loadData(api_request, api) {
    return Promise.all(api_request.map(fetchAPI)).then(
    (data) => {
        for (const msg of data){
            if (msg.error){
                api.error_state = true;
                api.last_error_msg = msg.error_msg;
            }
            else {
                Object.assign(api.data, msg.data);
            }
        }
        return api;
    },
    (error) => {
        console.log("error fetching resources:");
        console.log(error);
        return api;
    });
} 