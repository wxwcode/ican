import React, { useState, useRef, useEffect } from 'react';
import { history, useLocation } from 'umi';
import { PageContainer } from '@ant-design/pro-layout';
import { UploadOutlined, LeftOutlined } from '@ant-design/icons';
import { Button, Input, Upload, message } from 'antd';
import ProForm, {
  ProFormFieldSet,
  ProFormSelect,
  ProFormText,
  ProFormRadio,
  ProFormTextArea,
  ProFormDigit,
  ProFormDatePicker,
  ProFormUploadButton,
} from '@ant-design/pro-form';
import { EditableProTable } from '@ant-design/pro-table';
import { useRequest } from 'umi';
import { createCustomer, getCustomerById, updateCustomer } from '../service';
import {
  genderList,
  evaluationLevelList,
  studentSourceList,
  customerStatusList,
  guardianRelationList,
  servicePlaceList,
} from '@/utils/config';
import styles from './index.less';
import dayjs from 'dayjs';

const validatorAddress = (rule, value, callback) => {
  if (value.length !== 4) {
    callback('请输入完整地址');
  }

  callback();
};

const columns = [
  {
    title: '就读时间',
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
  const formRef = useRef();
  const location = useLocation();
  const { data: currentCustomer, loading } = useRequest(() => {
    const { userId } = location.query;
    if (userId) {
      return getCustomerById({ id: userId });
    } else {
      return Promise.resolve({});
    }
  });
  const initInfo = () => {
    if (currentCustomer && currentCustomer.familyInfoBo) {
      const { linkProvinceName, linkCityName, linkCountyName, linkAddrName } =
        currentCustomer.familyInfoBo;
      if (linkProvinceName && linkCityName && linkCountyName) {
        currentCustomer.familyInfoBo.address = [
          linkProvinceName,
          linkCityName,
          linkCountyName,
          linkAddrName,
        ];
      }
    }
    return currentCustomer;
  };
  const [editableKeys, setEditableRowKeys] = useState([5]);
  const [avatar, setAvatar] = useState('');
  const changeLevel = (v) => {
    const keyMap = {
      L1: '否',
      L2: '否',
      L3: '否',
      L4: '否',
      L5: '是',
      L6: '是',
    };
    const s = keyMap[v] || '';
    formRef.current.setFieldsValue({
      // isLiabilityInsurance: s,
      baseInfoBo: {
        isLiabilityInsurance: s,
      },
    });
  };
  const avatarChange = (info) => {
    if (info.file.status === 'done') {
      const { downloadLocation } = info.file.response.data;
      setAvatar(downloadLocation);
    }
  };
  const handleFinish = async (v) => {
    if (v.educationBoList) {
      v.educationBoList.forEach((item) => {
        item.attendSchoolStartDate = new Date(item.attendSchoolStartDate).getTime();
      });
    }
    const { linkProvinceName, linkCityName, linkCountyName, linkAddrName } = v;
    const sendData = {
      userId: '1',
      ...v,
      avatar,
      questionnaireFile: null,
      baseInfoBo: {
        ...v.baseInfoBo,
        name: v.name,
      },
      familyInfoBo: {
        ...v.familyInfoBo,
        linkProvinceName,
        linkCityName,
        linkCountyName,
        linkAddrName,
      },
    };
    if (v.questionnaireFile && v.questionnaireFile[0]) {
      sendData.baseInfoBo.questionnaireFile = v.questionnaireFile[0].response.data;
    }
    const { userId } = location.query;
    if (userId) {
      sendData.studentId = userId;
      sendData.baseInfoBo.studentId = userId;
    }
    const requestApi = userId ? updateCustomer : createCustomer;
    const { status } = await requestApi(sendData);
    if (status === 0) {
      message.success('成功！');
      history.goBack();
    }
  };

  return (
    <PageContainer waterMarkProps={{ gapX: 320, gapY: 320 }}>
      <div
        className={styles.back}
        onClick={() => {
          history.goBack();
        }}
      >
        <LeftOutlined />
        返回
      </div>
      <div className={styles.baseView}>
        {loading ? null : (
          <>
            <div className={styles.left}>
              <ProForm
                formRef={formRef}
                layout="horizontal"
                grid={true}
                rowProps={{
                  gutter: 26,
                }}
                onFinish={handleFinish}
                initialValues={{ ...initInfo() }} // phone: currentCustomer?.phone.split('-')
              >
                <ProForm.Group title="" size={24}>
                  <h3 className={styles.title}>基本信息</h3>
                </ProForm.Group>
                <ProFormText
                  width="md"
                  required
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
                  name={['baseInfoBo', 'petName']}
                  label="小名"
                />
                <ProFormRadio.Group
                  colProps={{ md: 12, xl: 8 }}
                  name={['baseInfoBo', 'gender']}
                  label="性别"
                  options={genderList}
                />
                <ProFormDatePicker
                  width="md"
                  required
                  colProps={{ md: 12, xl: 8 }}
                  name="birthDate"
                  transform={(v) => ({ birthDate: new Date(v).getTime() })}
                  placeholder="年-月-日"
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
                  name={['baseInfoBo', 'height']}
                  required
                  placeholder="单位：厘米（cm）"
                  label="身高"
                  rules={[
                    {
                      required: true,
                      message: '请输入身高（厘米）',
                    },
                  ]}
                />
                <ProFormText
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name={['baseInfoBo', 'weight']}
                  required
                  placeholder="单位：千克（kg）"
                  label="体重"
                  rules={[
                    {
                      required: true,
                      message: '请输入体重',
                    },
                  ]}
                />
                <ProFormSelect
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name="customerStatus"
                  required
                  label="客户状态"
                  rules={[
                    {
                      required: true,
                      message: '请选择客户状态',
                    },
                  ]}
                  options={customerStatusList}
                />
                <ProFormSelect
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  onChange={changeLevel}
                  name={['baseInfoBo', 'evaluationLevel']}
                  required
                  label="评估等级"
                  rules={[
                    {
                      required: true,
                      message: '请选择评估等级',
                    },
                  ]}
                  options={evaluationLevelList}
                />
                <ProFormText
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name={['baseInfoBo', 'clinicalDiagnosis']}
                  required
                  label="临床诊断"
                  rules={[
                    {
                      required: true,
                      message: '请输入临床诊断',
                    },
                  ]}
                />
                <ProFormSelect
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name="servicePlace"
                  required
                  label="服务中心"
                  rules={[
                    {
                      required: true,
                      message: '请选择服务中心',
                    },
                  ]}
                  options={servicePlaceList}
                />
                <ProFormText
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name={['baseInfoBo', 'serviceTeacher']}
                  label="服务老师"
                />
                <ProFormText
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name={['baseInfoBo', 'assessmentTeacher']}
                  label="评估督导"
                />
                <ProFormSelect
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name={['baseInfoBo', 'workClotheSize']}
                  label="工服尺码"
                  options={['S', 'M', 'L', 'XL', 'XXL']}
                />
                <ProFormText
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name="customerManager"
                  label="客户经理"
                />
                <ProFormSelect
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name={['baseInfoBo', 'studentSource']}
                  required
                  label="招生来源" // 家长转介，机构转介，直访到家，美团大众
                  rules={[
                    {
                      required: true,
                      message: '请选择招生来源',
                    },
                  ]}
                  options={studentSourceList}
                />
                <ProFormText
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name={['baseInfoBo', 'recommend']}
                  label="推荐人"
                />
                <ProFormText
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  disabled
                  name={['baseInfoBo', 'isLiabilityInsurance']}
                  label="雇主责任险"
                />
                <ProFormDigit
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name="totalClassHours"
                  label="总课时"
                  fieldProps={{ precision: 0 }}
                />
                <ProFormDigit
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name="availableClassHours"
                  label="剩余课时"
                  fieldProps={{ precision: 0 }}
                />
                <ProForm.Group title="" size={24}>
                  <h3 className={styles.title}>家庭情况</h3>
                </ProForm.Group>
                <ProFormText
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name={['familyInfoBo', 'linkName']}
                  label="联系人"
                  required
                  rules={[
                    {
                      required: true,
                      message: '请输入联系人姓名',
                    },
                  ]}
                />
                <ProFormText
                  width="md"
                  name={['familyInfoBo', 'lineFixed']}
                  colProps={{ md: 12, xl: 12 }}
                  label="固定电话"
                />
                <ProFormText
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name={['familyInfoBo', 'linePhone']}
                  label="手机号"
                  required
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
                  name={['familyInfoBo', 'weChat']}
                  label="微信号"
                />
                <ProForm.Group>
                  <ProFormText
                    width="md"
                    colProps={{ md: 12, xl: 8 }}
                    name={['familyInfoBo', 'guardianName']}
                    label="监护人"
                    required
                    rules={[
                      {
                        required: true,
                        message: '请输入监护人姓名',
                      },
                    ]}
                  />
                  <ProFormSelect
                    width="md"
                    colProps={{ md: 12, xl: 8 }}
                    name={['familyInfoBo', 'guardianRelation']}
                    label="监护人关系"
                    required
                    rules={[
                      {
                        required: true,
                        message: '请输入学生与监护人关系',
                      },
                    ]}
                    options={guardianRelationList}
                  />
                  <ProFormText
                    width="md"
                    colProps={{ md: 12, xl: 8 }}
                    name={['familyInfoBo', 'guardianPhone']}
                    label="监护人手机号"
                    required
                    rules={[
                      {
                        required: true,
                        message: '请输入监护人手机号',
                      },
                    ]}
                  />
                </ProForm.Group>
                <ProFormText
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name={['familyInfoBo', 'familyMemberName']}
                  label="家庭成员1姓名"
                />
                <ProFormText
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name={['familyInfoBo', 'familyMemberAge']}
                  label="家庭成员1年龄"
                />
                <ProFormSelect
                  width="md"
                  colProps={{ md: 12, xl: 8 }}
                  name={['familyInfoBo', 'familyMemberRelation']}
                  label="家庭成员1关系"
                  placeholder="家庭成员1与监护人关系"
                  options={guardianRelationList}
                />
                <ProFormFieldSet
                  name={['familyInfoBo', 'address']}
                  colProps={{ span: 24 }}
                  label="联系地址"
                  required
                  type="group"
                  transform={(value) => ({
                    linkProvinceName: value[0],
                    linkCityName: value[1],
                    linkCountyName: value[2],
                    linkAddrName: value[3],
                  })}
                  rules={[
                    {
                      required: true,
                      message: '请输入完整的联系地址',
                    },
                    {
                      validator: validatorAddress,
                    },
                  ]}
                >
                  <Input className={styles.phone_number} suffix="省" />
                  <Input className={styles.phone_number} suffix="市" />
                  <Input className={styles.phone_number} suffix="区" />
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
                      newRecordType: 'dataSource',
                      position: 'top',
                      record: () => ({
                        id: Date.now(),
                        attendSchoolStartDate: null,
                        studyYear: null,
                        mechanism: null,
                      }),
                    }}
                    editable={{
                      type: 'multiple',
                      editableKeys,
                      onChange: setEditableRowKeys,
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
                  name="questionnaireFile"
                  label=""
                  max={1}
                  accept=".doc,.docx,.pdf"
                  fieldProps={{
                    name: 'file',
                    listType: 'picture-card',
                  }}
                  defaultFileList={[]}
                  action="/api/attachment/upload"
                  extra="请上传5M以内的word/pdf文档"
                />
                <ProForm.Group title="" size={24}>
                  <h3 className={styles.title}>备注信息</h3>
                </ProForm.Group>
                <ProFormTextArea name={['baseInfoBo', 'remark']} label="" placeholder="说明信息" />
              </ProForm>
            </div>
            <div className={styles.right}>
              <div className={styles.avatar_title}>头像</div>
              <div className={styles.avatar}>
                <img src={avatar || '/logo.png'} alt="avatar" />
              </div>
              <Upload
                accept="image/*"
                action="/api/attachment/upload"
                onChange={avatarChange}
                showUploadList={false}
              >
                <div className={styles.button_view}>
                  <Button>
                    <UploadOutlined />
                    更换头像
                  </Button>
                </div>
              </Upload>
            </div>
          </>
        )}
      </div>
    </PageContainer>
  );
};

export default BaseView;
