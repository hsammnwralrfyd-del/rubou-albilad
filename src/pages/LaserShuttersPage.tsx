import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const LaserShuttersPage = () => {
  const service = servicesById.laserShutters;

  return <ServicePageTemplate service={service} />;
};

export default LaserShuttersPage;