import fetchMock from "fetch-mock";

const baseUrl = "http://example.com";

fetchMock
    .post(baseUrl + "/login", {status: 200, body: {token: 'foo'}})
    .get(baseUrl + "/users/~", {status: 200, body: {name: "Foo"}})
    .get(baseUrl + "/users/123", {status: 401, body: {message: "Access Denied"}});

export default async ({url, method, body, token}) => {

    const res = await fetch(baseUrl + url, {
            headers: token ? {Authorization: "Bearer " + token} : {},
            body,
            method
        });

    if (!res.ok) throw res;

    return await res.json();

}

