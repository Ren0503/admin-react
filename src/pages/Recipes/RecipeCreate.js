import * as React from 'react';
import { useMemo } from 'react';
import RichTextInput from 'ra-input-rich-text';
import {
    ArrayInput,
    AutocompleteInput,
    BooleanInput,
    Create,
    DateInput,
    FormDataConsumer,
    NumberInput,
    ReferenceInput,
    SaveButton,
    SelectInput,
    SimpleForm,
    SimpleFormIterator,
    TextInput,
    Toolbar,
    required,
    FileInput,
    FileField,
} from 'react-admin'; // eslint-disable-line import/no-unresolved
import { FormSpy } from 'react-final-form';

const RecipeCreateToolbar = props => (
    <Toolbar {...props}>
        <SaveButton
            label="recipe.action.save_and_edit"
            redirect="edit"
            submitOnEnter={true}
        />
        <SaveButton
            label="recipe.action.save_and_show"
            redirect="show"
            submitOnEnter={false}
            variant="text"
        />
        <SaveButton
            label="recipe.action.save_and_add"
            redirect={false}
            submitOnEnter={false}
            variant="text"
        />
        <SaveButton
            label="recipe.action.save_with_rate"
            transform={data => ({ ...data, rate: 10 })}
            redirect="show"
            submitOnEnter={false}
            variant="text"
        />
    </Toolbar>
);

const RecipeCreate = ({ permissions, ...props }) => {
    const initialValues = useMemo(
        () => ({
            rate: 0,
        }),
        []
    );

    const dateDefaultValue = useMemo(() => new Date(), []);

    return (
        <Create {...props}>
            <SimpleForm
                toolbar={<RecipeCreateToolbar />}
                initialValues={initialValues}
                validate={values => {
                    const errors = {};
                    ['title', 'desc'].forEach(field => {
                        if (!values[field]) {
                            errors[field] = 'Required field';
                        }
                    });

                    if (values.rate < 0 || values.rate > 5) {
                        errors.rate = 'Should be between 0 and 5';
                    }

                    return errors;
                }}
            >
                <FileInput
                    source="pdffile"
                    label="PDF-Template"
                    accept="application/pdf"
                >
                    <FileField source="src" title="title" />
                </FileInput>
                <TextInput autoFocus source="title" />
                <TextInput source="desc" fullWidth={true} multiline={true} />
                <RichTextInput source="body" validate={required()} />

                <DateInput
                    source="published_at"
                    defaultValue={dateDefaultValue}
                />
                <BooleanInput source="accepted" defaultValue />
                <ArrayInput
                    source="author"
                    validate={[required()]}
                >
                    <SimpleFormIterator>
                        <TextInput source="name" />
                        <TextInput source="email" />
                    </SimpleFormIterator>
                </ArrayInput>
                {permissions === 'admin' && (
                    <ArrayInput source="authors">
                        <SimpleFormIterator>
                            <ReferenceInput
                                label="User"
                                source="user_id"
                                reference="users"
                            >
                                <AutocompleteInput />
                            </ReferenceInput>
                            <FormDataConsumer>
                                {({
                                    formData,
                                    scopedFormData,
                                    getSource,
                                    ...rest
                                }) =>
                                    scopedFormData && scopedFormData.user_id ? (
                                        <SelectInput
                                            label="Role"
                                            source={getSource('role')}
                                            choices={[
                                                {
                                                    id: 'headwriter',
                                                    name: 'Head Writer',
                                                },
                                                {
                                                    id: 'proofreader',
                                                    name: 'Proof reader',
                                                },
                                                {
                                                    id: 'cowriter',
                                                    name: 'Co-Writer',
                                                },
                                            ]}
                                            {...rest}
                                        />
                                    ) : null
                                }
                            </FormDataConsumer>
                        </SimpleFormIterator>
                    </ArrayInput>
                )}
            </SimpleForm>
        </Create>
    );
};

export default RecipeCreate;