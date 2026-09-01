import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const FencingPage = () => {
  const service = servicesById.fencing;

  return <ServicePageTemplate service={service} />;
};

export default FencingPage;