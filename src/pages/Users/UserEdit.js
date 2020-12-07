import * as React from 'react';
import {
    Edit,
    NullableBooleanInput,
    TextInput,
    PasswordInput,
    Toolbar,
    useTranslate,
    FormWithRedirect,
    required,
    email,
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

import Aside from '../../components/Users/Aside';
import UsernameField from '../../components/Users/UsernameField';
import { validatePasswords } from './UserCreate';

const UserEdit = props => {
    return (
        <Edit
            title={<UserTitle />}
            aside={<Aside />}
            component="div"
            {...props}
        >
            <UserForm />
        </Edit>
    );
};

const UserTitle = ({ record }) =>
    record ? <UsernameField record={record} size="32" /> : null;

const UserForm = (props) => {
    const translate = useTranslate();

    return (
        <FormWithRedirect
            {...props}
            validate={validatePasswords}
            render={(formProps) => (
                <Card>
                    <form>
                        <CardContent>
                            <Box display={{ md: 'block', lg: 'flex' }}>
                                <Box flex={2} mr={{ md: 0, lg: '1em' }}>
                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'resources.users.fieldGroups.identity'
                                        )}
                                    </Typography>
                                    <TextInput
                                        source="username"
                                        resource="users"
                                        validate={requiredValidate}
                                        fullWidth
                                    />
                                    <TextInput
                                        type="email"
                                        source="email"
                                        resource="users"
                                        validate={[email(), required()]}
                                        fullWidth
                                    />

                                    <Box mt="1em" />

                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'resources.users.fieldGroups.change_password'
                                        )}
                                    </Typography>
                                    <Box display={{ xs: 'block', sm: 'flex' }}>
                                        <Box
                                            flex={1}
                                            mr={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <PasswordInput
                                                source="password"
                                                resource="users"
                                                fullWidth
                                            />
                                        </Box>
                                        <Box
                                            flex={1}
                                            ml={{ xs: 0, sm: '0.5em' }}
                                        >
                                            <PasswordInput
                                                source="confirm_password"
                                                resource="users"
                                                fullWidth
                                            />
                                        </Box>
                                    </Box>
                                </Box>
                                <Box
                                    flex={1}
                                    ml={{ xs: 0, lg: '1em' }}
                                    mt={{ xs: '1em', lg: 0 }}
                                >
                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'resources.users.fieldGroups.stats'
                                        )}
                                    </Typography>
                                    <div>
                                        <NullableBooleanInput
                                            source="planned"
                                            resource="users"
                                        />
                                    </div>
                                </Box>
                            </Box>
                        </CardContent>
                        <Toolbar
                            record={formProps.record}
                            basePath={formProps.basePath}
                            undoable={true}
                            invalid={formProps.invalid}
                            handleSubmit={formProps.handleSubmit}
                            saving={formProps.saving}
                            resource="users"
                        />
                    </form>
                </Card>
            )}
        />
    );
};

const requiredValidate = [required()];

export default UserEdit;
