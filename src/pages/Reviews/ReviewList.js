import * as React from 'react';
import { Fragment, useCallback } from 'react';
import classnames from 'classnames';
import {
    downloadCSV,
    List,
} from 'react-admin';
import { Route, useHistory } from 'react-router-dom';
import { Drawer, useMediaQuery } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import jsonExport from 'jsonexport/dist';

import ReviewListMobile from './ReviewListMobile';
import ReviewListDesktop from './ReviewListDesktop';
import ReviewFilter from './ReviewFilter';
import ReviewEdit from './ReviewEdit';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    list: {
        flexGrow: 1,
        transition: theme.transitions.create(['all'], {
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    listWithDrawer: {
        marginRight: 400,
    },
    drawerPaper: {
        zIndex: 100,
    },
}));

const exporter = (records, fetchRelatedRecords) => 
    fetchRelatedRecords(records, 'recipe_id', 'recipes', 'user_id', 'users').then((recipes, users) => {
        const data = records.map(record => {
            const { ...recordForExport } = record;
            recordForExport.recipe_title = recipes[record.recipe_id].title;
            recordForExport.user_name = recipes[record.user_id].username;
            return recordForExport;
        });
        const headers = [
            'id',
            'user_id',
            'user_name',
            'recipe_id',
            'recipe_title',
            'created_at',
            'body',
            'rating'
        ];

        jsonExport(data, { headers }, (error, csv) => {
            if(error) {
                console.error(error);
            }
            downloadCSV(csv, 'reviews');
        });
    });

const ReviewList = props => {
    const classes = useStyles();
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const history = useHistory();

    const handleClose = useCallback(() => {
        history.push('/reviews');
    }, [history]);

    return (
        <div className={classes.root}>
            <Route path="/reviews/:id">
                {({ match }) => {
                    const isMatch = !!(
                        match &&
                        match.params &&
                        match.params.id !== 'create'
                    );

                    return (
                        <Fragment>
                            <List exporter={exporter}
                                {...props}
                                className={classnames(classes.list, {
                                    [classes.listWithDrawer]: isMatch,
                                })}
                                filters={<ReviewFilter />}
                                perPage={25}
                                sort={{ field: 'date', order: 'DESC' }}
                            >
                                {isXSmall ? (
                                    <ReviewListMobile />
                                ) : (
                                    <ReviewListDesktop
                                        selectedRow={
                                            isMatch
                                                ? parseInt(
                                                      match.params.id,
                                                      10
                                                  )
                                                : undefined
                                        }
                                    />
                                )}
                            </List>
                            <Drawer
                                variant="persistent"
                                open={isMatch}
                                anchor="right"
                                onClose={handleClose}
                                classes={{
                                    paper: classes.drawerPaper,
                                }}
                            >
                                {/* To avoid any errors if the route does not match, we don't render at all the component in this case */}
                                {isMatch ? (
                                    <ReviewEdit
                                        id={match.params.id}
                                        onCancel={handleClose}
                                        {...props}
                                    />
                                ) : null}
                            </Drawer>
                        </Fragment>
                    );
                }}
            </Route>
        </div>
    );
};

export default ReviewList;
