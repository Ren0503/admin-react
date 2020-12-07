import * as React from 'react';
import {
    BooleanField,
    CloneButton,
    ChipField,
    Datagrid,
    DateField,
    EditButton,
    NumberField,
    ReferenceArrayField,
    ReferenceManyField,
    ReferenceField,
    RichTextField,
    SelectField,
    ShowContextProvider,
    ShowView,
    SingleFieldList,
    Tab,
    TabbedShowLayout,
    TextField,
    useShowController,
} from 'react-admin';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import RecipeTitle from './RecipeTitle';


const CreateRelatedReview = ({ record }) => (
    <Button
        component={Link}
        to={{
            pathname: '/reviews/create',
            state: { record: { recipe_id: record.id } },
        }}
    >
        Add comment
    </Button>
);

const RecipeShow = props => {
    const controllerProps = useShowController(props);
    return (
        <ShowContextProvider value={controllerProps}>
            <ShowView title={<RecipeTitle />}>
                <TabbedShowLayout>
                    <Tab label="summary">
                        <TextField source="id" />
                        <TextField source="title" />
                        <TextField source="desc" />
                        <ReferenceField label="User" source="userId" reference="users">
                            <TextField source="username" />
                        </ReferenceField>
                    </Tab>
                    <Tab label="body">
                        <RichTextField
                            source="body"
                            stripTags={false}
                            label=""
                            addLabel={false}
                        />
                    </Tab>
                    <Tab label="miscellaneous">
                        <ReferenceArrayField
                            reference="tags"
                            source="tags"
                            sort={{ field: 'name', order: 'ASC' }}
                        >
                            <SingleFieldList>
                                <ChipField source="name" />
                            </SingleFieldList>
                        </ReferenceArrayField>

                        <DateField source="published_at" />
                        <ReferenceField
                            reference="categories"
                            source="category_id"
                            sort={{ field: 'name', order: 'ASC' }}
                        >
                            <TextField source="name" />
                        </ReferenceField>

                        <NumberField source="rate" />
                        <BooleanField source="accepted" />
                        <TextField source="views" />
                        <CloneButton />
                    </Tab>
                    <Tab label="reviews">
                        <ReferenceManyField
                            addLabel={false}
                            reference="reviews"
                            target="recipe_id"
                            sort={{ field: 'created_at', order: 'DESC' }}
                        >
                            <Datagrid>
                                <DateField source="created_at" />
                                <ReferenceField
                                    reference="users"
                                    source="user_id"
                                    sort={{ field: 'username', order: 'ASC' }}
                                >
                                    <TextField source="username" />
                                </ReferenceField>                                <TextField source="body" />
                                <EditButton />
                            </Datagrid>
                        </ReferenceManyField>
                        <CreateRelatedReview />
                    </Tab>
                </TabbedShowLayout>
            </ShowView>
        </ShowContextProvider>
    );
};

export default RecipeShow;
