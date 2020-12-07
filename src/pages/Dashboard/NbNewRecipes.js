import * as React from 'react';
import BookIcon from '@material-ui/icons/Book';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

const NbNewRecipes = ({ value }) => {
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/commands"
            icon={BookIcon}
            title={translate('New Recipes')}
            subtitle={value}
        />
    );
};

export default NbNewRecipes;
