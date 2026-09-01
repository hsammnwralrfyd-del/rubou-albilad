import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const FrenchArchCanopiesPage = () => (
  <ServicePageTemplate service={servicesById.frenchArchCanopies} />
);

export default FrenchArchCanopiesPage;
