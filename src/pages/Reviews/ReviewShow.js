import * as React from 'react';
import {
    DateField,
    ReferenceField,
    Show,
    SimpleShowLayout,
    TextField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
const ReviewShow = props => (
    <Show {...props}>
        <SimpleShowLayout>
            <TextField source="id" />
            <ReferenceField source="recipe_id" reference="recipes">
                <TextField source="title" />
            </ReferenceField>
            <ReferenceField source="user_id" reference="users">
                <TextField source="username" />
            </ReferenceField>
            <DateField source="created_at" />
            <TextField source="body" />
        </SimpleShowLayout>
    </Show>
);

export default ReviewShow;
