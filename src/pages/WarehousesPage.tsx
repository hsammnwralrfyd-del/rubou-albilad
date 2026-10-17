import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const WarehousesPage = () => {
  const service = servicesById.warehouses;

  return <ServicePageTemplate service={service} />;
};

export default WarehousesPage;