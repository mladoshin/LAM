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
            stock
            strapi_id
            color
            image {
              url
            }
            description {
              data {
                description
              }
            }
            options {
              sizes
              colors
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
  `);

  const promotions = data.strapiHomepage.promotions || [];

  console.log(data);
  return (
    <Layout disablePaddingBottom>
      {/* Hero Container */}
      <Hero
        maxWidth={'750px'}
        maxHeight={'300px'}
        image={`${config.STRAPI_API_URL}${data.strapiHomepage.primaryhero.image[0].url}`}
        // title={data.strapiHomepage.primaryhero.title}
        header="LAM Leather"
        // subtitle={data.strapiHomepage.primaryhero.title}
        ctaText={'К покупкам'}
        ctaAction={goToShop}
      >
        <h1 className={styles.description}>
          Магазин с самыми качественными премиальными кожаными аксессуарами.
        </h1>
      </Hero>

      {/* Message Container */}
      <div className={styles.messageContainer}>
        <p>
          <span className={styles.gold} style={{ fontWeight: 700 }}>
            LAM Leather
          </span>{' '}
          - магазин лучших кожаных премиальных аксессуаров.
        </p>
        <p>
          Наши изделия сделаны вручную из натуральной кожи, которая намного
          прочнее и эластичнее, чем более дешевые аналоги.
        </p>
        <p>Это делает аксессуары более долговечными и качественными.</p>
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
            textLink={'Купить'}
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
          style={{ height: '500px', minHeight: 0 }}
        />
        {/* <div className={styles.linkContainers}>
          <Link to={'/shop'}>WOMAN</Link>
          <Link to={'/shop'}>MAN</Link>
        </div> */}
      </div>

      {/* Quote */}
      {/* <Quote
        bgColor={'var(--standard-light-grey)'}
        title={'about Sydney'}
        quote={
          '“We believe in two things: the pursuit of quality in everything we do, and looking after one another. Everything else should take care of itself.”'
        }
      /> */}

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
          // subtitle="Делись с друзьями своим промокодом и получи скидку 1000 рублей с каждой покупки друга!"
          ctaText={'Подробнее'}
          maxWidth={'660px'}
          ctaStyle={styles.ctaCustomButton}
        >
          <h2 className={styles.promo_title}>Ограниченная акция!</h2>
          <p className={styles.promo_subtitle}>
            Делись с друзьями своим промокодом и получи скидку 1000 рублей с
            каждой покупки друга!
          </p>
        </Hero>
      </div>

      {/* Social Media */}
      <div className={styles.socialContainer}>
        <Title
          name={'Наши покупатели'}
          subtitle={
            'Оставьте хэштэг #lam_leather в соцсетях, и попадите в нашу подборку на сайте!'
          }
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
