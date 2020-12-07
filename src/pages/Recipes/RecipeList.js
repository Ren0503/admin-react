import * as React from 'react';
import { Children, Fragment, cloneElement, memo } from 'react';
import BookIcon from '@material-ui/icons/Book';
import Chip from '@material-ui/core/Chip';
import { useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import lodashGet from 'lodash/get';
import jsonExport from 'jsonexport/dist';
import {
    BooleanField,
    BulkDeleteButton,
    BulkExportButton,
    ChipField,
    Datagrid,
    DateField,
    downloadCSV,
    EditButton,
    Filter,
    List,
    NumberField,
    ReferenceArrayField,
    SearchInput,
    ShowButton,
    SimpleList,
    SingleFieldList,
    TextField,
    TextInput,
    useTranslate,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
//import BulkAcceptButton from '../../components/Recipes/BulkAcceptButton'
//import BulkRejectButton from '../../components/Recipes/BulkRejectButton'
//import ResetViewsButton from '../../components/Recipes/ResetViewsButton';
export const RecipeIcon = BookIcon;

const useQuickFilterStyles = makeStyles(theme => ({
    chip: {
        marginBottom: theme.spacing(1),
    },
}));
const QuickFilter = ({ label }) => {
    const translate = useTranslate();
    const classes = useQuickFilterStyles();
    return <Chip className={classes.chip} label={translate(label)} />;
};

const RecipeFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <TextInput
            source="title"
            defaultValue="Title"
        />
        <QuickFilter
            label="Accepted"
            source="accepted"
            defaultValue
        />
    </Filter>
);

const useStyles = makeStyles(theme => ({
    title: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    hiddenOnSmallScreens: {
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
    publishedAt: { fontStyle: 'italic' },
}));
/*
const RecipeListBulkActions = memo(props => (
    <Fragment>
        <ResetViewsButton {...props} />
        <BulkAcceptButton {...props} />
        <BulkRejectButton {...props} />
        <BulkDeleteButton {...props} />
        <BulkExportButton {...props} />
    </Fragment>
));
*/
const useRecipeListActionToolbarStyles = makeStyles({
    toolbar: {
        alignItems: 'center',
        display: 'flex',
        marginTop: -1,
        marginBottom: -1,
    },
});

const RecipeListActionToolbar = ({ children, ...props }) => {
    const classes = useRecipeListActionToolbarStyles();
    return (
        <div className={classes.toolbar}>
            {Children.map(children, button => cloneElement(button, props))}
        </div>
    );
};

const rowClick = (id, basePath, record) => {
    if (record.accepted) {
        return 'edit';
    }

    return 'show';
};

const RecipePanel = ({ id, record, resource }) => (
    <div dangerouslySetInnerHTML={{ __html: record.body }} />
);

const RecipeList = props => {
    const classes = useStyles();
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List
            {...props}
            filters={<RecipeFilter />}
            sort={{ field: 'published_at', order: 'DESC' }}
        >
            {isSmall ? (
                <SimpleList
                    primaryText={record => record.title}
                    secondaryText={record => `${record.views} views`}
                    tertiaryText={record =>
                        new Date(record.published_at).toLocaleDateString()
                    }
                />
            ) : (
                <Datagrid rowClick={rowClick} expand={RecipePanel} optimized>
                    <TextField source="id" />
                    <TextField source="title" cellClassName={classes.title} />
                    <DateField
                        source="published_at"
                        sortByOrder="DESC"
                        cellClassName={classes.publishedAt}
                    />

                    <BooleanField
                        source="accepted"
                        label="Accepted"
                        sortable={false}
                    />
                    <NumberField source="views" sortByOrder="DESC" />
                    <ReferenceArrayField
                        label="Tags"
                        reference="tags"
                        source="tags"
                        sortBy="tags.name"
                        sort={{ field: 'name', order: 'ASC' }}
                        cellClassName={classes.hiddenOnSmallScreens}
                        headerClassName={classes.hiddenOnSmallScreens}
                    >
                        <SingleFieldList>
                            <ChipField source="name" size="small" />
                        </SingleFieldList>
                    </ReferenceArrayField>
                    <RecipeListActionToolbar>
                        <EditButton />
                        <ShowButton />
                    </RecipeListActionToolbar>
                </Datagrid>
            )}
        </List>
    );
};

export default RecipeList;
