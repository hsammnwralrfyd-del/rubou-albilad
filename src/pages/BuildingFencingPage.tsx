import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const BuildingFencingPage = () => (
  <ServicePageTemplate service={servicesById.buildingFencing} />
);

export default BuildingFencingPage;
