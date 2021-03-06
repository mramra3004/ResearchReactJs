import React from 'react';
import { Row, Col, Icon } from 'antd';
import Rate from '@shared/components-admin/uielements/rate';
import PageHeader from '@shared/components-admin/utility/pageHeader';
import Box from '@shared/components-admin/utility/box';
import LayoutWrapper from '@shared/components-admin/utility/layoutWrapper';
import ContentHolder from '@shared/components-admin/utility/contentHolder';
import IntlMessages from '@shared/components-admin/utility/intlMessages';
import basicStyle from '@shared/assets-admin/styles/constants';

export default function() {
  const [value, setValue] = React.useState(3);
  const [count, setCount] = React.useState(null);

  const handleChange = value => {
    setValue(value);
  };
  const { rowStyle, colStyle, gutter } = basicStyle;
  return (
    <LayoutWrapper>
      <PageHeader>{<IntlMessages id="uiElements.rating.rating" />}</PageHeader>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box
            title={<IntlMessages id="uiElements.rating.basicExample" />}
            subtitle={
              <IntlMessages id="uiElements.rating.basicExampleSubTitle" />
            }
          >
            <ContentHolder>
              <Rate />
            </ContentHolder>
          </Box>
        </Col>
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box
            title={<IntlMessages id="uiElements.rating.halfStar" />}
            subtitle={<IntlMessages id="uiElements.rating.halfStarSubTitle" />}
          >
            <ContentHolder>
              <Rate allowHalf defaultValue={2.5} />
            </ContentHolder>
          </Box>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box
            title={<IntlMessages id="uiElements.rating.showCopywriting" />}
            subtitle={
              <IntlMessages id="uiElements.rating.showCopywritingSubTitle" />
            }
          >
            <ContentHolder>
              <span>
                <Rate onChange={handleChange} value={value} />
                {value && <span className="ant-rate-text">{value} stars</span>}
              </span>
            </ContentHolder>
          </Box>
        </Col>
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box
            title={<IntlMessages id="uiElements.rating.readOnly" />}
            subtitle={<IntlMessages id="uiElements.rating.readOnlySubTitle" />}
          >
            <ContentHolder>
              <Rate disabled defaultValue={2} />
            </ContentHolder>
          </Box>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box
            title={<IntlMessages id="uiElements.rating.otherCharacter" />}
            subtitle={
              <IntlMessages id="uiElements.rating.otherCharacterSubTitle" />
            }
          >
            <ContentHolder>
              <Rate character={<Icon type="heart" />} allowHalf />
              <br />
              <Rate character="A" allowHalf style={{ fontSize: 36 }} />
            </ContentHolder>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  );
}
