import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const CanopiesPage = () => {
  const service = servicesById.canopies;

  return <ServicePageTemplate service={service} />;
};

export default CanopiesPage;