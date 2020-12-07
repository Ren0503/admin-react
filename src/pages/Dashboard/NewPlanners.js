import * as React from 'react';
import OrderIcon from '@material-ui/icons/AttachMoney';
import { useTranslate } from 'react-admin';

import CardWithIcon from './CardWithIcon';

const NewPlanners = ({ value }) => {
    const translate = useTranslate();
    return (
        <CardWithIcon
            to="/planners"
            icon={OrderIcon}
            title={translate('New Recipes')}
            subtitle={value}
        />
    );
};

export default NewPlanners;
