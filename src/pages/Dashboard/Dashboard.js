import React, {
    useState,
    useEffect,
    useCallback,
} from 'react';
import { useVersion, useDataProvider } from 'react-admin';
import { useMediaQuery } from '@material-ui/core';
import { subDays } from 'date-fns';

import Welcome from './Welcome';
import NewPlanners from './NewPlanners';
import NewRecipes from './NbNewRecipes';
import PendingReviews from './PendingReviews';
import PendingPlanners from './PendingPlanners';
import NewUser from './NewUser';
import ViewsChart from './ViewsChart';

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

const Dashboard = () => {
    const [state, setState] = useState({});
    const version = useVersion();
    const dataProvider = useDataProvider();
    const isXSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('xs')
    );
    const isSmall = useMediaQuery((theme) =>
        theme.breakpoints.down('md')
    );

    const fetchRecipes = useCallback(async () => {
        const { data: recipes } = await dataProvider.getList(
            'recipes',
            {
                filter: { status: 'accepted' },
                sort: { field: 'published_at', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            }
        );
        const nbPendingRecipes = recipes.reduce(nb => ++nb, 0);
        const pendingRecipes = recipes.slice(0, Math.min(10, recipes.length));
        setState(state => ({ ...state, pendingRecipes, nbPendingRecipes }));
        const { data: users } = await dataProvider.getMany(
            'users',
            {
                ids: pendingRecipes.map(recipe => recipe.user_id),
            }
        );
        setState(state => ({
            ...state,
            pendingRecipeUsers: users.reduce(
                (prev, user) => {
                    prev[user.id] = user; // eslint-disable-line no-param-reassign
                    return prev;
                },
                {}
            ),
        }));
    }, [dataProvider]);

    const fetchReviews = useCallback(async () => {
        const { data: reviews } = await dataProvider.getList(
            'reviews',
            {
                filter: { status: 'pending' },
                sort: { field: 'created_at', order: 'DESC' },
                pagination: { page: 1, perPage: 100 },
            }
        );
        const nbPendingReviews = reviews.reduce(nb => ++nb, 0);
        const pendingReviews = reviews.slice(0, Math.min(10, reviews.length));
        setState(state => ({ ...state, pendingReviews, nbPendingReviews }));
        const { data: users } = await dataProvider.getMany(
            'users',
            {
                ids: pendingReviews.map(review => review.user_id),
            }
        );
        setState(state => ({
            ...state,
            pendingReviewsUsers: users.reduce(
                (prev, user) => {
                    prev[user.id] = user; // eslint-disable-line no-param-reassign
                    return prev;
                },
                {}
            ),
        }));
    }, [dataProvider]);

    const fetchPlanner = useCallback(async () => {
        const aMonthAgo = subDays(new Date(), 30);
        const { data: recentPlanners } = await dataProvider.getList(
            'planners',
            {
                filter: { date: aMonthAgo.toISOString() },
                sort: { field: 'date', order: 'DESC' },
                pagination: { page: 1, perPage: 5 },
            }
        );
        const aggregations = recentPlanners
            .filter(planner => planner.status !== 'cancelled')
            .reduce(
                (stats, planner) => {
                    if (planner.status !== 'cancelled') {
                        stats.nbNewPlanners++;
                    }
                    if (planner.status === 'completed') {
                        stats.pendingPlanners.push(planner);
                    }
                    return stats;
                },
                {
                    nbNewPlanners: 0,
                    pendingPlanners: [],
                }
            );
        setState(state => ({
            ...state,
            recentPlanners,
            nbNewPlanners: aggregations.nbNewPlanners,
            pendingPlanners: aggregations.pendingPlanners,
        }));
        
        const { data: users } = await dataProvider.getMany(
            'users',
            {
                ids: aggregations.pendingPlanners.map(
                    (planner) => planner.user_id
                ),
            }
        );
        setState(state => ({
            ...state,
            pendingPlannersUsers: users.reduce(
                (prev, user) => {
                    prev[user.id] = user; // eslint-disable-line no-param-reassign
                    return prev;
                },
                {}
            ),
        }));
    }, [dataProvider]);

    useEffect(() => {
        fetchRecipes();
        fetchReviews();
        fetchPlanner();
    }, [version]); // eslint-disable-line react-hooks/exhaustive-deps

    const {
        nbNewRecipes,
        nbPendingReviews,
        nbNewPlanners,
        pendingRecipes,
        pendingRecipesUsers,
        pendingPlanners,
        pendingReviews,
        pendingReviewsUsers,
        pendingPlannerUsers,
        recentPosts,
        recentPlanners,
    } = state;
    return isXSmall ? (
        <div>
            <div style={styles.flexColumn}>
                <Welcome />
                <NewRecipes value={nbNewRecipes} />
                <VerticalSpacer />
                <NewPlanners value={nbNewPlanners} />
                <VerticalSpacer />
                <PendingPlanners
                    planners={pendingPlanners}
                    users={pendingPlannerUsers}
                />
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn}>
            <div style={styles.singleCol}>
                <Welcome />
            </div>
            <div style={styles.flex}>
                <NewRecipes value={nbNewRecipes} />
                <Spacer />
                <NewPlanners value={nbNewPlanners} />
            </div>
            <div style={styles.singleCol}>
                <ViewsChart orders={recentPosts} />
            </div>
            <div style={styles.singleCol}>
                <PendingPlanners
                    planners={pendingPlanners}
                    users={pendingPlannerUsers}
                />
            </div>
        </div>
    ) : (
        <>
            <Welcome />
            <div style={styles.flex}>
                <div style={styles.leftCol}>
                    <div style={styles.flex}>
                        <NewRecipes value={nbNewRecipes} />
                        <Spacer />
                        <NewPlanners value={nbNewPlanners} />
                    </div>
                    <div style={styles.singleCol}>
                        <ViewsChart orders={recentPosts} />
                    </div>
                    <div style={styles.singleCol}>
                        <PendingPlanners
                            planners={pendingPlanners}
                            users={pendingPlannerUsers}
                        />
                    </div>
                </div>
                <div style={styles.rightCol}>
                    <div style={styles.flex}>
                        <PendingReviews
                            nb={nbPendingReviews}
                            reviews={pendingReviews}
                            customers={pendingReviewsUsers}
                        />
                        <Spacer />
                        <NewUser />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
