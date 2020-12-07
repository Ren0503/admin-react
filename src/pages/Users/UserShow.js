import * as React from 'react';
import {
    Edit,
    BooleanField,
    TextField,
    Toolbar,
    useTranslate,
    FormWithRedirect,
} from 'react-admin';
import { Box, Card, CardContent, Typography } from '@material-ui/core';

import Aside from '../../components/Users/Aside';
import UsernameField from '../../components/Users/UsernameField';
import { validatePasswords } from './UserCreate';

const UserShow = props => {
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
                                            'Identity'
                                        )}
                                    </Typography>
                                    <TextField
                                        source="username"
                                    />
                                    <TextField
                                        type="email"
                                        source="email"
                                    />

                                    <Box mt="1em" />
                                </Box>
                                <Box
                                    flex={1}
                                    ml={{ xs: 0, lg: '1em' }}
                                    mt={{ xs: '1em', lg: 0 }}
                                >
                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'Stats'
                                        )}
                                    </Typography>
                                    <div>
                                        <BooleanField
                                            source="planned"
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
                            resource="users"
                        />
                    </form>
                </Card>
            )}
        />
    );
};

export default UserShow;
