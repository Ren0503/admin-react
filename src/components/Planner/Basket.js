import * as React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Link, useTranslate, useQueryWithStore } from 'react-admin';


const useStyles = makeStyles({
    rightAlignedCell: { textAlign: 'right' },
});

const Basket = ({ record }) => {
    const classes = useStyles();
    const translate = useTranslate();

    const { loaded, data: recipes } = useQueryWithStore(
        {
            type: 'getMany',
            resource: 'recipes',
            payload: {
                ids: record ? record.basket.map(item => item.recipe_id) : [],
            },
        },
        {},
        state => {
            const recipeIds = record
                ? record.basket.map(item => item.recipe_id)
                : [];

            return recipeIds
                .map(
                    recipeId =>
                        state.admin.resources.recipes.data[
                            recipeId
                        ] 
                )
                .filter(r => typeof r !== 'undefined')
                .reduce((prev, next) => {
                    prev[next.id] = next;
                    return prev;
                }, {});
        }
    );

    if (!loaded || !record) return null;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        {translate(
                            'resources.commands.fields.basket.reference'
                        )}
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {translate(
                            'resources.commands.fields.basket.unit_price'
                        )}
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {translate('resources.commands.fields.basket.quantity')}
                    </TableCell>
                    <TableCell className={classes.rightAlignedCell}>
                        {translate('resources.commands.fields.basket.total')}
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {record.basket.map(
                    (item) =>
                        recipes[item.recipe_id] && (
                            <TableRow key={item.recipe_id}>
                                <TableCell>
                                    <Link to={`/recipes/${item.recipe_id}`}>
                                        {recipes[item.recipe_id].reference}
                                    </Link>
                                </TableCell>
                                <TableCell className={classes.rightAlignedCell}>
                                    {recipes[
                                        item.recipe_id
                                    ].price.toLocaleString(undefined, {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}
                                </TableCell>
                                <TableCell className={classes.rightAlignedCell}>
                                    {item.quantity}
                                </TableCell>
                                <TableCell className={classes.rightAlignedCell}>
                                    {(
                                        recipes[item.recipe_id].price *
                                        item.quantity
                                    ).toLocaleString(undefined, {
                                        style: 'currency',
                                        currency: 'USD',
                                    })}
                                </TableCell>
                            </TableRow>
                        )
                )}
            </TableBody>
        </Table>
    );
};

export default Basket;
