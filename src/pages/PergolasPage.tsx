import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const PergolasPage = () => {
  const service = servicesById.pergolas;

  return <ServicePageTemplate service={service} />;
};

export default PergolasPage;