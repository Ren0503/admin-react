import * as React from 'react';
import {
    Create,
    DateInput,
    SimpleForm,
    TextInput,
    useTranslate,
    PasswordInput,
    required,
    email,
} from 'react-admin';
import { Typography, Box } from '@material-ui/core';
import { makeStyles  } from '@material-ui/core/styles';

export const styles = {
    username: { display: 'inline-block' },
    email: { display: 'inline-block', marginLeft: 32 },
    comment: {
        maxWidth: '20em',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
    },
    password: { display: 'inline-block' },
    confirm_password: { display: 'inline-block', marginLeft: 32 },
};

const useStyles = makeStyles(styles);

export const validatePasswords = ({
    password,
    confirm_password,
}) => {
    const errors = {};

    if (password && confirm_password && password !== confirm_password) {
        errors.confirm_password = [
            'resources.users.errors.password_mismatch',
        ];
    }

    return errors;
};

const UserCreate = props => {
    const classes = useStyles();

    return (
        <Create {...props}>
            <SimpleForm validate={validatePasswords}>
                <SectionTitle label="resources.users.fieldGroups.identity" />
                <TextInput
                    autoFocus
                    source="username"
                    formClassName={classes.first_name}
                    validate={requiredValidate}
                />
                <TextInput
                    type="email"
                    source="email"
                    validation={{ email: true }}
                    fullWidth
                    formClassName={classes.email}
                    validate={[required(), email()]}
                />
                <Separator />
                <SectionTitle label="resources.users.fieldGroups.password" />
                <PasswordInput
                    source="password"
                    formClassName={classes.password}
                />
                <PasswordInput
                    source="confirm_password"
                    formClassName={classes.confirm_password}
                />
            </SimpleForm>
        </Create>
    );
};

const requiredValidate = [required()];

const SectionTitle = ({ label }) => {
    const translate = useTranslate();

    return (
        <Typography variant="h6" gutterBottom>
            {translate(label)}
        </Typography>
    );
};

const Separator = () => <Box pt="1em" />;

export default UserCreate;
