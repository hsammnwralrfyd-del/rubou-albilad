import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const FabricHousesPage = () => (
  <ServicePageTemplate service={servicesById.fabricHouses} />
);

export default FabricHousesPage;
