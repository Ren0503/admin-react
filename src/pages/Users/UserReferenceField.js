import * as React from 'react';
import { ReferenceField } from 'react-admin';

import UsernameField from '../../components/Users/UsernameField';

const UserReferenceField = props => (
    <ReferenceField source="user_id" reference="users" {...props}>
        <UsernameField />
    </ReferenceField>
);

UserReferenceField.defaultProps = {
    source: 'user_id',
    addLabel: true,
};

export default UserReferenceField;
