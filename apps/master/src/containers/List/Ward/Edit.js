import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { intl } from '@shared/lib/core/Localization/IntlGlobalProvider';
import { Row, Col, Form, Input, InputNumber, Button, Checkbox, Radio, Select, Spin, Space } from 'antd';
import LocalizedEditor, { LocalizedItemWrapper } from '@shared/ui/Localization/LocalizedEditor';
import selectHelper from '@shared/lib/helpers/ui/selectHelper';
import formHelper from '@shared/lib/helpers/formHelper';
import actions from '../../../redux/list/ward/actions';

const { TextArea } = Input;
const { Option } = Select;

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const tailLayout = {
  wrapperCol: { offset: 18, span: 6 },
};

export class Edit extends React.Component {
  frmRef = this.props.frmRef;

  constructor(props) {
    super(props);
    this.handleCountryChange = this.handleCountryChange.bind(this);
    this.handleStateProvinceChange = this.handleStateProvinceChange.bind(this);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return formHelper.def.shouldComponentUpdate(this.props, nextProps, nextState);
  }

  handleCountryChange = (value) => {
    this.props.editCountryChange(value);
    this.frmRef.current.setFieldsValue({
      StateProvinceId: undefined,
      DistrictId: undefined,
    });
  };

  handleStateProvinceChange = (value) => {
    this.props.editStateProvinceChange(value);
    this.frmRef.current.setFieldsValue({
      DistrictId: undefined,
    });
  };
  render() {
    let m = this.props.model;
    if (!m) return null;

    const { loading, stateProvince, district } = this.props;

    return (
      <Spin spinning={loading} size='large'>
        <Form
          id='frmEdit'
          ref={this.frmRef}
          colon={false}
          preserve={false}
          scrollToFirstError={true}
          layout='horizontal'
          {...layout}
          initialValues={{
            Id: m.Id,
            Code: m.Code,
            ShortName: m.ShortName,
            CountryId: m.CountryId,
            StateProvinceId: m.StateProvinceId,
            DistrictId: m.DistrictId,
            Name: m.Name,
            Note: m.Note,
            Active: m.Active,
            Locales: m.Locales,
          }}
        >
          <Form.Item name='Id' noStyle>
            <Input type='hidden' />
          </Form.Item>

          <Form.Item name='Code' label={<FormattedMessage id='admin.wards.fields.code' />}>
            <Input disabled />
          </Form.Item>

          <LocalizedEditor
            id='localized_Ward'
            locales={m.Locales}
            standardRender={
              <div>
                <Form.Item
                  name='Name'
                  label={<FormattedMessage id='admin.wards.fields.name' />}
                  rules={[
                    {
                      required: true,
                      message: (
                        <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='admin.wards.fields.name' /> }} />
                      ),
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
              </div>
            }
            localizedRender={
              <div>
                <Form.List name='Locales'>
                  {(fields) => (
                    <>
                      {fields.map((field, index) => (
                        <LocalizedItemWrapper key={field.key} index={index}>
                          <Form.Item {...field} key={'LanguageId_' + index} name={[field.name, 'LanguageId']} fieldKey={[field.fieldKey, 'LanguageId']} noStyle>
                            <Input type='hidden' />
                          </Form.Item>
                          <Form.Item
                            {...field}
                            key={'Name_' + index}
                            name={[field.name, 'Name']}
                            fieldKey={[field.fieldKey, 'Name']}
                            label={m.LocaleLabels['Name']}
                          >
                            <Input />
                          </Form.Item>
                        </LocalizedItemWrapper>
                      ))}
                    </>
                  )}
                </Form.List>
              </div>
            }
          />
          <Form.Item name='ShortName' label={<FormattedMessage id='common.fields.shortName' />}>
            <Input />
          </Form.Item>

          <Form.Item
            name='CountryId'
            label={<FormattedMessage id='common.country' />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.country' /> }} />,
              },
            ]}
          >
            <Select
              placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.country' /> }} />}
              allowClear
              onChange={this.handleCountryChange}
              showSearch
              filterOption={selectHelper.def.filterOption}
            >
              {m.SelectCountries.map((x) => (
                <Option key={x.Id} value={x.Id}>
                  {`[${x.Code}] ${x.Name}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='StateProvinceId'
            label={<FormattedMessage id='common.stateProvince' />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.stateProvince' /> }} />,
              },
            ]}
          >
            <Select
              loading={stateProvince.loading}
              placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.stateProvince' /> }} />}
              allowClear
              onChange={this.handleStateProvinceChange}
              showSearch
              filterOption={selectHelper.def.filterOption}
            >
              {}
              {stateProvince.data.map((item) => (
                <Option key={item.Id} value={item.Id}>
                  {item.Name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            name='DistrictId'
            label={<FormattedMessage id='common.district' />}
            rules={[
              {
                required: true,
                message: <FormattedMessage id='common.validators.inputFields.required' values={{ field: <FormattedMessage id='common.district' /> }} />,
              },
            ]}
          >
            <Select
              loading={district.loading}
              placeholder={<FormattedMessage id='common.selectObject' values={{ field: <FormattedMessage id='common.district' /> }} />}
              allowClear
              showSearch
              filterOption={selectHelper.def.filterOption}
            >
              {district.data.map((item) => (
                <Option key={item.Id} value={item.Id}>
                  {item.Name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name='Note' label={<FormattedMessage id='common.fields.note' />}>
            <TextArea />
          </Form.Item>
          <Form.Item name='Active' label={<FormattedMessage id='common.fields.active' />} valuePropName='checked'>
            <Checkbox />
          </Form.Item>
        </Form>
      </Spin>
    );
  }
}

Edit.propTypes = {
  frmRef: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    model: state.Ward.edit.modelGet,
    loading: state.Ward.edit.loading,
    stateProvince: {
      loading: state.Ward.edit.data.stateProvince.loading,
      data: state.Ward.edit.data.stateProvince.data,
    },
    district: {
      loading: state.Ward.edit.data.district.loading,
      data: state.Ward.edit.data.district.data,
    },
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    editCountryChange: (countryId) => dispatch(actions.editCountryChange(countryId)),
    editStateProvinceChange: (stateProvinceId) => dispatch(actions.editStateProvinceChange(stateProvinceId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
