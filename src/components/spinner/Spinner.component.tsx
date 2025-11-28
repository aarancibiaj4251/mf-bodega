import React from 'react';
import {Spin} from "antd";

interface Props {
    size: 'large' | 'small';
}

const Spinner = ({size}: Props) => {
    return (
        <Spin size={size} />
    );
};

export default Spinner;
