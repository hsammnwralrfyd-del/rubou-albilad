import { ServicePageTemplate } from "@/components/ServicePageTemplate";
import { servicesById } from "@/config/services";

const SchoolCanopiesPage = () => (
  <ServicePageTemplate service={servicesById.schoolCanopies} />
);

export default SchoolCanopiesPage;
