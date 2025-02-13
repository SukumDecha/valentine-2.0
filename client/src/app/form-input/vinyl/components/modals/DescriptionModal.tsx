import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import { Typography, Input } from 'antd';

import { useVinylFormStore } from '@/stores/vinyl-form.store';

const DescriptionModal = () => {
  const [inputTitle, setInputTitle] = useState('');
  const [inputDescription, setInputDescription] = useState('');

  const setForm = useVinylFormStore((state) => state.setForm);

  useEffect(() => {
    setForm('description', { title: inputTitle, description: inputDescription });

  }, [inputTitle, inputDescription]);


  return (
    <div className="flex flex-col gap-4">
      <Typography.Text strong>หัวข้อ</Typography.Text>
      <Input
        value={inputTitle}
        onChange={(e) => setInputTitle(e.target.value)}
        placeholder="Dear Alice my love..."
      />

      <Typography.Text strong>คำอธิบาย</Typography.Text>
      <Input.TextArea
        value={inputDescription}
        onChange={(e) => setInputDescription(e.target.value)}
        placeholder="I love you so much..."
        rows={4}
      />
    </div>
  );
};

export default DescriptionModal;