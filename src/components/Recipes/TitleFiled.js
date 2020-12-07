import * as React from 'react';
import { memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';


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


const TitleField = ({ record, size }) => {
    const classes = useStyles();
    return record ? (
        <div className={classes.root}>
            {record.title} 
        </div>
    ) : null;
};

TitleField.defaultProps = {
    source: 'title',
    label: 'resources.recipes.fields.title',
};

export default memo(TitleField);
