import Container from 'rsuite/Container';
import Header from 'rsuite/Header';
import Content from 'rsuite/Content';
import Footer from 'rsuite/Footer';

import FlexboxGrid from 'rsuite/FlexboxGrid';
import Row from 'rsuite/Row';
import Col from 'rsuite/Col';
import Grid from 'rsuite/Grid';

const Wrapper = ({children}) => <FlexboxGrid justify="center">
  <FlexboxGrid.Item as={Col} xs={24} md={24} xl={13}>
    {children}
  </FlexboxGrid.Item>
</FlexboxGrid>

const MainLayout = (props) => {
  return <Container>
    <Header>
      <Wrapper>
        <Grid fluid>
          <Row>
            <Col xs={24}>
              <h1>Christian Student Convention</h1>
              <h4>Student Registration</h4>
            </Col>
          </Row>
        </Grid>
      </Wrapper>
    </Header>
    <Content>
      <Wrapper>
        {props.children}
      </Wrapper>
    </Content>
    <Footer>
      <Wrapper>
        <Grid fluid>
          <Row>
            <Col xs={24}>
              <p>Christian Student Convention - FaithWay Baptist Church | Student Registration</p>
            </Col>
          </Row>
        </Grid>
      </Wrapper>
    </Footer>
  </Container>
}

export default MainLayout;