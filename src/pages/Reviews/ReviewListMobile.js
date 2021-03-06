import * as React from 'react';
import { Fragment } from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import {
    linkToRecord,
    ReferenceField,
    FunctionField,
    TextField,
    useListContext,
} from 'react-admin';

import AvatarField from '../../components/Users/AvatarField';

const useStyles = makeStyles({
    root: {
        width: '100vw',
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
    inline: {
        display: 'inline',
    },
});

const ReviewListMobile = () => {
    const classes = useStyles();
    const { basePath, data, ids, loaded, total } = useListContext();

    return loaded || Number(total) > 0 ? (
        <List className={classes.root}>
            {(ids).map(id => {
                const item = (data)[id];
                if (!item) return null;

                return (
                    <Link
                        to={linkToRecord(basePath, id)}
                        className={classes.link}
                        key={id}
                    >
                        <ListItem button>
                            <ListItemAvatar>
                                <ReferenceField
                                    record={item}
                                    source="user_id"
                                    reference="users"
                                    basePath={basePath}
                                    link={false}
                                >
                                    <AvatarField size="40" />
                                </ReferenceField>
                            </ListItemAvatar>
                            <ListItemText
                                primary={
                                    <Fragment>
                                        <ReferenceField
                                            record={item}
                                            source="user_id"
                                            reference="users"
                                            basePath={basePath}
                                            link={false}
                                        >
                                            <FunctionField
                                                render={(record) =>
                                                    record
                                                        ? `${
                                                              (record)
                                                                  .username
                                                          }`
                                                        : ''
                                                }
                                                variant="subtitle1"
                                                className={classes.inline}
                                            />
                                        </ReferenceField>{' '}
                                        on{' '}
                                        <ReferenceField
                                            record={item}
                                            source="recipe_id"
                                            reference="recipes"
                                            basePath={basePath}
                                            link={false}
                                        >
                                            <TextField
                                                source="reference"
                                                variant="subtitle1"
                                                className={classes.inline}
                                            />
                                        </ReferenceField>
                                    </Fragment>
                                }
                                secondary={item.comment}
                                secondaryTypographyProps={{ noWrap: true }}
                            />
                        </ListItem>
                    </Link>
                );
            })}
        </List>
    ) : null;
};

ReviewListMobile.propTypes = {
    basePath: PropTypes.string,
    data: PropTypes.any,
    hasBulkActions: PropTypes.bool.isRequired,
    ids: PropTypes.array,
    onToggleItem: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
};

ReviewListMobile.defaultProps = {
    hasBulkActions: false,
    selectedIds: [],
};

export default ReviewListMobile;
