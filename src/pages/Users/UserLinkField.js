import * as React from 'react';
import { Link } from 'react-admin';

import UsernameField from '../../components/Users/UsernameField';

const UserLinkField = props =>
    props.record ? (
        <Link to={`/users/${props.record.id}`}>
            <UsernameField {...props} />
        </Link>
    ) : null;

UserLinkField.defaultProps = {
    source: 'user_id',
    addLabel: true,
};

export default UserLinkField;
