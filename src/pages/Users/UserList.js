import * as React from 'react';
import {
    Datagrid,
    DateField,
    DateInput,
    Filter,
    List,
    NullableBooleanInput,
    BooleanField,
    SearchInput,
} from 'react-admin';
import { useMediaQuery } from '@material-ui/core';

import UserLinkField from './UserLinkField';
import MobileGrid from '../../components/Users/MoblieGrid';
import UserListAside from './UserListAside';

const UserFilter = (props) => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <DateInput source="last_seen" />
        <NullableBooleanInput source="planned" />
    </Filter>
);

const UserList = (props) => {
    const isXsmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery(theme => theme.breakpoints.down('sm'));
    return (
        <List
            {...props}
            filters={isSmall ? <UserFilter /> : undefined}
            sort={{ field: 'last_seen', order: 'DESC' }}
            perPage={5}
            aside={<UserListAside />}
        >
            {isXsmall ? (
                <MobileGrid />
            ) : (
                <Datagrid optimized rowClick="edit">
                    <UserLinkField />
                    <DateField source="last_seen" />
                    <BooleanField source="planned" label="Has Planned" />
                </Datagrid>
            )}
        </List>
    );
};

export default UserList;
