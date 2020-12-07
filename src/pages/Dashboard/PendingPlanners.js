import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import { useTranslate } from 'react-admin';

const useStyles = makeStyles(theme => ({
    root: {
        flex: 1,
    },
    cost: {
        marginRight: '1em',
        color: theme.palette.text.primary,
    },
}));

const PendingPlanners = ({ planners = [], users = {} }) => {
    const classes = useStyles();
    const translate = useTranslate();
    return (
        <Card className={classes.root}>
            <CardHeader title={translate('New Planners')} />
            <List dense={true}>
                {planners.map(record => (
                    <ListItem
                        key={record.id}
                        button
                        component={Link}
                        to={`/planners/${record.id}`}
                    >
                        <ListItemAvatar>
                            {users[record.user_id] ? (
                                <Avatar
                                    src={`${
                                        users[record.user_id].avatar
                                    }?size=32x32`}
                                />
                            ) : (
                                <Avatar />
                            )}
                        </ListItemAvatar>
                        <ListItemText
                            primary={new Date(record.date).toLocaleString(
                                'en-GB'
                            )}
                            secondary={translate('Planner Item', {
                                smart_count: record.basket.length,
                                user_name: users[record.user_id]
                                    ? `${
                                          users[record.user_id]
                                              .username
                                      } `
                                    : '',
                            })}
                        />
                    </ListItem>
                ))}
            </List>
        </Card>
    );
};

export default PendingPlanners;
