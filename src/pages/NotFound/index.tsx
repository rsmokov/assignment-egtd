import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Image, Typography } from 'antd';
import notFound from '@/assets/404.png';

const { Title } = Typography;

export const NotFound: FC = () => {
  const navigate = useNavigate();

  return (
    <article style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Image alt="sleeping cat" width={`50%`} src={notFound} preview={false} />
      <Title>Ooops!</Title>
      <Title level={3}>The page you are looking for does not exist ...</Title>
      <Button style={{ width: '10em' }} type="primary" onClick={() => navigate(-1)}>
        GO BACK
      </Button>
    </article>
  );
};

export default NotFound;
