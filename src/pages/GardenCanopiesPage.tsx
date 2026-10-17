import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const GardenCanopiesPage = () => {
  const service = servicesById.gardenCanopies;

  return <ServicePageTemplate service={service} />;
};

export default GardenCanopiesPage;