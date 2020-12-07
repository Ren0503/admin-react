import * as React from 'react';
import Icon from '@material-ui/icons/Stars';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        opacity: 0.87,
        whiteSpace: 'nowrap',
        display: 'flex',
    },
    large: {
        width: 20,
        height: 20,
    },
    small: {
        width: 15,
        height: 15,
    },
});


const StarRatingField = ({
    record,
    size = 'large',
}) => {
    const classes = useStyles();
    return record ? (
        <span className={classes.root}>
            {Array(record.rating)
                .fill(true)
                .map((_, i) => (
                    <Icon
                        key={i}
                        className={
                            size === 'large' ? classes.large : classes.small
                        }
                    />
                ))}
        </span>
    ) : null;
};

StarRatingField.defaultProps = {
    label: 'Rating',
    source: 'rating',
    addLabel: true,
};

export default StarRatingField;
