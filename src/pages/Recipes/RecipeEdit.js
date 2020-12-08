import * as React from 'react';
import {
    Datagrid,
    DateField,
    Edit,
    EditButton,
    FormTab,
    NumberInput,
    Pagination,
    ReferenceInput,
    ReferenceManyField,
    required,
    SelectInput,
    TabbedForm,
    TextField,
    TextInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import RichTextInput from 'ra-input-rich-text';

import UserReferenceField from '../Users/UserReferenceField';
import StarRatingField from '../../components/Reviews/StarRatingField';
import Poster from '../../components/Recipes/Poster';

const RecipeTitle = ({ record }) =>
    record ? <span>Poster #{record.reference}</span> : null;

const useStyles = makeStyles({

    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    tab: {
        maxWidth: '40em',
        display: 'block',
    },
});

const RecipeEdit= props => {
    const classes = useStyles();
    return (
        <Edit {...props} title={<RecipeTitle />}>
            <TabbedForm>
                <FormTab
                    label="Pictures"
                    contentClassName={classes.tab}
                >
                    <Poster />
                    <TextInput
                        source="pictures"
                        fullWidth
                        validate={requiredValidate}
                    />
                </FormTab>
                <FormTab
                    label="Details"
                    path="details"
                    contentClassName={classes.tab}
                >
                    <DateField source="published_at" />
                    <NumberInput
                        source="rate"
                        className={classes.rate}
                        validate={requiredValidate}
                    />
                    <ReferenceInput
                        source="category_id"
                        reference="categories"
                        validate={requiredValidate}
                    >
                        <SelectInput source="name" />
                    </ReferenceInput>
                    <NumberInput
                        source="views"
                        className={classes.views}
                        validate={requiredValidate}
                    />
                    <TextInput source="status" />
                </FormTab>
                <FormTab
                    label="Body"
                    path="body"
                    contentClassName={classes.tab}
                >
                    <RichTextInput
                        source="body"
                        label=""
                        validate={requiredValidate}
                    />
                </FormTab>
                <FormTab label="Reviews" path="reviews">
                    <ReferenceManyField
                        reference="reviews"
                        target="recipe_id"
                        addLabel={false}
                        pagination={<Pagination />}
                        fullWidth
                    >
                        <Datagrid>
                            <DateField source="created_at" />
                            <UserReferenceField />
                            <StarRatingField />
                            <TextField
                                source="body"
                                cellClassName={classes.body}
                            />
                            <EditButton />
                        </Datagrid>
                    </ReferenceManyField>
                </FormTab>
            </TabbedForm>
        </Edit>
    );
};

const requiredValidate = [required()];

export default RecipeEdit;
