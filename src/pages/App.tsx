import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {getUser} from '../redux/reducer';
import {logout, loadUser} from '../redux/actions';
import {instanceOf} from 'prop-types';

const LinkTab = props => {
    return <Tab component={Link} {...props} />;
};

const App = ({logout, loadUser, user, children, match: {url}, location: {pathname}}) =>
    !user ? (
        <div>Loading...</div>
    ) : (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" color="inherit" style={{flexGrow: 1}}>
                        Application
                    </Typography>
                    <Button color="inherit" onClick={e => logout()}>
                        Logout {user.name}
                    </Button>
                </Toolbar>
            </AppBar>

            <Card style={{maxWidth: '500px', margin: '90px auto 0 auto'}} raised>
                <Tabs fullWidth value={pathname.replace(url + '/', '')} onChange={this.handleChange}>
                    <LinkTab to="/app/allowed" value="allowed" label="Allowed" />
                    <LinkTab to="/app/not-allowed" value="not-allowed" label="Not Allowed" />
                </Tabs>
                <CardContent>{children}</CardContent>
                <CardActions>
                    <Button
                        size="small"
                        onClick={async e => {
                            try {
                                console.log(await loadUser('123'));
                            } catch (e) {
                                console.error('Action failed, caught locally:', e instanceof Response ? e.statusText : e.message);
                            }
                        }}
                    >
                        Attempt to load someone else (results in logout)
                    </Button>
                </CardActions>
            </Card>
        </>
    );

export default connect(
    state => ({
        user: getUser(state)
    }),
    {
        logout,
        loadUser
    }
)(App);
