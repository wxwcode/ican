import React from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message } from 'antd';
import ProForm, {
  ProFormDependency,
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { EditableProTable } from '@ant-design/pro-table';
import { useRequest } from 'umi';
import { queryCurrent, queryProvince, queryCity } from '@/pages/account/settings/service';
import styles from './index.less';

const validatorPhone = (rule, value, callback) => {
  if (!value[0]) {
    callback('请输入区号');
  }

  if (!value[1]) {
    callback('请输入电话号');
  }

  callback();
}; // 头像组件 方便以后独立，增加裁剪之类的功能

const AvatarView = ({ avatar }) => (
  <>
    <div className={styles.avatar_title}>头像</div>
    <div className={styles.avatar}>
      <img src={avatar} alt="avatar" />
    </div>
    <Upload showUploadList={false}>
      <div className={styles.button_view}>
        <Button>
          <UploadOutlined />
          更换头像
        </Button>
      </div>
    </Upload>
  </>
);

const columns = [
  {
    title: '就读时间',
    key: 'showTime',
    valueType: 'date',
    dataIndex: 'attendSchoolStartDate',
  },
  {
    title: '就读学校/机构',
    dataIndex: 'mechanism',
  },
  {
    title: '就读时长（年）',
    dataIndex: 'studyYear',
    with: 200,
  },
  {
    title: '操作',
    valueType: 'option',
  },
];

const BaseView = () => {
  const { data: currentUser, loading } = useRequest(() => {
    return queryCurrent();
  });

  const getAvatarURL = () => {
    if (currentUser) {
      if (currentUser.avatar) {
        return currentUser.avatar;
      }

      const url = 'https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png';
      return url;
    }

    return '';
  };

  const handleFinish = async (v) => {
    console.log(v);
    message.success('更新基本信息成功');
  };

  return (
    <div className={styles.baseView}>
      {loading ? null : (
        <>
          <div className={styles.left}>
            <ProForm
              layout="horizontal"
              grid={true}
              onFinish={handleFinish}
              submitter={{
                resetButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
                submitButtonProps: {
                  children: '更新基本信息',
                },
              }}
              initialValues={{ ...currentUser, phone: currentUser?.phone.split('-') }}
              hideRequiredMark
            >
              <ProForm.Group title="" size={24}>
                <h3 className={styles.title}>基本信息</h3>
              </ProForm.Group>
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="name"
                label="姓名"
                rules={[
                  {
                    required: true,
                    message: '请输入姓名',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="gender" // 0 男 1女
                label="性别"
                rules={[
                  {
                    required: true,
                    message: '请选择性别',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="birthDate"
                label="出生日期"
                rules={[
                  {
                    required: true,
                    message: '请输入出生日期',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="height"
                label="身高"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="weight"
                label="体重"
                rules={[
                  {
                    required: true,
                    message: '请输入体重',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="customerStatus"
                label="客户状态" // : 1 观摩, 2 测评, 3 体验, 4 实习1, 5 实习2, 6 就业, 7 结课
                rules={[
                  {
                    required: true,
                    message: '请选择客户状态',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="evaluationLevel"
                label="评估等级" // :L1-工作体验,L2-工作体验,L3-工作体验,L4-工作体验,L5-实习生,L6-员工
                rules={[
                  {
                    required: true,
                    message: '请选择评估等级',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="clinicalDiagnosis"
                label="临床诊断"
                rules={[
                  {
                    required: true,
                    message: '请输入临床诊断',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="serviceTeacher"
                label="服务老师"
                rules={[
                  {
                    required: true,
                    message: '请输入服务老师',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="assessmentTeacher"
                label="评估督导"
                rules={[
                  {
                    required: true,
                    message: '请输入评估督导',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="customerManager"
                label="客户经理"
                rules={[
                  {
                    required: true,
                    message: '请输入客户经理',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="studentSource"
                label="招生来源" // 家长转介，机构转介，直访到家，美团大众
                rules={[
                  {
                    required: true,
                    message: '请选择招生来源',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="recommend"
                label="推荐人"
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="isLiabilityInsurance"
                label="雇主责任险"
                rules={[
                  {
                    required: true,
                    message: '请输入雇主责任险',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="totalClassHours"
                label="总课时"
                rules={[
                  {
                    required: true,
                    message: '请输入总课时',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="availableClassHours"
                label="剩余课时"
                rules={[
                  {
                    required: true,
                    message: '请输入剩余课时',
                  },
                ]}
              />
              <ProForm.Group title="" size={24}>
                <h3 className={styles.title}>家庭情况</h3>
              </ProForm.Group>
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="linkName"
                label="联系人"
                rules={[
                  {
                    required: true,
                    message: '请输入联系人姓名',
                  },
                ]}
              />
              <ProFormFieldSet
                name="lineFixed"
                colProps={{ md: 12, xl: 12 }}
                label="固定电话"
                rules={[
                  {
                    required: true,
                    message: '请输入固定电话',
                  },
                  {
                    validator: validatorPhone,
                  },
                ]}
              >
                <Input className={styles.area_code} />
                <Input className={styles.phone_number} />
              </ProFormFieldSet>
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="linePhone"
                label="手机号"
                rules={[
                  {
                    required: true,
                    message: '请输入您的昵称!',
                  },
                ]}
              />
              <ProFormText width="md" colProps={{ md: 12, xl: 8 }} name="weChat" label="微信号" />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="guardianName"
                label="监护人"
                rules={[
                  {
                    required: true,
                    message: '请输入监护人姓名',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="guardianRelation"
                label="监护人关系"
                rules={[
                  {
                    required: true,
                    message: '请输入学生与监护人关系',
                  },
                ]}
              />
              <ProFormText
                width="md"
                colProps={{ md: 12, xl: 8 }}
                name="guardianPhone"
                label="监护人手机号"
                rules={[
                  {
                    required: true,
                    message: '请输入监护人手机号',
                  },
                ]}
              />
              <ProFormFieldSet
                name="address"
                colProps={{ span: 24 }}
                label="联系地址"
                rules={[
                  {
                    required: true,
                    message: '请输入您的联系电话!',
                  },
                  {
                    validator: validatorPhone,
                  },
                ]}
              >
                <Input className={styles.phone_number} />省
                <Input className={styles.phone_number} />市
                <Input className={styles.phone_number} />区
                <Input className={styles.phone_number} />
              </ProFormFieldSet>
              <ProForm.Group title="" size={24}>
                <h3 className={styles.title}>教育情况</h3>
              </ProForm.Group>
              <ProForm.Item label="" name="educationBoList" trigger="onValuesChange">
                <EditableProTable
                  rowKey="id"
                  toolBarRender={false}
                  columns={columns}
                  recordCreatorProps={{
                    newRecordType: 'educationBoList',
                    position: 'top',
                    record: () => ({
                      id: Date.now(),
                    }),
                  }}
                  editable={{
                    type: 'multiple',
                    actionRender: (row, _, dom) => {
                      return [dom.delete];
                    },
                  }}
                />
              </ProForm.Item>
              <ProForm.Group title="" size={24}>
                <h3 className={styles.title}>家庭与生活调查表</h3>
              </ProForm.Group>
              <ProFormUploadButton
                name="upload"
                label=""
                max={2}
                fieldProps={{
                  name: 'file',
                  listType: 'picture-card',
                }}
                action="/upload.do"
                extra="请上传5M以内的word/pdf文档"
              />
              <ProForm.Group title="" size={24}>
                <h3 className={styles.title}>备注信息</h3>
              </ProForm.Group>
              <ProFormTextArea name="remark" label="" placeholder="说明信息" />
              {/* <ProFormSelect
                width="sm"
                name="country"
                label="国家/地区"
                rules={[
                  {
                    required: true,
                    message: '请输入您的国家或地区!',
                  },
                ]}
                options={[
                  {
                    label: '中国',
                    value: 'China',
                  },
                ]}
              /> */}

              {/* <ProForm.Group title="所在省市" size={8} >
                <ProFormSelect
                  rules={[
                    {
                      required: true,
                      message: '请输入您的所在省!',
                    },
                  ]}
                  width="sm"
                  fieldProps={{
                    labelInValue: true,
                  }}
                  name="province"
                  className={styles.item}
                  request={async () => {
                    return queryProvince().then(({ data }) => {
                      return data.map((item) => {
                        return {
                          label: item.name,
                          value: item.id,
                        };
                      });
                    });
                  }}
                />
                <ProFormDependency name={['province']}>
                  {({ province }) => {
                    return (
                      <ProFormSelect
                        params={{
                          key: province?.value,
                        }}
                        name="city"
                        width="sm"
                        rules={[
                          {
                            required: true,
                            message: '请输入您的所在城市!',
                          },
                        ]}
                        disabled={!province}
                        className={styles.item}
                        request={async () => {
                          if (!province?.key) {
                            return [];
                          }

                          return queryCity(province.key || '').then(({ data }) => {
                            return data.map((item) => {
                              return {
                                label: item.name,
                                value: item.id,
                              };
                            });
                          });
                        }}
                      />
                    );
                  }}
                </ProFormDependency>
              </ProForm.Group>
              <ProFormText
                width="md"
                name="address"
                label="街道地址"
                rules={[
                  {
                    required: true,
                    message: '请输入您的街道地址!',
                  },
                ]}
              /> */}
            </ProForm>
          </div>
          <div className={styles.right}>
            <AvatarView avatar={getAvatarURL()} />
          </div>
        </>
      )}
    </div>
  );
};

export default BaseView;
