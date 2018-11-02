import fetchMock from 'fetch-mock';

const baseUrl = 'http://example.com';

const delay = () => new Promise((res, rej) => setTimeout(res, 1000));

fetchMock
    .post(`${baseUrl}/login`, {status: 200, body: {token: 'foo'}})
    .get(`${baseUrl}/users/~`, {status: 200, body: {name: 'Foo'}})
    .get(`${baseUrl}/users/123`, {status: 401, body: {message: 'Access Denied'}})
    .get(`${baseUrl}/something`, () => delay().then(() => ({status: 200, body: {foo: 'bar'}})));

export default async ({url, method, body, token}) =>
    fetch(baseUrl + url, {
        headers: token ? {Authorization: `Bearer ${token}`} : {},
        body,
        method
    });
