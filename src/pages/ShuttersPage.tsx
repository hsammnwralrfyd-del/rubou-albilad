import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const ShuttersPage = () => {
  const service = servicesById.shutters;

  return <ServicePageTemplate service={service} />;
};

export default ShuttersPage;