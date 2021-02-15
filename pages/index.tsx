import { Layout } from '@components/common'
import { Text } from '@components/ui'
import { request } from '../lib/datocms'
// import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'reactstrap'
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
      bottomslider,
      purchasetext,
      purchaseheading,
      purchasebanner{
        id,url
    }
    } }`,
  }

  return {
    props: { data: await request(graphqlRequest) },
  }
}

export default function Home({
  data,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log('data for home: ', data)

  const HomeData = data.home
  console.log('Length for bottomSlider: ', typeof HomeData.bottomslider)
  return (
    <>
      <div className="player-wrapper">
        <video width="100%" height="500" muted autoPlay>
          <source src={HomeData.homevideo.url} type="video/mp4" />
        </video>
      </div>

      <div className="row no-gutters test_detail_cont">
        <div className="col-md-4">
          <div style={{ paddingTop: '5px' }}>
            <img src={HomeData.img1logo.url} alt="ssvir" />
          </div>
          <div className="outer-image-section">
            <h4>{HomeData.img1heading}</h4>
            <p>{HomeData.img1text}</p>
          </div>
        </div>
        <div className="col-md-8">
          <div className="outer-image-section">
            <img src={HomeData.homeimg1.url} alt="ssvir" />
          </div>
        </div>
      </div>
      <Container
        fluid
        className="px-0 full-width-image"
        style={{
          backgroundImage: `url(${HomeData.homeimg2.url})`,
        }}
      >
        {data && (
          <div className="container">
            <div className="row" style={{ backgroundColor: 'whitesmoke' }}>
              <div className="col-md-8 offset-md-2">
                <h1>{HomeData.img2heading}</h1>
                <Text>{HomeData.img2text}</Text>
              </div>
            </div>
          </div>
        )}
      </Container>
      <div
        className="row no-gutters test_detail_cont"
        style={{ backgroundColor: '#e5f6f8' }}
      >
        <div className="col-md-4">
          <div className="outer-image-section">
            <h4>{HomeData.img3heading}</h4>
          </div>
          <div style={{ paddingTop: '5px' }}>
            <img src={HomeData.img3logo.url} alt="ssvir" />
          </div>
        </div>
        <div className="col-md-8">
          <div
            className="outer-image-section"
            style={{ paddingTop: ' 8%', paddingLeft: '20px' }}
          >
            <p>{HomeData.img3text}</p>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: 'none' }}>
        <AwesomeSlider>
          {Object.keys(HomeData.bottomslider).map(function (key, index) {
            return (
              <div style={{ padding: '0px 86px 0px 96px' }}>
                {HomeData.bottomslider[key]}
              </div>
            )
          })}
        </AwesomeSlider>
      </div>
      <Container fluid className="px-0 full-width-image" style={{backgroundImage: `url(${HomeData.purchasebanner.url})`}}>         
          {data && (
            <div className="container">
              <div className="row">
                <div className="col-md-8 offset-md-2">
                <h1 style={{color:'white', textAlign:'left'}}>{HomeData.purchaseheading}</h1>
                    <p style={{color:'white', textAlign:'left'}}>{HomeData.purchasetext}</p>
                </div>
              </div>
            </div>
          )}
      </Container>
    </>
  )
}

Home.Layout = Layout
