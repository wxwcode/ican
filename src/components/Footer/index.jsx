import { DefaultFooter } from '@ant-design/pro-layout';
import { useIntl } from 'umi';
export default () => {
  const intl = useIntl();
  const defaultMessage = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'I Can客户电子管理系统',
  });
  const currentYear = new Date().getFullYear();
  return (
    <DefaultFooter
      copyright={`${currentYear} ${defaultMessage}`}
      links={[
        {
          key: 'github',
          title: <img src="/logo.png" width={20} />, //<GithubOutlined />,
          href: 'http://kdfcc.com',
          blankTarget: true,
        },
        {
          key: 'I Can客户电子管理系统',
          title: 'I Can客户电子管理系统',
          href: 'http://ican.kdfcc.com',
          blankTarget: true,
        },
      ]}
    />
  );
};
