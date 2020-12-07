// in src/comments.js
import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { makeStyles } from '@material-ui/core/styles';
import {
    DateField,
    EditButton,
    useTranslate,
    BooleanField,
} from 'react-admin';

import AvatarField from './AvatarField';
import ColoredNumberField from './ColoredNumberField';

const useStyles = makeStyles(theme => ({
    root: { margin: '1em' },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        margin: '0.5rem 0',
    },
    cardTitleContent: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cardContent: {
        ...theme.typography.body1,
        display: 'flex',
        flexDirection: 'column',
    },
}));

const MobileGrid = ({ ids, data, basePath }) => {
    const translate = useTranslate();
    const classes = useStyles();

    if (!ids || !data) {
        return null;
    }

    return (
        <div className={classes.root}>
            {ids.map(id => (
                <Card key={id} className={classes.card}>
                    <CardHeader
                        title={
                            <div className={classes.cardTitleContent}>
                                <h2>{`${data[id].username}`}</h2>
                                <EditButton
                                    resource="users"
                                    basePath={basePath}
                                    record={data[id]}
                                />
                            </div>
                        }
                        avatar={<AvatarField record={data[id]} size="45" />}
                    />
                    <CardContent className={classes.cardContent}>
                        <div>
                            {translate(
                                'resources.customers.fields.last_seen_gte'
                            )}
                            &nbsp;
                            <DateField record={data[id]} source="last_seen" />
                        </div>
                        <div>
                            <BooleanField source="planned" label="Plan." />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

MobileGrid.defaultProps = {
    data: {},
    ids: [],
};

export default MobileGrid;
