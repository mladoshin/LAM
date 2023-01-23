import * as React from 'react';

import AttributeGrid from '../components/AttributeGrid';
import Container from '../components/Container';
import Hero from '../components/Hero';
import BlogPreviewGrid from '../components/BlogPreviewGrid';
import Highlight from '../components/Highlight';
import Layout from '../components/Layout/Layout';
import ProductCollectionGrid from '../components/ProductCollectionGrid';
import ProductCardGrid from '../components/ProductCardGrid';
import Quote from '../components/Quote';
import Title from '../components/Title';
import config from '../config.json';

import { generateMockBlogData, generateMockProductData } from '../helpers/mock';

import * as styles from './index.module.css';
import { graphql, Link, navigate, useStaticQuery } from 'gatsby';

const IndexPage = () => {
  const newArrivals = generateMockProductData(3, 'shirt');
  const blogData = generateMockBlogData(3);

  const goToShop = () => {
    navigate('/shop');
  };

  const data = useStaticQuery(graphql`
    query {
      strapiHomepage {
        promotions {
          content
          cta
          link
          image {
            id
            url
          }
        }
        primaryhero {
          image {
            url
            id
          }
          title
        }
        secondaryhero {
          image {
            url
            id
          }
          title
        }
        newarrivals {
          id
          products {
            id
            title
            slug
            price
            image {
              url
            }
          }
        }
        recentarticles {
          articles {
            id
            preview {
              url
            }
            publishdate
            title
          }
        }
        seo {
          title
          keywords
          description
        }
      }
    }
  `)

  const promotions = data.strapiHomepage.promotions || []

  console.log(data)
  return (
    <Layout disablePaddingBottom>
      {/* Hero Container */}
      <Hero
        maxWidth={'750px'}
        maxHeight={'300px'}
        image={`${config.STRAPI_API_URL}${data.strapiHomepage.primaryhero.image[0].url}`}
        title={data.strapiHomepage.primaryhero.title}
        header="LAM Leather"
        subtitle={data.strapiHomepage.primaryhero.title}
        ctaText={'Смотреть все'}
        ctaAction={goToShop}
      />

      {/* Message Container */}
      <div className={styles.messageContainer}>
        <p>
          This is a demonstration of the Sydney theme for verse by{' '}
          <span className={styles.gold}>matter design.</span>
        </p>
        <p>
          wear by <span className={styles.gold}>sunspel</span> and{' '}
          <span className={styles.gold}>scotch&soda</span>
        </p>
      </div>

      {/* Collection Container */}
      <div className={styles.collectionContainer}>
        <Container size={'large'}>
          <Title name={'Коллекции'} />
          <ProductCollectionGrid />
        </Container>
      </div>

      {/* New Arrivals */}
      <div className={styles.newArrivalsContainer}>
        <Container>
          <Title name={'Новинки'} link={'/shop'} textLink={'смотреть все'} />
          <ProductCardGrid
            spacing={true}
            showSlider
            height={480}
            columns={3}
            data={data.strapiHomepage.newarrivals.products}
          />
        </Container>
      </div>

      {/* Highlight  */}
      <div className={styles.highlightContainer}>
        <Container size={'large'} fullMobile>
          <Highlight
            image={`${config.STRAPI_API_URL}/uploads/photo_2023_01_16_21_29_19_ddea8967c5.jpg`}
            altImage={'highlight image'}
            miniImage={`${config.STRAPI_API_URL}/uploads/photo_2023_01_18_15_04_24_ba3e7ff62c.jpg`}
            miniImageAlt={'mini highlight image'}
            title={'Премиальное качество'}
            description={`Каждый наш аксессуар сделан вручную из лучшей натуральной кожи, устойчивой к износу и не требующей особого ухода. Мы заботися о том, чтобы наш продукт давал вам лучшие тактильные ощущения вместе с непревзойденной эстетичностью. `}
            textLink={'shop now'}
            link={'/shop'}
          />
        </Container>
      </div>

      {/* Promotion */}
      <div className={styles.promotionContainer}>
        <Hero
          image={`${config.STRAPI_API_URL}${promotions[0].image[0].url}`}
          header={promotions[0].content}
          ctaText={promotions[0].cta}
          style={{ height: "500px", minHeight: 0 }}
        />
        {/* <div className={styles.linkContainers}>
          <Link to={'/shop'}>WOMAN</Link>
          <Link to={'/shop'}>MAN</Link>
        </div> */}
      </div>

      {/* Quote */}
      <Quote
        bgColor={'var(--standard-light-grey)'}
        title={'about Sydney'}
        quote={
          '“We believe in two things: the pursuit of quality in everything we do, and looking after one another. Everything else should take care of itself.”'
        }
      />

      {/* Blog Grid */}
      <div className={styles.blogsContainer}>
        <Container size={'large'}>
          <Title name={'Блог'} subtitle={'Заметки о моде и стиле'} />
          <BlogPreviewGrid data={data.strapiHomepage.recentarticles.articles} />
        </Container>
      </div>

      {/* Promotion */}
      <div className={styles.sustainableContainer}>
        <Hero
          image={`${config.STRAPI_API_URL}${data.strapiHomepage.secondaryhero.image[0].url}`}
          title={data.strapiHomepage.secondaryhero.title}
          subtitle={
            'From caring for our land to supporting our people, discover the steps we’re taking to do more for the world around us.'
          }
          ctaText={'read more'}
          maxWidth={'660px'}
          ctaStyle={styles.ctaCustomButton}
        />
      </div>

      {/* Social Media */}
      <div className={styles.socialContainer}>
        <Title
          name={'Styled by You'}
          subtitle={'Tag @sydney to be featured.'}
        />
        <div className={styles.socialContentGrid}>
          <img src={`/social/socialMedia1.png`} alt={'social media 1'} />
          <img src={`/social/socialMedia2.png`} alt={'social media 2'} />
          <img src={`/social/socialMedia3.png`} alt={'social media 3'} />
          <img src={`/social/socialMedia4.png`} alt={'social media 4'} />
        </div>
      </div>
      <AttributeGrid />
    </Layout>
  );
};

export default IndexPage;
