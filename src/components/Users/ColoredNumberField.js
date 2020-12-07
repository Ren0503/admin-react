import * as React from 'react';
import { NumberField } from 'react-admin';

const ColoredNumberField = (props) =>
    props.record && props.source ? (
        props.record[props.source] > 500 ? (
            <span style={{ color: 'red' }}>
                <NumberField {...props} />
            </span>
        ) : (
            <NumberField {...props} />
        )
    ) : null;

ColoredNumberField.defaultProps = NumberField.defaultProps;

export default ColoredNumberField;
