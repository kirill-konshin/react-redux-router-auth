import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

import LoginForm from '../forms/Login';

export default () => (
    <Card style={{margin: '0 auto', maxWidth: '400px'}} raised>
        <CardContent>
            <LoginForm />
        </CardContent>
    </Card>
);
