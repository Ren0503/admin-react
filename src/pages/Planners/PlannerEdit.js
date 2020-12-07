import * as React from 'react';
import {
    DateField,
    Edit,
    FormWithRedirect,
    Labeled,
    ReferenceField,
    SelectInput,
    Toolbar,
    useTranslate,
} from 'react-admin';
import { Link as RouterLink } from 'react-router-dom';
import {
    Card,
    CardContent,
    Box,
    Grid,
    Typography,
    Link,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const PlannerTitle= ({ record }) => {
    const translate = useTranslate();
    return record ? (
        <span>
            {translate('resources.planners.title', {
                reference: record.reference,
            })}
        </span>
    ) : null;
};

const UserDetails = ({ record }) => (
    <Box display="flex" flexDirection="column">
        <Typography
            component={RouterLink}
            color="primary"
            to={`/users/${record?.id}`}
            style={{ textDecoration: 'none' }}
        >
            {record?.username}
        </Typography>
        <Typography
            component={Link}
            color="primary"
            href={`mailto:${record?.email}`}
            style={{ textDecoration: 'none' }}
        >
            {record?.email}
        </Typography>
    </Box>
);

const RecipeDetails = ({ record }) => {
    <Box display="flex" flexDirection="column">
        <Typography
            component={RouterLink}
            color="primary"
            to={`/recipes/${record?.id}`}
            style={{ textDecoration: 'none' }}
        >
            {record?.title}
        </Typography>
    </Box>
}

const useEditStyles = makeStyles({
    root: { alignItems: 'flex-start' },
});

const Spacer = () => <Box m={1}>&nbsp;</Box>;

const PlannerForm = (props) => {
    const translate = useTranslate();
    return (
        <FormWithRedirect
            {...props}
            render={(formProps) => (
                <Box maxWidth="50em">
                    <Card>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={8}>
                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'Section Pending'
                                        )}
                                    </Typography>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <Labeled
                                                source="created_at"
                                                resource="planners"
                                            >
                                                <DateField
                                                    source="created_at"
                                                    resource="planners"
                                                    record={formProps.record}
                                                />
                                            </Labeled>
                                        </Grid>
                                    </Grid>
                                    <Grid container>
                                        <Grid item xs={12} sm={12} md={6}>
                                            <SelectInput
                                                resource="planners"
                                                source="status"
                                                choices={[
                                                    {
                                                        id: 'completed',
                                                        name: 'completed',
                                                    },
                                                    {
                                                        id: 'pending',
                                                        name: 'pending',
                                                    },
                                                    {
                                                        id: 'cancelled',
                                                        name: 'cancelled',
                                                    },
                                                    {
                                                        id: 'unknown',
                                                        name: 'unknown',
                                                        disabled: true,
                                                    },
                                                ]}
                                            />
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4}>
                                    <Typography variant="h6" gutterBottom>
                                        {translate(
                                            'Users'
                                        )}
                                    </Typography>
                                    <ReferenceField
                                        source="user_id"
                                        resource="planners"
                                        reference="users"
                                        basePath="/users"
                                        record={formProps.record}
                                        link={false}
                                    >
                                        <UserDetails />
                                    </ReferenceField>
                                </Grid>
                            </Grid>
                            <Spacer />

                            <Typography variant="h6" gutterBottom>
                                {translate('Items')}
                            </Typography>


                        </CardContent>
                        <Toolbar
                            record={formProps.record}
                            basePath={formProps.basePath}
                            undoable={true}
                            invalid={formProps.invalid}
                            handleSubmit={formProps.handleSubmit}
                            saving={formProps.saving}
                            resource="planners"
                        />
                    </Card>
                </Box>
            )}
        />
    );
};
const PlannerEdit = props => {
    const classes = useEditStyles();
    return (
        <Edit
            title={<PlannerTitle />}
            classes={classes}
            {...props}
            component="div"
        >
            <PlannerForm />
        </Edit>
    );
};

export default PlannerEdit;
