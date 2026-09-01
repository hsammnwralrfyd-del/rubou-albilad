import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const WoodCladdingPage = () => {
  const service = servicesById.woodCladding;

  return <ServicePageTemplate service={service} />;
};

export default WoodCladdingPage;