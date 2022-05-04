const URL = 'https://benockertanywhere.pythonanywhere.com'

export async function api_get(path) {
    let req = {
        method: 'GET',
        mode: 'cors'
    }
    let text = await fetch(URL + path, req);
    let resp = await text.json();
    return resp;
}

export async function api_get_with_params(path, params) {
    let req = {
        method: 'GET',
        mode: 'cors'
    }
    let text = await fetch(URL + path + params, req);
    let resp = await text.json();
    return resp;
}