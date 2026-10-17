import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const DoorsPage = () => {
  const service = servicesById.doors;

  return <ServicePageTemplate service={service} />;
};

export default DoorsPage;