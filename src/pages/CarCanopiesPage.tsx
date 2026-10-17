import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const CarCanopiesPage = () => {
  const service = servicesById.carCanopies;

  return <ServicePageTemplate service={service} />;
};

export default CarCanopiesPage;