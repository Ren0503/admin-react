import * as React from 'react';

import {
    Create,
    DateInput,
    TextInput,
    SimpleForm,
    required,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import RecipeReferenceInput from '../Recipes/RecipeReferenceInput';

const now = new Date();
const defaultSort = { field: 'title', order: 'ASC' };

const ReviewCreate = props => (
    <Create {...props}>
        <SimpleForm redirect={false}>
            <RecipeReferenceInput
                source="recipe_id"
                reference="recipes"
                allowEmpty
                validate={required()}
                perPage={10000}
                sort={defaultSort}
            />
            <RecipeReferenceInput
                source="user_id"
                validate={required()}
                fullWidth
            />
            <DateInput source="created_at" defaultValue={now} />
            <TextInput source="body" fullWidth={true} multiline={true} />
        </SimpleForm>
    </Create>
);

export default ReviewCreate;
