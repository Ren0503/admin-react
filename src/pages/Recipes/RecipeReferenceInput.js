import * as React from 'react';
import { Fragment, useState, useCallback } from 'react';
import { FormSpy, useForm } from 'react-final-form';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { ReferenceInput, SelectInput, useTranslate } from 'react-admin'; // eslint-disable-line import/no-unresolved

import RecipeQuickCreate from './RecipeQuickCreate';
import RecipePreview from './RecipePreview';

const useStyles = makeStyles({
    button: {
        margin: '10px 24px',
        position: 'relative',
    },
});

const RecipeReferenceInput = props => {
    const translate = useTranslate();
    const classes = useStyles();
    const { change } = useForm();

    const [showCreateDialog, setShowCreateDialog] = useState(false);
    const [showPreviewDialog, setShowPreviewDialog] = useState(false);
    const [newRecipeId, setNewRecipeId] = useState('');
    const [version, setVersion] = useState(0);

    const handleNewClick = useCallback(
        event => {
            event.preventDefault();
            setShowCreateDialog(true);
        },
        [setShowCreateDialog]
    );

    const handleShowClick = useCallback(
        event => {
            event.preventDefault();
            setShowPreviewDialog(true);
        },
        [setShowPreviewDialog]
    );

    const handleCloseCreate = useCallback(() => {
        setShowCreateDialog(false);
    }, [setShowCreateDialog]);

    const handleCloseShow = useCallback(() => {
        setShowPreviewDialog(false);
    }, [setShowPreviewDialog]);

    const handleSave = useCallback(
        recipe => {
            setShowCreateDialog(false);
            setNewRecipeId(recipe.id);
            setVersion(previous => previous + 1);
            change('recipe_id', recipe.id);
        },
        [setShowCreateDialog, setNewRecipeId, change]
    );

    return (
        <Fragment>
            <ReferenceInput key={version} {...props} defaultValue={newRecipeId}>
                <SelectInput optionText="title" />
            </ReferenceInput>
            <Button
                data-testid="button-add-Recipe"
                className={classes.button}
                onClick={handleNewClick}
            >
                {translate('ra.action.create')}
            </Button>
            <FormSpy
                subscription={{ values: true }}
                render={({ values }) =>
                    values.Recipe_id ? (
                        <Fragment>
                            <Button
                                data-testid="button-show-Recipe"
                                className={classes.button}
                                onClick={handleShowClick}
                            >
                                {translate('ra.action.show')}
                            </Button>
                            <Dialog
                                data-testid="dialog-show-Recipe"
                                fullWidth
                                open={showPreviewDialog}
                                onClose={handleCloseShow}
                                aria-label={translate('simple.create-Recipe')}
                            >
                                <DialogTitle>
                                    {translate('simple.create-Recipe')}
                                </DialogTitle>
                                <DialogContent>
                                    <RecipePreview
                                        id={values.Recipe_id}
                                        basePath="/Recipes"
                                        resource="Recipes"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button
                                        data-testid="button-close-modal"
                                        onClick={handleCloseShow}
                                    >
                                        {translate('simple.action.close')}
                                    </Button>
                                </DialogActions>
                            </Dialog>
                        </Fragment>
                    ) : null
                }
            />
            <Dialog
                data-testid="dialog-add-Recipe"
                fullWidth
                open={showCreateDialog}
                onClose={handleCloseCreate}
                aria-label={translate('simple.create-Recipe')}
            >
                <DialogTitle>{translate('simple.create-Recipe')}</DialogTitle>
                <DialogContent>
                    <RecipeQuickCreate
                        onCancel={handleCloseCreate}
                        onSave={handleSave}
                        basePath="/Recipes"
                        resource="Recipes"
                    />
                </DialogContent>
            </Dialog>
        </Fragment>
    );
};

export default RecipeReferenceInput;
