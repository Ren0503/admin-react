import * as React from 'react';
import { FunctionField } from 'react-admin';

const render = (record) => record && record.basket.length;

const NbItemsField = ({ record }) => (
    <FunctionField record={record} render={render} />
);

NbItemsField.defaultProps = {
    label: 'resources.commands.fields.nb_items',
    textAlign: 'right',
};

export default NbItemsField;
