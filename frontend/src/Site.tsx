import React, {
  useState,
  useEffect,
  createRef,
  RefObject,
} from 'react';
import { AxiosInstance } from 'axios';
import styled from 'styled-components';
import configProvider from 'services/configProvider';
import createHttpService from 'services/httpService';
import ResourceService, { IResourceService } from 'services/resourceService';
import { IConfiguration } from 'models/IConfiguration';
import { ISection, IHeroSection } from 'models/Sections';
import Hero from 'components/Hero';
import MenuSticky from 'components/MenuSticky';
import SiteSection from 'components/SiteSection';
import Contact from 'components/Contact';
import colours from 'config/colours';

const SiteWrapper = styled.div`
  text-align: center;
  background: linear-gradient(
    to right,
    ${colours.pageBgOuter},
    ${colours.pageBgInner} 5%,
    ${colours.pageBgInner} 95%,
    ${colours.pageBgOuter}
  );
`;

interface IMenuItem {
  text: string;
  ref: RefObject<HTMLDivElement>;
}

export default function Site(): JSX.Element {
  const [configurationLoaded, setConfigurationLoaded] = useState<boolean>(false);
  const [httpService, setHttpService] = useState<AxiosInstance | null>(null);
  const [cmsResourceService, setCmsResourceService] = useState<IResourceService | null>(null);
  const [heroSection, setHeroSection] = useState<IHeroSection>({
    title: '',
    copy: '',
    backgroundSrc: '',
    backgroundOpacity: 0,
    logo: '',
  });
  const [sections, setSections] = useState<ISection[]>([]);

  useEffect(() => {
    const loadHeroSection = async (http: AxiosInstance, cms: IResourceService): Promise<void> => {
      const res = await http.get('/hero-section');

      setHeroSection({
        title: res.data.Title,
        copy: res.data.Copy,
        backgroundSrc: cms.getUri(res.data.Image.url),
        backgroundOpacity: res.data.ImageOpacity,
        logo: cms.getUri(res.data.Logo.url),
      });
    };

    const loadSections = async (http: AxiosInstance): Promise<void> => {
      const res = await http.get('/site-sections');

      const { data }: { data: ISection[] } = res;
      data.sort((a, b) => a.Order - b.Order);

      setSections(data);
    };

    const loadConfig = async (): Promise<void> => {
      const config: IConfiguration = await configProvider();
      const http = createHttpService(config.apiUrl);
      const cms = new ResourceService(config.apiUrl);
      setHttpService(() => http);
      setCmsResourceService(cms);
      loadHeroSection(http, cms);
      loadSections(http);
    };

    if (!configurationLoaded) {
      setConfigurationLoaded(true);
      loadConfig();
    }
  }, [configurationLoaded]);

  const menuItems: IMenuItem[] = sections.map((s) => ({ text: s.Header, ref: createRef() }));
  const contactMenuItem: IMenuItem = { text: 'Contact Us', ref: createRef() };
  menuItems.push(contactMenuItem);

  const contactEl = sections.length > 1 && httpService
    ? <Contact innerRef={contactMenuItem.ref} httpService={httpService} />
    : null; // So that the reveal effect works, don't display Contact section until other sections have been loaded

  const sectionEls = sections.map((section, i) => (
    <SiteSection
      key={section.id}
      header={section.Header}
      copy={section.Copy}
      gallery={section.Gallery}
      cmsResourceService={cmsResourceService}
      innerRef={menuItems[i].ref}
    />
  ));

  return (
    <SiteWrapper>
      <Hero
        backgroundSrc={heroSection.backgroundSrc}
        backgroundOpacity={heroSection.backgroundOpacity}
        title={heroSection.title}
        copy={heroSection.copy}
      />
      <MenuSticky logoSrc={heroSection.logo} menuItems={menuItems} />
      <div>{sectionEls}</div>
      {contactEl}
    </SiteWrapper>
  );
}
