import * as React from 'react';
import {  Fragment, useCallback, useEffect, useState } from 'react';
import {
    AutocompleteInput,
    Datagrid,
    DateField,
    DateInput,
    Filter,
    List,
    ListContextProvider,
    ReferenceInput,
    SearchInput,
    useGetList,
    useListContext,
    TextInput,
} from 'react-admin';
import { useMediaQuery, Divider, Tabs, Tab } from '@material-ui/core';

//import { makeStyles } from '@material-ui/core/styles';

import UserReferenceField from '../Users/UserReferenceField';
import MobileGrid from '../../components/Planner/MobileGrid';
import RecipeReferenceField from '../Recipes/RecipeReferenceField';

const PlannerFilter = props => (
    <Filter {...props}>
        <SearchInput source="q" alwaysOn />
        <ReferenceInput source="user_id" reference="users">
            <AutocompleteInput
                optionText={(choice) =>
                    choice.id // the empty choice is { id: '' }
                        ? `${choice.username}`
                        : ''
                }
            />
        </ReferenceInput>
        <ReferenceInput source="recipe_id" reference="recipes">
            <AutocompleteInput
                optionText={(choice) =>
                    choice.id // the empty choice is { id: '' }
                        ? `${choice.title}`
                        : ''
                }
            />
        </ReferenceInput>
        <DateInput source="date" />
        <DateInput source="created_at" />
    </Filter>
);

const tabs = [
    { id: 'pending', name: 'pending' },
    { id: 'completed', name: 'completed' },
    { id: 'cancelled', name: 'cancelled' },
];


const useGetTotals = (filterValues) => {
    const { total: totalPending } = useGetList(
        'planners',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'pending' }
    );
    const { total: totalCompleted } = useGetList(
        'planners',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'completed' }
    );
    const { total: totalCancelled } = useGetList(
        'planners',
        { perPage: 1, page: 1 },
        { field: 'id', order: 'ASC' },
        { ...filterValues, status: 'cancelled' }
    );

    return {
        pending: totalPending,
        completed: totalCompleted,
        cancelled: totalCancelled,
    };
};

const TabbedDatagrid = props => {
    const listContext = useListContext();
    const { ids, filterValues, setFilters, displayedFilters } = listContext;
    const isXSmall = useMediaQuery(theme =>
        theme.breakpoints.down('xs')
    );
    const [pending, setPending] = useState([]);
    const [completed, setCompleted] = useState([]);
    const [cancelled, setCancelled] = useState([]);
    const totals = useGetTotals(filterValues);

    useEffect(() => {
        if (ids && ids !== filterValues.status) {
            switch (filterValues.status) {
                case 'pending':
                    setPending(ids);
                    break;
                case 'completed':
                    setCompleted(ids);
                    break;
                case 'cancelled':
                    setCancelled(ids);
                    break;
            }
        }
    }, [ids, filterValues.status]);

    const handleChange = useCallback(
        (event, value) => {
            setFilters &&
                setFilters(
                    { ...filterValues, status: value },
                    displayedFilters
                );
        },
        [displayedFilters, filterValues, setFilters]
    );

    const selectedIds =
        filterValues.status === 'pending'
            ? pending
            : filterValues.status === 'completed'
            ? completed
            : cancelled;

    return (
        <Fragment>
            <Tabs
                variant="fullWidth"
                centered
                indicatorColor="primary"
                onChange={handleChange}
            >
                {tabs.map(choice => (
                    <Tab
                        key={choice.id}
                        label={
                            totals[choice.name]
                                ? `${choice.name} (${totals[choice.name]})`
                                : choice.name
                        }
                        value={choice.id}
                    />
                ))}
            </Tabs>
            <Divider />
            {isXSmall ? (
                <ListContextProvider
                    value={{ ...listContext, ids: selectedIds }}
                >
                    <MobileGrid {...props} ids={selectedIds} />
                </ListContextProvider>
            ) : (
                <div>
                    {filterValues.status === 'pending' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: pending }}
                        >
                            <Datagrid {...props} optimized rowClick="edit">
                                <DateField source="created_at" showTime />
                                <UserReferenceField />
                                <RecipeReferenceField />
                                <DateField source="date" showTime />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.status === 'completed' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: completed }}
                        >
                            <Datagrid {...props} rowClick="edit">
                                <DateField source="created_at" showTime />
                                <UserReferenceField />
                                <RecipeReferenceField />
                                <DateField source="date" showTime />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                    {filterValues.status === 'cancelled' && (
                        <ListContextProvider
                            value={{ ...listContext, ids: cancelled }}
                        >
                            <Datagrid {...props} rowClick="edit">
                                <DateField source="created_at" showTime />
                                <UserReferenceField />
                                <RecipeReferenceField />
                                <DateField source="date" showTime />
                            </Datagrid>
                        </ListContextProvider>
                    )}
                </div>
            )}
        </Fragment>
    );
};

const PlannerList = props => (
    <List
        {...props}
        filterDefaultValues={{ status: 'pending' }}
        sort={{ field: 'date', order : 'DESC' }}
        perPage={10}
        filters={<PlannerFilter />}
    >
        <TabbedDatagrid />
    </List>
);

export default PlannerList;
