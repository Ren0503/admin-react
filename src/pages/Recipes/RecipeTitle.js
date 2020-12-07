import * as React from 'react';
import { useTranslate } from 'react-admin';

export default ({ record }) => {
    const translate = useTranslate();
    return (
        <span>
            {record
                ? translate('recipe.edit.title', { title: record.title })
                : ''}
        </span>
    );
};
