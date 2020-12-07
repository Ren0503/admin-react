import * as React from 'react';
import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import AvatarField from './AvatarField';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexWrap: 'nowrap',
        alignItems: 'center',
    },
    avatar: {
        marginRight: theme.spacing(1),
        marginTop: -theme.spacing(0.5),
        marginBottom: -theme.spacing(0.5),
    },
}));


const UsernameField = ({ record, size }) => {
    const classes = useStyles();
    return record ? (
        <div className={classes.root}>
            <AvatarField
                className={classes.avatar}
                record={record}
                size={size}
            />
            {record.username} 
        </div>
    ) : null;
};

UsernameField.defaultProps = {
    source: 'username',
    label: 'resources.users.fields.username',
};

export default memo(UsernameField);
