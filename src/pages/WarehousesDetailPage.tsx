import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const WarehousesDetailPage = () => {
  const service = servicesById.warehousesDetail;

  return <ServicePageTemplate service={service} />;
};

export default WarehousesDetailPage;