import * as React from 'react';
import {
    Datagrid,
    Edit,
    EditButton,
    NumberField,
    ReferenceManyField,
    SimpleForm,
    TextInput,
    useTranslate,
    TextField,
} from 'react-admin';

import ThumbnailField from '../../components/Recipes/ThumbnailField';
import RecipeReferenceField from '../Recipes/RecipeReferenceField';

const CategoryTitle = ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.categories.name', { smart_count: 1 })} &quot;
            {record.name}&quot;
        </span>
    ) : null;
};

const CategoryEdit = props => (
    <Edit title={<CategoryTitle />} {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <ReferenceManyField
                reference="recipes"
                target="category_id"
                label="resources.categories.fields.recipes"
                perPage={20}
                fullWidth
            >
                <Datagrid>
                    <ThumbnailField />
                    <TextField source="title" />
                    <NumberField source="views" />
                    <NumberField source="rates" />
                    <EditButton />
                </Datagrid>
            </ReferenceManyField>
        </SimpleForm>
    </Edit>
);

export default CategoryEdit;
