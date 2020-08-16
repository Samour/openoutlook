import React, {
  useState,
  useEffect,
  createRef,
  RefObject,
} from 'react';
import styled from 'styled-components';
import configProvider from 'services/configProvider';
import createHttpService from 'services/httpService';
import ResourceService, { IResourceService } from 'services/resourceService';
import { ICmsService, CmsService } from 'services/cmsService';
import { IConfiguration } from 'models/IConfiguration';
import { ISection } from 'models/Sections';
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

interface IHeroState {
  title: string;
  copy: string;
  backgroundSrc: string;
  backgroundOpacity: number;
  logo: string;
}

interface IMenuItem {
  text: string;
  ref: RefObject<HTMLDivElement>;
}

export default function Site(): JSX.Element {
  const [configurationLoaded, setConfigurationLoaded] = useState<boolean>(false);
  const [apiService, setApiService] = useState<ICmsService | null>(null);
  const [cmsResourceService, setCmsResourceService] = useState<IResourceService | null>(null);
  const [heroSection, setHeroSection] = useState<IHeroState>({
    title: '',
    copy: '',
    backgroundSrc: '',
    backgroundOpacity: 0,
    logo: '',
  });
  const [sections, setSections] = useState<ISection[]>([]);

  useEffect(() => {
    const loadHeroSection = async (api: ICmsService, cms: IResourceService): Promise<void> => {
      const data = await api.getHeroSection();

      setHeroSection({
        title: data.Title,
        copy: data.Copy,
        backgroundSrc: cms.getUri(data.Image.url),
        backgroundOpacity: data.ImageOpacity,
        logo: cms.getUri(data.Logo.url),
      });
    };

    const loadSections = async (api: ICmsService): Promise<void> => {
      const data = await api.getSections();

      setSections(data);
    };

    const loadConfig = async (): Promise<void> => {
      const config: IConfiguration = await configProvider();
      const httpService = createHttpService(config.apiUrl);
      const api = new CmsService(httpService);
      const cms = new ResourceService(config.apiUrl);
      setApiService(api);
      setCmsResourceService(cms);
      loadHeroSection(api, cms);
      loadSections(api);
    };

    if (!configurationLoaded) {
      setConfigurationLoaded(true);
      loadConfig();
    }
  }, [configurationLoaded]);

  const menuItems: IMenuItem[] = sections.map((s) => ({ text: s.Header, ref: createRef() }));
  const contactMenuItem: IMenuItem = { text: 'Contact Us', ref: createRef() };
  menuItems.push(contactMenuItem);

  const contactEl = sections.length > 1 && apiService
    ? <Contact innerRef={contactMenuItem.ref} apiService={apiService} />
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
