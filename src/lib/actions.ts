export const HTTP = "HTTP";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";
export const LOAD_USER = "LOAD_USER";

export const loadUser = id => (dispatch, getState, api) => dispatch({
    type: LOAD_USER,
    payload: api({url: `/users/${id}`})
});

export const logout = () => ({type: LOGOUT});

export const login = (username, password) => (dispatch, getState, api) => dispatch({
    type: LOGIN,
    payload: api({
        method: "POST",
        url: `/login`,
        body: {username, password}
    })
});

export const loginAndLoadUser = (username, password) => async (dispatch, getState, api) => {
    await dispatch(login(username, password));
    return await dispatch(loadUser("~"));
};
