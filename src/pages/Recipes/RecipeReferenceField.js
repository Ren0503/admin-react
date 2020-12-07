import * as React from 'react';
import { ReferenceField, TextField } from 'react-admin';


const RecipeReferenceField = props => (
    <ReferenceField source="recipe_id" reference="recipes" {...props}>
        <TextField source="title" />
    </ReferenceField>
);

RecipeReferenceField.defaultProps = {
    source: 'recipe_id',
    addLabel: true,
};

export default RecipeReferenceField;
