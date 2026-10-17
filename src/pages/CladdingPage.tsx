import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const CladdingPage = () => {
  const service = servicesById.cladding;

  return <ServicePageTemplate service={service} />;
};

export default CladdingPage;
