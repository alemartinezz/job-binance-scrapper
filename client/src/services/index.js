---
author: No author.
tags:
  - knowledge
  - comp-sci
  - projects
  - binance-scrapper-main
  - client
  - src
  - services
description: No description.
---
const API_URL = `http://${process.env.REACT_APP_API_HOST}:${process.env.REACT_APP_API_PORT}`;

export const getData = (endpoint, idToken = '') => {
    return request(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${idToken}`
        },
    });
}

export const postData = (endpoint, data, idToken = '', hasFile = false) => {

    const headers = hasFile ? {
        'authorization': `Bearer ${idToken}`
    } : {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${idToken}`,
    };

    return request(endpoint, {
        method: 'POST',
        headers,
        body: hasFile ? data : JSON.stringify(data)
    });

}

export const putData = async (endpoint, data, idToken = '', hasFile) => {

    const headers = hasFile ? {
        'authorization': `Bearer ${idToken}`
    } : {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${idToken}`,
    };

    return request(endpoint, {
        method: 'PUT',
        headers,
        body: hasFile ? data : JSON.stringify(data)
    });
}

export const deleteData = async (endpoint, idToken = '') => {
    return await fetch(`${API_URL}${endpoint}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${idToken}`
        }
    });
}

const downloadFile = (blob, filename) => {
    const a = document.createElement('a');
    a.href = blob;
    a.download = filename;
    a.style = "display: none;";
    document.body.appendChild(a);
    a.click();
    a.remove();
}

const parse = (response) => {
    return new Promise((resolve) => {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("json")) {
            return response.json()
                .then((json) =>
                    resolve({
                        status: response.status,
                        ok: response.ok,
                        json
                    })
                )
        } else if (contentType && (contentType.includes("csv") || contentType.includes("pdf"))) {
            return response.blob()
                .then(blob => {
                    const blb = window.URL.createObjectURL(blob);
                    const fileName = response.headers.get('Content-Disposition').split('filename=')[1].split(';')[0];
                    downloadFile(blb, fileName);
                    resolve({
                        status: response.status,
                        ok: response.ok,
                        blob: blb
                    })
                });
        } else {
            return response.text()
                .then((text) => resolve({
                    status: response.status,
                    ok: response.ok,
                    text
                }));
        }
    })
}

const request = (endpoint, options) => {
    return new Promise((resolve, reject) => {
        fetch(API_URL + endpoint, options)
            .then(parse)
            .then((response) => {
                if (response.ok) {
                    return resolve(response.json ? response.json : response.blob ? response.blob : response.text ? response.text : response);
                }
                return reject(response.json ? response.json : response.blob ? response.blob : response.text ? response.text : response);
            })
            .catch((error) => {
                throw new Error(error.message ? error.message : error);
            })
    });
}