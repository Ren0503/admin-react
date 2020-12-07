import * as React from 'react';
import {
    Datagrid,
    DateField,
    TextField,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

import RecipeReferenceField from '../Recipes/RecipeReferenceField';
import UserReferenceField from '../Users/UserReferenceField';
import StarRatingField from '../../components/Reviews/StarRatingField';
//import rowStyle from '../../components/Reviews/RowStyle';

const useListStyles = makeStyles({
    headerRow: {
        borderLeftColor: 'transparent',
        borderLeftWidth: 5,
        borderLeftStyle: 'solid',
    },
    headerCell: {
        padding: '6px 8px 6px 8px',
    },
    rowCell: {
        padding: '6px 8px 6px 8px',
    },
    comment: {
        maxWidth: '18em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
});

const ReviewListDesktop = ({
    selectedRow,
    ...props
}) => {
    const classes = useListStyles();
    return (
        <Datagrid
            rowClick="show"
            // @ts-ignore
            classes={{
                headerRow: classes.headerRow,
                headerCell: classes.headerCell,
                rowCell: classes.rowCell,
            }}
            optimized
            {...props}
        >
            <DateField source="created_at" />
            <UserReferenceField link={false} />
            <RecipeReferenceField link={false} />
            <StarRatingField size="small" />
            <TextField source="body" cellClassName={classes.body} />
        </Datagrid>
    );
};

export default ReviewListDesktop;
