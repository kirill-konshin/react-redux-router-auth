import React from 'react';
import {observable, computed, action, runInAction} from 'mobx';
import {observer} from 'mobx-react';
import DevTool from 'mobx-react-devtools';
import {connect} from 'react-redux';
import {compose, withProps} from 'recompose';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import {generic} from '../redux/actions';

class MobxStore {
    generic;

    constructor(generic) {
        this.generic = generic;
    }

    @observable
    price = 100;

    @observable
    amount = 10;

    @observable
    status = 'init';

    @observable
    something = null;

    @observable
    error = null;

    @action
    async fetchSomething() {
        this.status = 'pending';
        this.something = null;
        this.error = null;
        try {
            const res = await this.generic({url: '/something'});
            runInAction(() => {
                this.something = res.value;
                this.status = 'done';
            });
        } catch (error) {
            runInAction(() => {
                this.status = 'error';
                this.error = error;
            });
        }
    }

    @computed
    get total() {
        return this.price * this.amount;
    }

    set total(total) {
        this.price = total / this.amount; // infer price from total
    }
}

interface MobxProps {
    generic: any;
    store: MobxStore;
}
const Mobx: React.SFC<MobxProps> = ({store}) => (
    <div>
        <DevTool />
        <div>
            <TextField
                label="Amount"
                value={store.amount}
                onChange={e => (store.amount = parseInt(e.target.value, 10) || 0)}
                style={{width: 60, verticalAlign: 'baseline'}}
            />
            &nbsp;&times;&nbsp;
            <TextField
                label="Price"
                value={store.price}
                onChange={e => (store.price = parseInt(e.target.value, 10) || 0)}
                style={{width: 100}}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
            />
            &nbsp;=&nbsp;
            <TextField
                label="Total"
                value={store.total}
                onChange={e => (store.total = parseInt(e.target.value, 10) || 0)}
                style={{width: 100}}
                InputProps={{
                    startAdornment: <InputAdornment position="start">$</InputAdornment>
                }}
            />
        </div>
        <br />
        <br />
        <div>
            <TextField
                label="Result"
                multiline
                rows="2"
                disabled
                value={store.error ? store.error.toString() : JSON.stringify(store.something)}
                style={{width: 300}}
            />
        </div>
        <div>
            {store.status === 'pending' ? (
                <CircularProgress size={32} />
            ) : (
                <Button onClick={() => store.fetchSomething()}>Fetch</Button>
            )}
        </div>
    </div>
);

export default compose(
    connect(
        null,
        {generic}
    ),
    withProps(({generic}) => ({store: new MobxStore(generic)})),
    observer
)(Mobx);
