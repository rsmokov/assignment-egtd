import { FC } from 'react';
import { Typography } from 'antd';

const { Paragraph } = Typography;

// NOTE: This component is in favor of showing posibility of recursive rendering of fields
// TODO: Fix Component Typings

export const FieldsRenderer: FC<any> = ({ obj }: any): any => {
  const primitivesMap = ['string', 'number', 'boolean'];

  return Object.keys(obj || {})?.map((key: keyof any) => {
    if (primitivesMap.includes(typeof obj[key])) {
      return (
        <Paragraph key={`field-${key.toString()}`} style={{ textTransform: 'capitalize' }}>
          <span>{key.toString()}</span>
          <span> : </span>
          <span>{obj[key].toString()}</span>
        </Paragraph>
      );
    } else {
      return (
        <div key={`field-${key.toString()}`} style={{ textTransform: 'capitalize' }}>
          <div>{key.toString()} :</div>
          <div style={{ background: 'white', padding: '2em' }}>
            <FieldsRenderer obj={obj[key]} />
          </div>
        </div>
      );
    }
  });
};
