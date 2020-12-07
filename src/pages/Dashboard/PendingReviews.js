import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import CommentIcon from '@material-ui/icons/Comment';
import { Link } from 'react-router-dom';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';
import StarRatingField from '../../components/Reviews/StarRatingField';

const PendingReviews = ({ reviews = [], users = {}, nb }) => {
    const classes = useStyles();
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/reviews"
            icon={CommentIcon}
            title={translate('Pending Reviews')}
            subtitle={nb}
        >
            <List>
                {reviews.map((record) => (
                    <ListItem
                        key={record.id}
                        button
                        component={Link}
                        to={`/reviews/${record.id}`}
                        alignItems="flex-start"
                    >
                        <ListItemAvatar>
                            {users[record.user_id] ? (
                                <Avatar
                                    src={`${
                                        users[record.user_id].avatar
                                    }?size=32x32`}
                                    className={classes.avatar}
                                />
                            ) : (
                                <Avatar />
                            )}
                        </ListItemAvatar>

                        <ListItemText
                            primary={<StarRatingField record={record} />}
                            secondary={record.body}
                            className={classes.listItemText}
                            style={{ paddingRight: 0 }}
                        />
                    </ListItem>
                ))}
            </List>
            <Box flexGrow="1">&nbsp;</Box>
            <Button
                className={classes.link}
                component={Link}
                to="/reviews"
                size="small"
                color="primary"
            >
                <Box p={1} className={classes.linkContent}>
                    {translate('All Reviews')}
                </Box>
            </Button>
        </CardWithIcon>
    );
};

const useStyles = makeStyles(theme => ({
    avatar: {
        background: theme.palette.background.paper,
    },
    listItemText: {
        overflowY: 'hidden',
        height: '4em',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
    },
    link: {
        borderRadius: 0,
    },
    linkContent: {
        color: theme.palette.primary.main,
    },
}));

export default PendingReviews;
