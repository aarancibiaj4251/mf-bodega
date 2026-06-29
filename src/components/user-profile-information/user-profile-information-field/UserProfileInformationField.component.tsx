import React from 'react';
import {List, Typography} from 'antd';
const { Text, Paragraph } = Typography;

interface Props {
  userInfo: [string, string];
  setUserFields: React.Dispatch<React.SetStateAction<[string, string][]>>
  setActiveSave: React.Dispatch<React.SetStateAction<boolean>>;
  userFields: [string, string][];
}

const UserProfileInformationFieldComponent = ({userInfo, setUserFields, setActiveSave, userFields}: Props) => {
  const notAllowedEdit = ['id', 'username'];
  const [field, value] = userInfo;
  return (
    <List.Item key={field} className="flex-nowrap align-items-center" style={{padding: '10px 0'}}>
      <div>{field.toLocaleUpperCase()}:</div>
      {
        notAllowedEdit.includes(field) ?
          <Text>{value}</Text> :
          <Paragraph style={{marginBottom: 0}} editable={{
            autoSize: true,
            onChange: (valueChanged) => {
              const fieldIndex = userFields.findIndex(userField => userField[0] === field);
              setUserFields(prevState => {
                prevState[fieldIndex][1] = valueChanged;
                if (value !== valueChanged) {
                  setActiveSave(true);
                }
                return [...prevState];
              });
              return valueChanged;
            },
          }}>{value}</Paragraph>
      }
    </List.Item>
  );
};

export default UserProfileInformationFieldComponent;
