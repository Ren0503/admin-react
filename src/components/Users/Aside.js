import * as React from 'react';
import { FC } from 'react';
import PropTypes from 'prop-types';
import {
    NumberField,
    TextField,
    DateField,
    useTranslate,
    useGetList,
    Record,
    RecordMap,
    Identifier,
    ReferenceField,
    useLocale,
} from 'react-admin';
import {
    Typography,
    Card,
    CardContent,
    Box,
    Link,
    Stepper,
    Step,
    StepLabel,
    StepContent,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { makeStyles } from '@material-ui/core/styles';

import planner from '../../pages/Planners';
import review from '../../pages/Reviews';
import StarRatingField from '../Reviews/StarRatingField';

const useAsideStyles = makeStyles(theme => ({
    root: {
        width: 400,
        [theme.breakpoints.down('md')]: {
            display: 'none',
        },
    },
}));


const Aside = ({ record, basePath }) => {
    const classes = useAsideStyles();
    return (
        <div className={classes.root}>
            {record && <EventList record={record} basePath={basePath} />}
        </div>
    );
};

Aside.propTypes = {
    record: PropTypes.any,
    basePath: PropTypes.string,
};

const useEventStyles = makeStyles({
    stepper: {
        background: 'none',
        bplanner: 'none',
        marginLeft: '0.3em',
    },
});

const EventList = ({ record, basePath }) => {
    const translate = useTranslate();
    const classes = useEventStyles();
    const locale = useLocale();
    const { data: planners, ids: plannerIds } = useGetList(
        'commands',
        { page: 1, perPage: 100 },
        { field: 'date', planner: 'DESC' },
        { user_id: record && record.id }
    );
    const { data: reviews, ids: reviewIds } = useGetList(
        'reviews',
        { page: 1, perPage: 100 },
        { field: 'date', planner: 'DESC' },
        { user_id: record && record.id }
    );
    const events = mixplannersAndReviews(planners, plannerIds, reviews, reviewIds);

    return (
        <>
            <Box m="0 0 1em 1em">
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {translate(
                                'History'
                            )}
                        </Typography>
                        <Box display="flex">
                            <Box flexGrow={1}>
                                <Box display="flex" mb="1em">
                                    <Box mr="1em">
                                        <AccessTimeIcon
                                            fontSize="small"
                                            color="disabled"
                                        />
                                    </Box>
                                    <Box flexGrow={1}>
                                        <Typography>
                                            {translate(
                                                'First_seen'
                                            )}
                                        </Typography>
                                        <DateField
                                            record={record}
                                            source="first_seen"
                                        />
                                    </Box>
                                </Box>
                                {plannerIds && plannerIds.length > 0 && (
                                    <Box display="flex">
                                        <Box mr="1em">
                                            <planner.icon
                                                fontSize="small"
                                                color="disabled"
                                            />
                                        </Box>
                                        <Box flexGrow={1}>
                                            <Typography>
                                                {translate(
                                                    'resources.commands.amount',
                                                    {
                                                        smart_count:
                                                            plannerIds.length,
                                                    }
                                                )}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                            <Box flexGrow={1}>
                                <Box display="flex" mb="1em">
                                    <Box mr="1em">
                                        <AccessTimeIcon
                                            fontSize="small"
                                            color="disabled"
                                        />
                                    </Box>
                                    <Box flexGrow={1}>
                                        <Typography>
                                            {translate(
                                                'Last_seen'
                                            )}
                                        </Typography>
                                        <DateField
                                            record={record}
                                            source="last_seen"
                                        />
                                    </Box>
                                </Box>
                                {reviewIds && reviewIds.length > 0 && (
                                    <Box display="flex">
                                        <Box mr="1em">
                                            <review.icon
                                                fontSize="small"
                                                color="disabled"
                                            />
                                        </Box>
                                        <Box flexGrow={1}>
                                            <Typography>
                                                {translate(
                                                    'resources.reviews.amount',
                                                    {
                                                        smart_count:
                                                            reviewIds.length,
                                                    }
                                                )}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Box>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Stepper orientation="vertical" classes={{ root: classes.stepper }}>
                {events.map(event => (
                    <Step
                        key={`${event.type}-${event.data.id}`}
                        expanded
                        active
                        completed
                    >
                        <StepLabel
                            StepIconComponent={() => {
                                const Component =
                                    event.type === 'planner'
                                        ? planner.icon
                                        : review.icon;
                                return (
                                    <Component
                                        fontSize="small"
                                        color="disabled"
                                        style={{ paddingLeft: 3 }}
                                    />
                                );
                            }}
                        >
                            {new Date(event.date).toLocaleString(locale, {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                                hour: 'numeric',
                                minute: 'numeric',
                            })}
                        </StepLabel>
                        <StepContent>
                            {event.type === 'planner' ? (
                                <planner
                                    record={event.data}
                                    key={`event_${event.data.id}`}
                                    basePath={basePath}
                                />
                            ) : (
                                <Review
                                    record={event.data}
                                    key={`review_${event.data.id}`}
                                    basePath={basePath}
                                />
                            )}
                        </StepContent>
                    </Step>
                ))}
            </Stepper>
        </>
    );
};

const mixplannersAndReviews = (
    planners,
    plannerIds,
    reviews,
    reviewIds
) => {
    const eventsFromPlanners =
        plannerIds && planners
            ? plannerIds.map(id => ({
                  type: 'planner',
                  date: planners[id].date,
                  data: planners[id],
              }))
            : [];
    const eventsFromReviews =
        reviewIds && reviews
            ? reviewIds.map(id => ({
                  type: 'review',
                  date: reviews[id].date,
                  data: reviews[id],
              }))
            : [];
    const events = eventsFromPlanners.concat(eventsFromReviews);
    events.sort(
        (e1, e2) => new Date(e2.date).getTime() - new Date(e1.date).getTime()
    );
    return events;
};

const Planner = ({ record, basePath }) => {
    const translate = useTranslate();
    return record ? (
        <>
            <Typography variant="body2" gutterBottom>
                <Link to={`/planners/${record.id}`} component={RouterLink}>
                    {translate('resources.planners.name', {
                        smart_count: 1,
                    })}{' '}
                    #{record.reference}
                </Link>
            </Typography>
        </>
    ) : null;
};


const useReviewStyles = makeStyles({
    clamp: {
        display: '-webkit-box',
        '-webkit-line-clamp': 3,
        '-webkit-box-orient': 'vertical',
        overflow: 'hidden',
    },
});

const Review = ({ record, basePath }) => {
    const classes = useReviewStyles();
    const translate = useTranslate();
    return record ? (
        <>
            <Typography variant="body2" gutterBottom>
                <Link to={`/reviews/${record.id}`} component={RouterLink}>
                    {translate('resources.reviews.relative_to_poster')} "
                    <ReferenceField
                        source="recipe_id"
                        reference="recipes"
                        resource="reviews"
                        record={record}
                        basePath={basePath}
                        link={false}
                    >
                        <TextField source="reference" component="span" />
                    </ReferenceField>
                    "
                </Link>
            </Typography>
            <Typography variant="body2" color="textSecondary" gutterBottom>
                <StarRatingField record={record} />
            </Typography>
            <Typography
                variant="body2"
                color="textSecondary"
                className={classes.clamp}
            >
                {record.comment}
            </Typography>
        </>
    ) : null;
};

export default Aside;
