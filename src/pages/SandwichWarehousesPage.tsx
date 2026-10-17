import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const SandwichWarehousesPage = () => (
  <ServicePageTemplate service={servicesById.sandwichWarehouses} />
);

export default SandwichWarehousesPage;
