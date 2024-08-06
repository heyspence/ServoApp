export const fetchWithFormData = async (url, formData, method) => {
    const options = {
        method: method.toUpperCase(), // Ensure method is in uppercase
        body: formData,
        headers: {
            // CSRF token is required for Rails backend for security
            // 'X-CSRF-Token': //sessionStorage.getItem("X-CSRF-Token")
        }
    };

    // Omit the 'Content-Type' header to let the browser set it automatically for FormData
    return fetch(url, options);
};


export const restoreCSRF = async () => {
    const res = await fetch('/api/session')
    const token = res.headers.get('X-CSRF-Token')
    if(token){
        //sessionStorage.setItem('X-CSRF-Token', token)
    }else{
        //sessionStorage.removeItem('X-CSRF-Token')
    }
}


const csrfFetch = async (url, options = {}) => {
    options.method = options.method || 'GET';
    options.headers = options.headers || {};
    // if(options.method.toUpperCase() !== 'GET'){
    //     options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';
    // options.headers['X-CSRF-Token'] = //sessionStorage.getItem("X-CSRF-Token");
    if (!options.headers['Content-Type'] && !(options.body instanceof FormData)) {
        options.headers['Content-Type'] = 'application/json';
    }
    // }

    // if(options.method.toUpperCase() !== 'GET') {
        
    // }
    const res = await fetch(url, options);
    return res;
}

export default csrfFetch;