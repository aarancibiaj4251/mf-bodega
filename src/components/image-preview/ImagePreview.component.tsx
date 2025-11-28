import React, {useState} from 'react';
import {Image} from 'antd';
import './ImagePreview.component.scss';

interface Props {
  src: string;
}

const ImagePreview = ({src}: Props) => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className="image-preview flex-no-wrap justify-content-center">
        <Image
          preview={{ visible: false }}
          width={200}
          src={src}
          onClick={() => setVisible(true)}
        />
      </div>
      <div style={{ display: 'none' }}>
        <Image.PreviewGroup preview={{ visible, onVisibleChange: vis => setVisible(vis) }}>
          <Image src={src} />
        </Image.PreviewGroup>
      </div>
    </>
  );
};

export default ImagePreview;
