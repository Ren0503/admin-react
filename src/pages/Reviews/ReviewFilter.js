import * as React from 'react';
import {
    AutocompleteInput,
    DateInput,
    SelectInput,
    Filter,
    ReferenceInput,
    SearchInput,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';

const ReviewFilter = props => {
    return (
        <Filter {...props}>
            <SearchInput source="q" alwaysOn />
            <ReferenceInput source="user_id" reference="users">
                <SelectInput optionText="username" />
            </ReferenceInput>
            <ReferenceInput source="recipe_id" reference="recipes">
                <SelectInput optionText="title" />
            </ReferenceInput>
        </Filter>
    );
};

export default ReviewFilter;
