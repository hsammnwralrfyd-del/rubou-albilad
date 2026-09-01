import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const SandwichPanelPage = () => {
  const service = servicesById.sandwichPanel;

  return <ServicePageTemplate service={service} />;
};

export default SandwichPanelPage;