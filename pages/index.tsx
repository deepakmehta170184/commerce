import { Layout } from '@components/common'
import { Text } from '@components/ui'
import { request } from '../lib/datocms'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'reactstrap'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSearch,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons'
import {
  InputGroup,
  InputGroupAddon,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Button,
} from 'reactstrap'

import { getConfig } from '@framework/api'
import getAllProducts from '@framework/api/operations/get-all-products'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import AwesomeSlider from 'react-awesome-slider'
import 'react-awesome-slider/dist/styles.css'
import { homedir } from 'os'

export async function getStaticProps({
  preview,
  locale,
}: GetStaticPropsContext) {
  const config = getConfig({ locale })

  const graphqlRequest = {
    query: `{ home{ id,
      homeimg1 {
        id,
        url
      },
      homevideo {
        id,
        url
      },
      img1text,
      homeimg2{
        id,url
      }
      img2text,
      img1heading,
      img2heading,
      img1logo{
        id,
        url
      },
      img3heading,
      img3text,
      img3logo{
        id,
        url
      },
      bottomslider
    } }`,
  }

  return {
    props: { data: await request(graphqlRequest) },
  }
}

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('data for home: ', data);
  
  const HomeData = data.home
console.log('Length for bottomSlider: ', typeof HomeData.bottomslider);
  return (
    <>
      <div className="player-wrapper">
        <video width="100%" height="500" muted autoPlay>
          <source src={HomeData.homevideo.url} type="video/mp4" />
        </video>
      </div>
      
      <Container className="pt-10">
        <Row className="pt-10">
          <Col md="4">
            <img src={HomeData.img1logo.url} alt="ssvir" />
            <h4>{HomeData.img1heading}</h4>
            <p>{HomeData.img1text}</p>
          </Col>
          <Col md="8">
            <img src={HomeData.homeimg1.url} alt="ssvir" />
          </Col>
        </Row>
      </Container>
      <div className="home_aside_cont">
        <Container>
          <Row>
            <Col xs="12">
                <img src={HomeData.homeimg1.url} alt="ssvir" />
                {data && (
                  <div className="text-center p-10">
                    <h1>{HomeData.img2heading}</h1>
                    <Text>{HomeData.img2text}</Text>
                  </div>
                )}
            </Col>
          </Row>
          <Row className="pt-10">
            <Col md="12" className="pt-10">
              <h4>{HomeData.img3heading}</h4>
            </Col>
            <Col md="4">
              <img src={HomeData.img3logo.url} alt="ssvir" />
            </Col>
            <Col md="8" className="pt-10">
              <p>{HomeData.img3text}</p>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="home_quotes">
        <AwesomeSlider>
        {Object.keys(HomeData.bottomslider).map(function(key, index) {
          return <div style={{ padding: '0px 86px 0px 96px' }}>
          {HomeData.bottomslider[key]}
          </div>
        })
        }
        
        </AwesomeSlider>
      </div>
    </>
  )
}

Home.Layout = Layout
