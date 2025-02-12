import { useEffect, useRef, useState } from 'react';
import { mapData } from '../../api/map-data';
import { Base } from '../Base';
import { PageNotFound } from '../PageNotFound';
import { Loading } from '../Loading';
import { GridTwoColumns } from '../../components/GridTwoColumns';

export const Home = () => {
  const [data, setData] = useState([]);
  const isMounted = useRef(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetch(
          'http://localhost:1337/api/pages?populate=deep',
        );
        const json = await data.json();
        const pageData = mapData(json);
        setData(pageData[0]);
      } catch (e) {
        setData(undefined);
      }
    };

    if (isMounted.current) {
      load();
    }

    return () => {
      isMounted.current = false;
    };
  }, []);

  if (data === undefined) {
    return <PageNotFound />;
  }

  if (data && !data.slug) {
    return <Loading />;
  }

  const { menu, sections, footerHtml } = data;
  const { links, text, link, srcImg } = menu;

  return (
    <Base
      links={links}
      footerHtml={footerHtml}
      logoData={{ text, link, srcImg }}
    >
      {sections.map((section, index) => {
        const { component } = section;

        if (component === 'section.section-two-columns') {
          return <GridTwoColumns key={`${index}`} {...section} />;
        }
      })}
    </Base>
  );
};
